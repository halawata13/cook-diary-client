import { LoginUser } from '../types';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from '../config/environment';

/**
 * BaseService
 */
export default abstract class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor(user: LoginUser) {
    this.axiosInstance = axios.create({
      baseURL: environment.baseUrl,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }
}

export const getFetcher = (url: string, user: LoginUser | null) => {
  const config: AxiosRequestConfig = user ? {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  } : {};

  return () => axios.get(environment.baseUrl + url, config).then(res => res.data);
};
