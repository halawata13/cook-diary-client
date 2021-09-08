import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  memo: string;
  editable?: boolean;
  onMemoChanged: (value: string) => void;
}

/**
 * メモ入力欄
 *
 * @param props
 * @constructor
 */
export const Memo: React.FC<Props> = props => {
  const [ memo, setMemo ] = useState(props.memo);

  useEffect(() => {
    setMemo(props.memo);
  }, [props.memo]);

  return (
    <TextArea id={'memo'} value={memo} onChange={e => setMemo(e.currentTarget.value)} onBlur={e => props.onMemoChanged(e.currentTarget.value)} readOnly={!props.editable} />
  );
};

const TextArea = styled.textarea`
  width: 100%;
  min-height: 20rem;
  padding: 0.8rem 1.6rem;
`;
