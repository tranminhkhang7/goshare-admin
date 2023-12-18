import axios from 'axios';

const API_BASE_URL = `https://goshareadmin.azurewebsites.net/api`;

const getLocalToken = () => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('access_token=')
  );
  const accessToken = accessTokenCookie
    ? JSON.parse(accessTokenCookie.substring('access_token='.length))
    : null;

  return accessToken;
};

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',

  },
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getLocalToken();

  request.headers.Authorization = `Bearer ${getLocalToken()}`;
  return request;
});

export default axiosClient;
