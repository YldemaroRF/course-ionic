import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController,Platform} from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ModalController,
    public platform: Platform) {
     }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
