import React, { useState } from 'react';
import { LoginForm } from '../../components/login-form';
import { useRouter } from 'next/router';
import { UserService } from '../../services/user.service';
import { Header } from "../../components/header";

export default function Index() {
  const router = useRouter();
  const [ error, setError ] = useState(false);

  const onSubmit = async (name: string, password: string) => {
    try {
      const user = await UserService.login(name, password);
      UserService.save(user);

      await router.push('/');

    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <LoginForm onSubmit={onSubmit} error={error} />
    </>
  );
}
