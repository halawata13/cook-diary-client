import React from 'react';
import { Recipe } from '../types';
import { List, ListItem, ListItemContent } from '../styles/components/List';
import { DateTime } from 'luxon';
import styled from "styled-components";

interface Props {
  recipes: Recipe[];
  onClicked?: (recipe: Recipe) => void;
  showLastCookDate: boolean;
}

/**
 * レシピリスト
 *
 * @param props
 * @constructor
 */
export const RecipeList: React.FC<Props> = props => (
  <List>
    {props.recipes.map((recipe, index) => (
      <ListItem key={index} onClick={() => props.onClicked?.(recipe)}>
        <ListItemContent>{recipe.name}</ListItemContent>
        {props.showLastCookDate && (
          <ListItemDate>{recipe.lastCookedDate ? DateTime.fromJSDate(new Date(recipe.lastCookedDate)).toFormat('y/MM/dd') : ''}</ListItemDate>
        )}
      </ListItem>
    ))}
  </List>
);

const ListItemDate = styled(ListItemContent)`
  flex: 0 0 auto;
  width: 120px;
  text-align: right;
  color: #666;
`;
