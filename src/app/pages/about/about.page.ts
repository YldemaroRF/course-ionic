import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../../../shared/leader';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  leaders: Leader[];
  leaderErrMess: string;
  constructor(private leaderService:LeaderService,
    @Inject('BaseURL') public baseUrl: string) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders,
      leaderErrMess => this.leaderErrMess = <any>leaderErrMess);
  }

}
