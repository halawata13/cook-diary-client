import { Header } from '../../components/header';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RecipeSearchForm } from '../../components/recipe-search-form';
import { NewRecipe, Recipe } from '../../types';
import useSWR from 'swr';
import { getErrorComponent } from '../../components/error';
import { RecipeList } from '../../components/recipe-list';
import RecipeService from '../../services/recipe.service';
import { useSetRecoilState } from 'recoil';
import { ToastMessageType, toastState } from '../../stores/toastStore';
import { DateTime } from 'luxon';
import DishService from '../../services/dish.service';
import { Loading } from '../../components/loading';
import queryString from 'querystring';
import { Auth } from "../../components/auth";
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';

export default function Create() {
  const router = useRouter();
  const query = queryString.parse(router.asPath.split(/\?/)[1]);
  const dateString = query.date;
  const queryDate = dateString ? DateTime.fromFormat(String(dateString), 'y-MM-dd') : DateTime.fromJSDate(new Date());
  const [ filteredRecipes, setFilteredRecipes ] = useState<Recipe[]>([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const user = UserService.load();
  const { data: recipes, error: recipesError, mutate: mutateRecipe } = useSWR<Recipe[]>(`/recipe/all`, getFetcher(`/recipe/all`, user));
  const setToast = useSetRecoilState(toastState);

  useEffect(() => {
    setFilteredRecipes(recipes ?? []);
  }, [recipes]);

  if (recipesError || !dateString) {
    return getErrorComponent();
  }

  const onValueChanged = (value: string) => {
    setSearchQuery(value);

    if (value === '') {
      setFilteredRecipes(recipes ?? []);
      return;
    }

    const filtered = recipes?.filter(recipe => recipe.kana.indexOf(value) >= 0) ?? [];
    setFilteredRecipes(filtered);
  };

  const onRecipeClicked = async (recipe: Recipe) => {
    setSearchQuery(recipe.name);
    onValueChanged(recipe.name);
  };

  const onDoneClicked = async () => {
    if (!user) return;

    const newRecipe: NewRecipe = {
      name: searchQuery,
      kana: searchQuery,
    };

    try {
      const recipeService = new RecipeService(user);
      const dishService = new DishService(user);

      const recipe = await recipeService.findOrCreate(newRecipe);
      recipes && await mutateRecipe(recipes.concat(recipe));

      await dishService.createDish({
        recipeId: recipe.id,
        date: queryDate.toFormat('y-MM-dd'),
      });

      setToast({
        show: true,
        message: '料理を追加しました',
        type: ToastMessageType.success,
      });

      await router.push(`/diary?date=${dateString}&userId=${user.id}`);

    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: '料理の追加に失敗しました',
        type: ToastMessageType.error,
      });
    }
  };

  return (
    <Auth>
      <Header
        leftBtnIconSrc={'/icons/back.svg'}
        onLeftBtnClicked={() => router.back()}
      />
      <RecipeSearchForm value={searchQuery} onChanged={onValueChanged} onSubmit={() => onDoneClicked()} />
      <RecipeList recipes={filteredRecipes} onClicked={onRecipeClicked} showLastCookDate={false} />
      <Loading show={!recipes} />
    </Auth>
  );
}
