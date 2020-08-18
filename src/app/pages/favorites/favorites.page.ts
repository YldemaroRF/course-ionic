import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, IonItemSliding,ToastController, LoadingController, AlertController } from '@ionic/angular'
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
    @Inject('BaseURL') public baseUrl,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  async deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);

    let alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Do you want to delete Dish '+ id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            let loading = await this.loadingCtrl.create({
              message: "Deleting . . .",
            });
            loading.present();
            this.favoriteservice.deleteFavorite(id);
            this.favorites.splice(id, 1);
            item.close();
            const toast = await this.toastCtrl.create({
              message: "Dish " + id + " deleted successfully",
              duration: 3000,
            });
            loading.dismiss();
            toast.present();
          }
        }
      ]
    });
  
    alert.present();
    item.close();
  }

}
