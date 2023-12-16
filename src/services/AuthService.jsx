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

class AuthService {
  constructor() {
    this.api = axiosInstance;
  }

  login(payload) {
    return this.api.post(`${API_BASE_URL}/auth/login`, payload);
  }

  getDriversList() {
    return this.api.get(`${API_BASE_URL}/user/drivers?pageSize=500`);
  }

  verifyDriver(payload) {
    return this.api.post(`${API_BASE_URL}/user/verify-driver`, payload);
  }

  getDriverDocument(driverId) {
    return this.api.get(`${API_BASE_URL}/user/driverdocuments/${driverId}`);
  }

  getTripsList() {
    return this.api.get(`${API_BASE_URL}/trip?pageSize=500`);
  }

  cancelTrip(tripId) {
    return this.api.post(`${API_BASE_URL}/trip/cancel/${tripId}`);
  }

  getUsersList() {
    return this.api.get(`${API_BASE_URL}/user?pageSize=500`);
  }

  disableUser(userId, payload) {
    return this.api.put(`${API_BASE_URL}/user/ban/${userId}`, payload);
  }

  updateDriverDocument(driverId, payload) {
    return this.api.put(
      `${API_BASE_URL}/driver/documents/${driverId}`,
      payload
    );
  }
}

export default new AuthService();
