import React, { useState } from 'react';
import styled from "styled-components";
import { variables } from "../styles/variables";

interface Props {
  onSubmit: (email: string, password: string) => void;
  error: boolean;
}

/**
 * ログインフォーム
 *
 * @param props
 * @constructor
 */
export const LoginForm: React.FC<Props> = props => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <Form>
      <FormItem>
        <FormLabel>ユーザー名</FormLabel>
        <FormInput type={'email'} onChange={event => setEmail(event.currentTarget.value)} />
        {props.error && (
          <FormError>IDかパスワードが間違っています</FormError>
        )}
      </FormItem>

      <FormItem>
        <FormLabel>パスワード</FormLabel>
        <FormInput type={'password'} onChange={event => setPassword(event.currentTarget.value)} />
        {props.error && (
          <FormError>IDかパスワードが間違っています</FormError>
        )}
      </FormItem>

      <FormControl>
        <FormButton type="submit" onClick={() => props.onSubmit(email, password)}>ログイン</FormButton>
      </FormControl>
    </Form>
  );
}

const Form = styled.form`
  width: 30rem;
  margin: 6.5rem auto 0 auto;
  padding: 2.5rem 1.5rem;
  border-radius: 1rem;
  border: solid 1px ${variables.colorBorder};
  background-color: ${variables.colorSub};
`;

const FormItem = styled.div`
  margin: 0 0 1rem 0;
`;

const FormLabel = styled.label`
  display: inline-block;
  padding: 0 0 0.5rem 0;
  font-size: 1.6rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  box-shadow: none;
  border: solid 1px ${variables.colorBorder};
  background-color: #fff;
  font-size: 1.6rem;
`;

const FormControl = styled.div`
  margin: 2rem 0 0 0;
  text-align: center;
`;

const FormButton = styled.button`
  padding: 0.8rem 2.5rem;
  border-radius: 2.1rem;
  border: solid 1px ${variables.colorBorder};
  background-color: ${variables.colorMain};
  font-size: 1.6rem;
  color: white;
`;

const FormError = styled.span`
  color: ${variables.colorRed};
`;
