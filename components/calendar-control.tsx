import React, { useState } from 'react';
import { DateTime } from "luxon";
import styled from "styled-components";
import { variables } from "../styles/variables";
import Image from 'next/image';

interface Props {
  date: Date;
  onDateChanged: (date: Date) => void;
}

/**
 * カレンダーコントロール
 *
 * @param props
 * @constructor
 */
export const CalendarControl: React.FC<Props> = props => {
  const [ date, setDate ] = useState(DateTime.fromJSDate(props.date));

  const onDateChanged = (duration: number) => {
    const targetDate = date.plus({ months: duration }).set({ day: 1 });
    setDate(targetDate);
    props.onDateChanged(targetDate.toJSDate());
  };

  return (
    <Control>
      <Button onClick={() => onDateChanged(-1)}>
        <Image src={'/icons/prev.svg'} width={30} height={30} />
        {date.plus({ months: -1 }).toFormat('MM')}
      </Button>
      <Current>
        <span>{date.toFormat('y')}</span>
        <Month>{date.toFormat('MM')}</Month>
      </Current>
      <Button onClick={() => onDateChanged(1)}>
        {date.plus({ months: 1 }).toFormat('MM')}
        <Image src={'/icons/next.svg'} width={30} height={30} />
      </Button>
    </Control>
  );
};

const Control = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.8rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-weight: 100;
  font-size: 3.2rem;
  color: ${variables.colorMain};
`;

const Current = styled.div`
  font-weight: 100;
  font-size: 3.2rem;
  color: ${variables.colorMain};
`;

const Month = styled.span`
  font-weight: 400;
  color: #000;
`;
