import axios from 'axios';

const authifyApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1.0',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is crucial for sending cookies (JWT)
});

// Request Interceptor: Automatically attach the JWT token from local storage
authifyApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authifyApi;