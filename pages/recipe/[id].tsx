import React, { useMemo } from 'react';
import { Section } from '../../components/section';
import { useRouter } from 'next/router';
import { Dish, Recipe, RecipeSite } from '../../types';
import useSWR from 'swr';
import { getErrorComponent } from '../../components/error';
import { Header } from '../../components/header';
import { Memo } from '../../components/memo';
import { RecipeSiteList } from '../../components/recipe-site-list';
import { DishCreatedDateList } from '../../components/dish-created-date-list';
import RecipeService from '../../services/recipe.service';
import { useSetRecoilState } from 'recoil';
import { ToastMessageType, toastState } from '../../stores/toastStore';
import { Auth } from "../../components/auth";
import { Loading } from '../../components/loading';
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';

export default function Detail() {
  const router = useRouter();
  const id = router.query.id;
  const setToast = useSetRecoilState(toastState);
  const user = UserService.load();

  const { data: recipe, error: recipeError, mutate: mutateRecipe } = useSWR<Recipe>(`/recipe?id=${id}`, getFetcher(`/recipe?id=${id}`, user));
  const { data: dishes, error: dishError } = useSWR<Dish[]>(`/dish/recipe?recipeId=${id}`, getFetcher(`/dish/recipe?recipeId=${id}`, user));
  const { data: recipeSites, error: recipeSitesError } = useSWR<RecipeSite[]>(`/recipe-site`, getFetcher(`/recipe-site`, user));

  const recipeSiteUrlReplaced = useMemo(() => {
    if (!recipe) {
      return [];
    }

    return recipeSites?.map(site => ({
      ...site,
      url: site.url.replace('##keyword##', recipe.name),
    })) ?? [];
  }, [recipe, recipeSites]);

  if (recipeError || dishError || recipeSitesError) {
    return getErrorComponent();
  }

  const onMemoChanged = async (value: string) => {
    if (!recipe || !user) return;

    const params: Recipe = {
      ...recipe,
      memo: value,
    };

    try {
      const recipeService = new RecipeService(user);

      const updated = await recipeService.update(params);
      await mutateRecipe(updated);

    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: 'メモの変更に失敗しました',
        type: ToastMessageType.error,
      });
    }
  };

  return (
    <Auth>
      <Header leftBtnIconSrc={'/icons/back.svg'} onLeftBtnClicked={() => router.back()} />
      {recipe && dishes && (
        <>
          <Section title={`${recipe.name}について一言`} titleIconSrc={'/icons/speech.svg'}>
            <Memo memo={recipe.memo} onMemoChanged={onMemoChanged} editable={Number(recipe.userId) === Number(user?.id)} />
          </Section>
          <Section title={`${recipe.name}をレシピサイトで検索`} titleIconSrc={'/icons/search.svg'}>
            <RecipeSiteList recipeSites={recipeSiteUrlReplaced} />
          </Section>
          <Section title={`${recipe.name}を作った日`} titleIconSrc={'/icons/dish.svg'}>
            <DishCreatedDateList dishes={dishes} user={{ id: Number(recipe.userId) }} />
          </Section>
        </>
      )}
      <Loading show={!recipe || !dishes} />
    </Auth>
  );
}
