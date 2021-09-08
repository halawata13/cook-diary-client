import React from 'react';
import { Dish, User } from '../types';
import Link from 'next/link';
import { List, ListItem, ListItemContent, ListItemLink } from '../styles/components/List';

interface Props {
  user: User;
  dishes: Dish[];
}

/**
 * 料理作成日リスト
 *
 * @param props
 * @constructor
 */
export const DishCreatedDateList: React.FC<Props> = props => (
  <List>
    {props.dishes.length > 0 ?
      props.dishes.map(dish => (
        <ListItem key={dish.id}>
          <Link href={`/diary?date=${dish.date}&userId=${props.user.id}`} passHref={true}>
            <ListItemLink>{dish.date}</ListItemLink>
          </Link>
        </ListItem>
      )) :
      <ListItem>
        <ListItemContent>作ったことがありません</ListItemContent>
      </ListItem>
    }
  </List>
);
