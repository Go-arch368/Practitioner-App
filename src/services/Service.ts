import { AxiosResponse } from 'axios';
import axios from 'axios';
import axiosInstance from '@/utils/AxiosInstance';
import { AxiosError } from 'axios';

export const fetchGetRequest = <T>(
  url: string
): Promise<AxiosResponse<T>> => {
  return axiosInstance
    .get<T>(url)
    .then((response: AxiosResponse<T>) => {
      return response;
    })
    .catch((error: AxiosError<T> | Error) => {
      if ('isAxiosError' in error && error.isAxiosError) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Error response from service:', error.message);
      }
      throw error; // propagate the error
    });
};


export const fetchPostRequest = async <Res , Req >(
  url: string,
  req: Req
): Promise<AxiosResponse<Res>> => {
  try {
    const response: AxiosResponse<Res> = await axiosInstance.post<Req, AxiosResponse<Res>>(url, req);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data?.message || error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};


