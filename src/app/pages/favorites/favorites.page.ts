import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, IonItemSliding } from '@ionic/angular'
import { FavoriteService } from '../../services/favorite.service';
import { Dish } from '../../../shared/dish';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  providers:[NavParams]
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteservice: FavoriteService,
    @Inject('BaseURL') public baseUrl) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);
    this.favoriteservice.deleteFavorite(id);
    this.favorites.splice(id,1);
    item.close();
  }

}
