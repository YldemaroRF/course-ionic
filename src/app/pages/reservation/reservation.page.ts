import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController,Platform} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  reservation: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ModalController,
    public platform: Platform,
    private fb: FormBuilder) {

      this.reservation = this.fb.group({
        guests: 3,
        smoking: false,
        dateTime: ['', Validators.required],
      });
  }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.reservation.value);
    this.viewCtrl.dismiss();
  }

}
