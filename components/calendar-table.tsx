import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { variables } from '../styles/variables';

interface Props {
  date: Date;
  onClicked: (date: Date) => void;
}

/**
 * カレンダー
 *
 * @param props
 * @constructor
 */
export const CalendarTable: React.FC<Props> = props => {
  const [ date, setDate ] = useState(props.date);

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const onClicked = (day: number) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    props.onClicked(clickedDate);
    setDate(clickedDate);
  };

  const dateObj = new Date();

  const todayYear = dateObj.getFullYear();
  const todayDate = dateObj.getDate();
  const todayMonth = dateObj.getMonth();

  const weekLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDateCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const calendarYear = date.getFullYear();

  const calendarDateObj = new Date(calendarYear, date.getMonth());
  // うるう年
  monthDateCount[1] = ((calendarYear % 4) === 0 && (calendarYear % 100) !== 0) || (calendarYear % 400) === 0 ? 29 : 28;

  const calendarMonth = calendarDateObj.getMonth();
  calendarDateObj.setDate(1);
  const calendarFirstDay = calendarDateObj.getDay();
  const calendarRows = Math.ceil((calendarFirstDay + monthDateCount[calendarMonth]) / 7);
  const calendarCells = new Array<number | null>(7 * calendarRows);

  for (let i = 0; i < 7 * calendarRows; i++) {
    calendarCells[i] = null;
  }

  for (let i = 0; i < monthDateCount[calendarMonth]; i++) {
    calendarCells[i + calendarFirstDay] = i + 1;
  }

  const source = [];
  let emptyKey = -1;

  for (let i = 0; i < calendarRows; i++) {
    const row = [];

    for (let j = 0; j < 7; j++) {
      const calendarDate = calendarCells[j + (i * 7)];
      const key = calendarDate || emptyKey--;

      const selected = calendarDate === date.getDate();
      const today = todayYear === calendarYear && todayMonth === calendarMonth && todayDate === calendarDate;
      const sat = j === 6;
      const sun = j === 0;

      if (!calendarDate) {
        row.push(<td key={key} />);
        continue;
      }

      const cell = (() => {
         if (today) {
           return <CalendarCellToday className={selected ? '-selected' : ''}><span>{calendarDate}</span></CalendarCellToday>;
        } else if (sat) {
          return <CalendarCellSat className={selected ? '-selected' : ''}><span>{calendarDate}</span></CalendarCellSat>;
        } else if (sun) {
          return <CalendarCellSun className={selected ? '-selected' : ''}><span>{calendarDate}</span></CalendarCellSun>;
        } else {
          return <CalendarCell className={selected ? '-selected' : ''}><span>{calendarDate}</span></CalendarCell>;
        }
      })();

      row.push(
        <td key={key} onClick={() => onClicked(calendarDate)}>
          {cell}
        </td>
      );
    }

    source.push(<tr key={i}>{row}</tr>);
  }

  const week = Array.from(Array(7)).map((_, i) => {
    if (i === 0) {
      return <th key={weekLabel[i]}><CalendarCellSun>{weekLabel[i]}</CalendarCellSun></th>;
    } else if (i === 6) {
      return <th key={weekLabel[i]}><CalendarCellSat>{weekLabel[i]}</CalendarCellSat></th>;
    } else {
      return <th key={weekLabel[i]}><CalendarCell>{weekLabel[i]}</CalendarCell></th>;
    }
  });

  return (
    <div>
      <CalendarContainer>
        <thead>
          <tr>{week}</tr>
        </thead>
        <tbody>
          {source}
        </tbody>
      </CalendarContainer>
    </div>
  );
};

const CalendarContainer = styled.table`
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  line-height: 1.3;
`;

const CalendarCell = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 auto 1rem;
  padding: 1rem;
  font-weight: normal;
  color: black;
  
  & span {
    position: relative;
    z-index: 1;
  }
  
  &.-selected {
    color: white;
  }

  &.-selected::before {
    content: '';
    position: absolute;
    left: calc(50% - 2rem);
    top: 0;
    height: 4rem;
    width: 4rem;
    border-radius: 100%;
    background-color: ${variables.colorAccent};
    animation: bounce 0.5s;
  }

  &.-selected::after {
    content: attr(data-value);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

const CalendarCellSat = styled(CalendarCell)`
  color: ${variables.colorBlue};
`;

const CalendarCellSun = styled(CalendarCell)`
  color: ${variables.colorRed};
`;

const CalendarCellToday = styled(CalendarCell)`
  position: relative;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: 0;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background-color: ${variables.colorSub};
  }

  &::after {
    content: attr(data-value);
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
