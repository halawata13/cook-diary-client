import React from 'react';
import styled from "styled-components";

interface Props {
  show: boolean;
}

export const Loading: React.FC<Props> = props => (
  <Container className={props.show ? '-show' : ''}>Loading...</Container>
);

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 2.4rem;
  color: #fff;
  opacity: 0;
  pointer-events: none;
  
  &.-show {
    opacity: 1;
    transition: opacity 0.2s linear 2.5s;
    pointer-events: auto;
  }
`;
