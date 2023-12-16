import axios from 'axios';

const API_BASE_URL = `https://goshareadmin.azurewebsites.net/api`;

const getLocalToken = () => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('access_token=')
  );
  const accessToken = accessTokenCookie?.substring('access_token='.length);
  return accessToken;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getLocalToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosInstanceMultipart = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstanceMultipart.interceptors.request.use(
  (config) => {
    const accessToken = getLocalToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AuthService {
  constructor() {
    this.api = axiosInstance;
    this.apiMultipart = axiosInstanceMultipart;
  }

  login(payload) {
    return this.api.post(`${API_BASE_URL}/auth/login`, payload);
  }

  getDriversList() {
    return this.api.get(`${API_BASE_URL}/user/drivers`);
  }

  verifyDriver(payload) {
    return this.api.post(`${API_BASE_URL}/user/verify-driver`, payload);
  }

  getDriverDocument(driverId) {
    return this.api.get(`${API_BASE_URL}/user/driverdocuments/${driverId}`);
  }

  getTripsList() {
    return this.api.get(`${API_BASE_URL}/trip`);
  }

  cancelTrip(tripId) {
    return this.api.post(`${API_BASE_URL}/trip/cancel/${tripId}`);
  }

  getUsersList() {
    return this.api.get(`${API_BASE_URL}/user`);
  }

  disableUser(userId, payload) {
    return this.api.put(`${API_BASE_URL}/user/ban/${userId}`, payload);
  }

  updateDriverDocument(driverId, payload) {
    return this.apiMultipart.put(
      `${API_BASE_URL}/driver/documents/${driverId}`,
      payload
    );
  }
}

export default new AuthService();
