import axios, { InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('SOME_TOKEN') || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error(error.response.data?.message || 'Unauthorized User');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
