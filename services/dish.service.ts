import { Dish, NewDish } from '../types';
import BaseService from './base.service';

/**
 * DishService
 */
export default class DishService extends BaseService {
  public async createDish(dish: NewDish) {
    return this.axiosInstance.post<Dish>(`/dish`, dish).then(res => res.data);
  }

  public async deleteDish(dish: Dish) {
    return this.axiosInstance.delete(`/dish`, {
      params: {
        id: dish.id,
      }
    }).then(res => res.data);
  }
}
