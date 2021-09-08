import React from 'react';
import { LoginUser } from '../types';
import { UserList } from '../components/user-list';
import { Header } from "../components/header";
import useSWR from 'swr';
import { Loading } from '../components/loading';
import { Auth } from "../components/auth";
import { getFetcher } from '../services/base.service';
import { UserService } from '../services/user.service';
import { AxiosError } from 'axios';

/**
 * ユーザ選択ページ
 *
 * @constructor
 */
export default function Index() {
  const user = UserService.load();
  const { data: users, error: usersError } = useSWR<LoginUser[], AxiosError>('/user', getFetcher('/user', user));
  if (usersError?.response?.status === 401) {
    UserService.delete();
  }

  return (
    <Auth>
      <Header />
      <UserList users={users ?? []} />
      <Loading show={!users} />
    </Auth>
  );
}
