import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, ToastController,ActionSheetController, ModalController  } from '@ionic/angular';
import { Dish } from '../../../shared/dish';
import { Comment } from '../../../shared/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { CommentsPage } from '../comments/comments.page';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
  providers:[NavParams]
})
export class DishdetailPage implements OnInit {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  
  constructor(private route: ActivatedRoute, 
    private router: Router,
    public navCtrl: NavController, 
    public navParams: NavParams,
    @Inject('BaseURL') public baseUrl,
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController,
    public actionSheetController: ActionSheetController,
    public modalCtrl: ModalController) { 
      this.route.queryParams.subscribe(params => {
        this.dish = JSON.parse(params.currency);
        this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
        this.favorite = favoriteservice.isFavorite(Number(this.dish.id));
      });
      
    }

  ngOnInit() {
  }

  async addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(Number(this.dish.id));
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000});
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Add to Favorites',
        handler: () => {
          this.addToFavorites();
        }
      }, {
        text: 'Add a Comment',
        handler: () => {
          this.openComment();
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async openComment() {
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      cssClass: 'my-custom-class'
    });

    modal.present();
    const { data } = await modal.onWillDismiss();
    this.dish.comments.push(data);
  }

}
