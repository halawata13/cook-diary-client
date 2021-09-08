import axios from 'axios';
import { LoginUser } from '../types';
import { environment } from '../config/environment';

/**
 * UserService
 */
export class UserService {
  public static async login(username: string, password: string) {
    const params = {
      username,
      password,
    };

    return axios.post<LoginUser>(`${environment.baseUrl}/auth/login`, params).then(res => res.data);
  }

  public static save(user: LoginUser, useSessionStorage = true) {
    try {
      if (useSessionStorage) {
        window.sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        window.localStorage.setItem('user', JSON.stringify(user));
      }

      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public static load(useSessionStorage = true) {
    try {
      if (useSessionStorage) {
        const json = window.sessionStorage.getItem('user');
        return json ? JSON.parse(json) as LoginUser : null;
      } else {
        const json = window.localStorage.getItem('user');
        return json ? JSON.parse(json) as LoginUser : null;
      }

    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static delete(useSessionStorage = true) {
    try {
      if (useSessionStorage) {
        window.sessionStorage.removeItem('user');
      } else {
        window.localStorage.removeItem('user');
      }

    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
