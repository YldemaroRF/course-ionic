import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishService } from '../services/dish.service';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(public http: HttpClient,
    private dishservice: DishService,
    private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    
    storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites = favorites;
        console.log(favorites);
      }
      else{
        this.favorites = [];
        console.log('favorites not defined');
      }
        
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites)
    } 
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

  deleteFavorite(id): boolean {
    let index = this.favorites.indexOf(Number(id));
    console.log(index)
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.remove('favorites');
      this.storage.set('favorites',this.favorites);
      console.log(this.favorites)
    console.log("heyr 2")

      return true;
    }
    else {
      return true;
      console.log('Deleting non-existant favorite', id);
    }
  }
}
