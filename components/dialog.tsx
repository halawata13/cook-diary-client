import React from 'react';
import { useRecoilState } from 'recoil';
import { dialogState, initialDialogState } from '../stores/dialogStore';
import styled from 'styled-components';
import { variables } from '../styles/variables';

export const Dialog: React.FC = () => {
  const [ dialog, setDialog ] = useRecoilState(dialogState);

  const onOkClicked = () => {
    setDialog(initialDialogState);
    dialog.onOkClicked?.();
  };

  const onNgClicked = () => {
    setDialog(initialDialogState);
    dialog.onNgClicked?.();
  };

  return (
    <DialogContainer className={dialog.show ? '-show' : ''}>
      <DialogContent>
        <DialogHeader>
          <h1>{dialog.title}</h1>
        </DialogHeader>
        <DialogMain>
          <p>{dialog.message}</p>
        </DialogMain>
        <DialogFooter>
          <DialogButtonNG onClick={onNgClicked}>キャンセル</DialogButtonNG>
          <DialogButtonOK onClick={onOkClicked}>OK</DialogButtonOK>
        </DialogFooter>
      </DialogContent>
    </DialogContainer>
  );
};

const DialogContainer = styled.dialog`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;

  &.-show {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.1s linear;
  }
`;

const DialogContent = styled.section`
  position: relative;
  width: 250px;
  padding: 0 0 60px 0;
  border-radius: 15px;
  background-color: #fff;
`;

const DialogHeader = styled.header`
  padding: 1em;
  border-radius: 15px 15px 0 0;
  text-align: center;
  font-weight: bold;
`;

const DialogMain = styled.main`
  margin: 0;
  padding: 0 1em;
`;

const DialogFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 44px;
  width: 100%;
  display: flex;
  border-top: solid 1px #CBCBCB;
`;

const DialogButton = styled.button`
  width: 50%;
`;

const DialogButtonNG = styled(DialogButton)`
  position: relative;
  color: #666;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #CBCBCB;
  }
`;

const DialogButtonOK = styled(DialogButton)`
  font-weight: bold;
  color: ${variables.colorMain};
`;
