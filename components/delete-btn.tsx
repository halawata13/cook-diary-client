import React from 'react';
import { useSetRecoilState } from 'recoil';
import { dialogState } from '../stores/dialogStore';
import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  title?: string;
  message: string;
  onDelete: () => void;
}

/**
 * 削除ボタン
 *
 * @param props
 * @constructor
 */
export const DeleteBtn: React.FC<Props> = props => {
  const setDialog = useSetRecoilState(dialogState);

  const onClicked = () => {
    setDialog({
      show: true,
      title: props.title,
      message: props.message,
      onOkClicked: () => props.onDelete(),
    });
  };

  return (
    <Button onClick={onClicked}>
      <Image src={'/icons/trashbox.svg'} width={'32px'} height={'32px'} />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
`;
