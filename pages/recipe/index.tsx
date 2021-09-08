import React, { useEffect, useState } from 'react';
import { Recipe } from "../../types";
import { RecipeList } from "../../components/recipe-list";
import { Header } from '../../components/header';
import { RecipeSearchForm } from '../../components/recipe-search-form';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { getErrorComponent } from '../../components/error';
import { Loading } from '../../components/loading';
import { Auth } from "../../components/auth";
import { getFetcher } from '../../services/base.service';
import { UserService } from '../../services/user.service';

/**
 * レシピ一覧ページ
 *
 * @constructor
 */
export default function Index() {
  const router = useRouter();
  const [ filteredRecipes, setFilteredRecipes ] = useState<Recipe[]>([]);
  const user = UserService.load();
  const { data: recipes, error: recipesError } = useSWR<Recipe[]>(`/recipe/all?userId=${router.query.userId}`, getFetcher(`/recipe/all?userId=${router.query.userId}`, user));

  useEffect(() => {
    setFilteredRecipes(recipes ?? []);
  }, [recipes]);

  if (recipesError) {
    return getErrorComponent();
  }

  const onValueChanged = (value: string) => {
    if (value === '') {
      setFilteredRecipes(recipes ?? []);
      return;
    }

    const filtered = recipes?.filter(recipe => recipe.kana.indexOf(value) >= 0) ?? [];
    setFilteredRecipes(filtered);
  };

  const onRecipeClicked = async (recipe: Recipe) => {
    await router.push(`/recipe/${recipe.id}`);
  };

  return (
    <Auth>
      <Header leftBtnIconSrc={'/icons/back.svg'} onLeftBtnClicked={() => router.back()} />
      <RecipeSearchForm value={''} onChanged={onValueChanged} />
      <RecipeList recipes={filteredRecipes} onClicked={onRecipeClicked} showLastCookDate={true} />
      <Loading show={!recipes} />
    </Auth>
  );
}
