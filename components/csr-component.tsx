import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const CSRComponent = (props: Props) => {
  return <>{props.children}</>;
};

export default CSRComponent;
