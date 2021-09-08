import React from 'react';
import { Dish } from '../types';
import Link from 'next/link';
import { DeleteBtn } from "./delete-btn";
import { List, ListItem, ListItemLink } from '../styles/components/List';
import styled from "styled-components";
import { variables } from '../styles/variables';
import { DateTime } from 'luxon';

interface Props {
  date: Date;
  dishes: Dish[];
  editable: boolean;
  onDishDeleted: (dish: Dish) => void;
}

/**
 * 料理リスト
 *
 * @param props
 * @constructor
 */
export const DishList: React.FC<Props> = props => (
  <List>
    {props.dishes.map(dish => (
      <ListItem key={dish.id}>
        <Link href={`/recipe/${dish.recipe.id}`}>
          <ListItemLink>{dish.recipe.name}</ListItemLink>
        </Link>
        {props.editable && (
          <DeleteBtn
            title={'削除'}
            message={`${dish.recipe.name}を削除します。よろしいですか？`}
            onDelete={() => props.onDishDeleted(dish)}
          />
        )}
      </ListItem>
    ))}

    {props.editable && (
      <ListItemCenter>
        <Link href={`/dish/create?date=${DateTime.fromJSDate(props.date).toFormat('y-MM-dd')}`}>
          <ListItemButton>料理を追加</ListItemButton>
        </Link>
      </ListItemCenter>
    )}

    {!props.editable && props.dishes.length === 0 && (
      <ListItemCenter>料理が登録されていません</ListItemCenter>
    )}
  </List>
);

const ListItemCenter = styled(ListItem)`
  justify-content: center;
  padding: 0.6rem 0;
`;

const ListItemButton = styled.a`
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  background-color: ${variables.colorKey};
  color: #fff;
  
  :visited {
    color: #fff;
  }
`;
