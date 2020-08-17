import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../../../shared/dish';
import { DishService } from '../../services/dish.service';
import { Promotion } from '../../../shared/promotion';
import { Leader } from '../../../shared/leader';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') public baseUrl: string) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      dishErrMess => this.dishErrMess = <any>dishErrMess);
    this.promotionservice.getFeaturedPromotion().subscribe(promo => this.promotion = promo,
      promoErrMess => this.promoErrMess = <any>promoErrMess);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader,
      leaderErrMess => this.leaderErrMess = <any>leaderErrMess);
  }

}
