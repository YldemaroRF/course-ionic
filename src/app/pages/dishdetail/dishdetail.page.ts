import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Dish } from '../../../shared/dish';
import { Comment } from '../../../shared/comment';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router,public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') public baseUrl) { 
      this.route.queryParams.subscribe(params => {
        this.dish = JSON.parse(params.currency);
        this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
      });
    }

  ngOnInit() {
  }

}
