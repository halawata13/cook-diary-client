import React from 'react';
import { RecipeSite } from '../types';
import { List, ListItem, ListItemLink } from '../styles/components/List';

interface Props {
  recipeSites: RecipeSite[];
}

export const RecipeSiteList: React.FC<Props> = props => (
  <List>
    {props.recipeSites.map((site, index) => (
      <ListItem key={index}>
        <ListItemLink href={site.url} target="_blank" rel="noopener noreferrer">{site.name}</ListItemLink>
      </ListItem>
    ))}
  </List>
);
