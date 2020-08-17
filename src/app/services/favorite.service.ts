import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishService } from '../services/dish.service';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(public http: HttpClient,
    private dishservice: DishService) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) this.favorites.push(id);
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes().pipe(
      map(dishes => dishes.filter(dish => this.favorites.some(el => el === Number(dish.id)) )));
  }

  deleteFavorite(id: number): boolean {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      return true;
    }
    else {
      return true;
      console.log('Deleting non-existant favorite', id);
    }
  }
}
