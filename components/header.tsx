import React from 'react';
import Image from 'next/image';
import styled from "styled-components";
import { variables } from "../styles/variables";
import Link from 'next/link';

interface Props {
  leftBtnIconSrc?: string;
  rightBtnIconSrc?: string;
  onLeftBtnClicked?: () => void;
  onRightBtnClicked?: () => void;
}

export const Header: React.FC<Props> = props => (
  <Container>
    <Icon>
      {props.leftBtnIconSrc && (
        <button onClick={() => props.onLeftBtnClicked?.()}>
          <Image
            src={props.leftBtnIconSrc}
            width={'40px'}
            height={'40px'}
          />
        </button>
      )}
    </Icon>
    <Title>
      <Link href={'/'} passHref={true}><TitleA>Cook Diary</TitleA></Link>
    </Title>
    <Icon>
      {props.rightBtnIconSrc && (
        <button onClick={() => props.onRightBtnClicked?.()}>
          <Image
            src={props.rightBtnIconSrc}
            width={'40px'}
            height={'40px'}
          />
        </button>
      )}
    </Icon>
  </Container>
);

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5.4rem;
  padding: 0.4rem;
  background-color: ${variables.colorMain};
  color: #fff;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  font-weight: 600;
  font-family: ${variables.fontTitle};
`;

const TitleA = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Icon = styled.div`
  display: flex;
  width: 44px;
  padding: 0;
  align-items: center;
  color: #fff;
`;
