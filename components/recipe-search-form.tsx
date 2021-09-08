import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { variables } from '../styles/variables';

interface Props {
  value: string;
  onChanged: (value: string) => void;
  onSubmit?: (value: string) => void;
}

/**
 * レシピ検索フォーム
 *
 * @param props
 * @constructor
 */
export const RecipeSearchForm: React.FC<Props> = props => {
  const [ value, setValue ] = useState(props.value);

  const onChanged = (value: string) => {
    setValue(value);
    props.onChanged(value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Form>
      <Input value={value} placeholder={'料理名'} onChange={e => onChanged(e.currentTarget.value)} />
      {props.onSubmit && (
        <SubmitButton type={'button'} onClick={e => props.onSubmit?.(e.currentTarget.value)}>保存</SubmitButton>
      )}
    </Form>
  );
};

const Form = styled.form`
  position: sticky;
  z-index: 2;
  top: 0;
  display: flex;
  padding: 1rem;
  background-color: #EBEBEB;
`;

const Input = styled.input`
  height: auto;
  width: 100%;
  padding: 1.2rem 1.5rem;
  border-radius: 50px 0 0 50px;
  background-color: #fff;

  :last-child {
    border-radius: 50px;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  left: -1px;
  width: 100px;
  padding-right: 10px;
  border-radius: 0 50px 50px 0;
  border: solid 1px ${variables.colorAccent};
  background-color: ${variables.colorAccent};
  color: #fff;
`;
