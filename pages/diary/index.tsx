import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Diary, Dish } from '../../types';
import { getErrorComponent } from '../../components/error';
import { Header } from '../../components/header';
import { CalendarTable } from '../../components/calendar-table';
import { Section } from '../../components/section';
import { DateTime } from 'luxon';
import * as queryString from 'querystring';
import { Memo } from '../../components/memo';
import { DishList } from '../../components/dish-list';
import { useSetRecoilState } from "recoil";
import { ToastMessageType, toastState } from "../../stores/toastStore";
import DishService from "../../services/dish.service";
import { DiaryService } from "../../services/diary.service";
import { CalendarControl } from "../../components/calendar-control";
import { Loading } from '../../components/loading';
import { Auth } from "../../components/auth";
import { UserService } from '../../services/user.service';
import { getFetcher } from '../../services/base.service';

export default function diary() {
  const router = useRouter();
  const query = queryString.parse(router.asPath.split(/\?/)[1]);
  const userId = query.userId;
  const dateString = query.date;
  const queryDate = dateString ? DateTime.fromFormat(String(dateString), 'y-MM-dd') : DateTime.fromJSDate(new Date());
  const [ selectedDate, setSelectedDate ] = useState(queryDate.toJSDate());
  const setToast = useSetRecoilState(toastState);
  const user = UserService.load();

  const getQuery = queryString.stringify({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth() + 1,
    date: selectedDate.getDate(),
    userId,
  });

  const { data: diary, error: diaryError, mutate: mutateDiary } = useSWR<Diary>(`/diary?${getQuery}`, getFetcher(`/diary?${getQuery}`, user));
  const { data: dishes, error: dishError, mutate: mutateDishes } = useSWR<Dish[]>(`/dish/date?${getQuery}`, getFetcher(`/dish/date?${getQuery}`, user));

  if (diaryError || dishError) {
    return getErrorComponent();
  }

  const onControlDateChanged = (date: Date) => {
    setSelectedDate(date);
  };

  const onDateClicked = (date: Date) => {
    setSelectedDate(date);
  };

  const onDishDeleted = async (dish: Dish) => {
    if (!dishes || !user) return;

    try {
      const dishService = new DishService(user);
      await dishService.deleteDish(dish);
      await mutateDishes(dishes.filter(d => d.id !== dish.id));

    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: '料理の削除に失敗しました',
        type: ToastMessageType.error,
      });
    }
  };

  const onMemoChanged = async (value: string) => {
    if (!diary || !user) return;

    try {
      const diaryService = new DiaryService(user);

      const updated = (async () => {
        if ('id' in diary) {
          return await diaryService.update({
            ...diary,
            memo: value,
          });
        } else {
          return await diaryService.create({
            date: queryDate.toFormat('y-MM-dd'),
            memo: value,
          });
        }
      })();

      await mutateDiary(updated);

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
      <CalendarControl date={selectedDate} onDateChanged={onControlDateChanged} />
      <CalendarTable date={selectedDate} onClicked={onDateClicked} />
      <Section title={`${DateTime.fromJSDate(selectedDate).toFormat('DD')}の献立`} titleIconSrc={'/icons/dish.svg'}>
        {diary && (
          <DishList dishes={dishes ?? []} date={selectedDate} onDishDeleted={onDishDeleted} editable={Number(diary.userId) === Number(user?.id)} />
        )}
      </Section>
      <Section title={`メモ`} titleIconSrc={'/icons/speech.svg'}>
        {diary && (
          <Memo memo={diary?.memo ?? ''} onMemoChanged={onMemoChanged} editable={Number(diary.userId) === Number(user?.id)} />
        )}
      </Section>
      <Loading show={!dishes || !diary} />
    </Auth>
  );
}
