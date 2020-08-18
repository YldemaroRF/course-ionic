import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Dish } from '../../../shared/dish';
import { DishService } from '../../services/dish.service';
import { DishdetailPage } from '../dishdetail/dishdetail.page';
import { NavigationExtras } from '@angular/router'
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  providers:[NavParams]
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController,public navParams: NavParams,
    private dishservice: DishService,
    @Inject('BaseURL') public baseUrl: string,
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish) {
    // That's right, we're pushing to ourselves!
    let navigationExtras: NavigationExtras = {
      queryParams: {
          currency: JSON.stringify(dish)
      }
  };
    this.navCtrl.navigateForward(['dishdetail'],navigationExtras);
  }
  
  async addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(Number(dish.id));
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000});
    toast.present();
  }
  

}
