import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Dish } from '../../../shared/dish';
import { Comment } from '../../../shared/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

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
    private favoriteservice: FavoriteService) { 
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

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(Number(this.dish.id));
  }

}
