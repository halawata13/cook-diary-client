import React from 'react';
import { LoginUser } from '../types';
import { Section } from './section';
import Link from 'next/link';
import { List, ListItem, ListItemLink } from '../styles/components/List';

interface Props {
  users: LoginUser[];
}

/**
 * ユーザーリスト
 *
 * @param props
 * @constructor
 */
export const UserList: React.FC<Props> = props => (
  <>
    {props.users.map(user => (
      <Section title={`${user.name}さん`} key={user.id}>
        <List>
          <ListItem>
            <Link href={`/diary?userId=${user.id}`} passHref={true}>
              <ListItemLink>日記を見る</ListItemLink>
            </Link>
          </ListItem>
          <li>
            <Link href={`/recipe?userId=${user.id}`} passHref={true}>
              <ListItemLink>レシピを見る</ListItemLink>
            </Link>
          </li>
        </List>
      </Section>
    ))}
  </>
);
