import styled from 'styled-components';
import { variables } from '../variables';

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 1.5rem;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  border-bottom: solid 1px ${variables.colorBorder};
  
  :last-child {
    border-bottom: none;
  }
`;

export const ListItemContent = styled.div`
  padding: 1.2rem 0;
`;

export const ListItemLink = styled.a`
  display: block;
  width: 100%;
  padding: 1.2rem 0;
  color: inherit;
  text-decoration: none;
`;
