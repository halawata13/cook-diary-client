import React from 'react';
import Image from 'next/image';
import styled from "styled-components";
import { variables } from "../styles/variables";

interface Props {
  title?: string;
  titleIconSrc?: string;
}

export const Section: React.FC<Props> = props => (
  <section>
    {props.title &&
      <Header className={'header'}>
        <Title className={'title'}>
          {props.titleIconSrc &&
            <IconImage className={'icon'} src={props.titleIconSrc} alt={'icon'} width={30} height={30} />
          }
          {props.title}
        </Title>
      </Header>
    }
    <main>
      {props.children}
    </main>
  </section>
);

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${variables.colorSub};
  color: ${variables.colorMain};
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.8rem 1.6rem;
  font-size: 1.8rem;
  font-weight: normal;
`;

const IconImage = styled(Image)`
  margin: 0 0.3rem 0 0;
  vertical-align: middle;
`;
