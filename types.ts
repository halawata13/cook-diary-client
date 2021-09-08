export interface Recipe {
  id: number;
  userId: number;
  name: string;
  kana: string;
  memo: string;
  lastCookedDate?: string;
}

export type NewRecipe = Omit<Recipe, 'id' | 'memo' | 'userId'>;

export interface Dish {
  id: number;
  recipeId: number;
  date: string;
  recipe: Recipe;
}

export type NewDish = Omit<Dish, 'id' | 'recipe'>;

export interface Diary {
  id: number;
  userId: number;
  date: string;
  memo: string;
}

export type NewDiary = Omit<Diary, 'id' | 'userId'>

export interface User {
  id: number;
}

export interface LoginUser extends User {
  name: string;
  accessToken: string;
}

export interface RecipeSite {
  id: number;
  name: string;
  url: string;
}
