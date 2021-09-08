import React from 'react';
import Link from 'next/link';
import styled from "styled-components";
import { Header } from './header';
import { variables } from '../styles/variables';

interface Props {
  text?: string;
}

export const getErrorComponent = (props?: Props) => (
  <>
    <Header />
    <Container>
      <Message>{props?.text ?? 'エラーが発生しました'}</Message>
      <Link href={'/'}>
        <Button>トップページに戻る</Button>
      </Link>
    </Container>
  </>
);

const Container = styled.div`
  padding: 1em;
  text-align: center;
`;

const Message = styled.div`
  margin: 0 0 2em 0;
  color: ${variables.colorMain};
`;

const Button = styled.button`
  padding: 0.6rem 2rem;
  border-radius: 2rem;
  background-color: ${variables.colorKey};
  color: #fff;

  :visited {
    color: #fff;
  }
`;
