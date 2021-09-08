import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMessageType, toastState } from '../stores/toastStore';
import styled from 'styled-components';
import { variables } from '../styles/variables';

let hiddenTimer: number;

export const Toast: React.FC = () => {
  const [ toast, setToast ] = useRecoilState(toastState);

  useEffect(() => {
    if (toast.show) {
      hiddenTimer = window.setTimeout(() => onClick(), 5000);
    }
  }, [toast.show]);

  const typeClass = (() => {
    switch (toast.type) {
      case ToastMessageType.info:
        return '-info';

      case ToastMessageType.success:
        return '-success';

      case ToastMessageType.warning:
        return '-warning';

      case ToastMessageType.error:
        return '-error';
    }
  })();

  const showClass = toast.show ? '-show' : '';

  const onClick = () => {
    clearTimeout(hiddenTimer);
    setToast({
      ...toast,
      show: false,
    });
  };

  return (
    <Message className={[typeClass, showClass].join(' ')} onClick={onClick}>{toast.message}</Message>
  );
};

const Message = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  transform: translateY(100%);
  transition: transform 0.2s ease-out;
  color: #fff;

  &.-info {
    background-color: ${variables.colorBlue};
  }

  &.-success {
    background-color: ${variables.colorGreen};
  }

  &.-warning {
    background-color: ${variables.colorOrange};
  }

  &.-error {
    background-color: ${variables.colorRed};
  }

  &.-show {
    transform: translateY(0%);
    transition: transform 0.2s ease-out;
  }
`;
