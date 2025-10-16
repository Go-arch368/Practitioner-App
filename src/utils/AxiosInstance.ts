import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('SOME_TOKEN') || '';
    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error((error.response.data as { message?: string })?.message || 'Unauthorized User');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
