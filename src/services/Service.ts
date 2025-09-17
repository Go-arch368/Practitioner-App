import { AxiosResponse } from 'axios';
import axiosInstance from '@/utils/AxiosInstance';

export const fetchGetRequest = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(url);
    return response;
  } catch (error: any) {
    console.error("Error response from service: " + (error.message || error));
    return "error";
  }
};

export const fetchPostRequest = async (url: string, req: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(url, req);
    return response;
  } catch (error: any) {
    console.error("Error response from service: " + (error.message || error));
    return "error";
  }
};

