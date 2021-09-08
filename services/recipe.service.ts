import { NewRecipe, Recipe } from '../types';
import BaseService from './base.service';

/**
 * RecipeService
 */
export default class RecipeService extends BaseService {
  public async findOrCreate(recipe: NewRecipe) {
    return this.axiosInstance.post<Recipe>(`/recipe/find-or-create`, recipe).then(res => res.data);
  }

  public async create(recipe: NewRecipe) {
    return this.axiosInstance.post<Recipe>(`/recipe`, recipe).then(res => res.data);
  }

  public async update(recipe: Recipe) {
    return this.axiosInstance.put<Recipe>(`/recipe`, recipe).then(res => res.data);
  }

  public async delete(recipe: Recipe) {
    return this.axiosInstance.delete(`/recipe`, {
      params: recipe,
    });
  }
}
