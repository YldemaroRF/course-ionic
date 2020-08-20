import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReservationPage } from './pages/reservation/reservation.page';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About us',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'list-box'
    },
    {
      title: 'Contact us',
      url: '/contact',
      icon: 'contact'
    },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'heart'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  ngOnInit() {
    
  }

  async openReserve() {
    const modal = await this.modalCtrl.create({
      component: ReservationPage,
      cssClass: 'my-custom-class'
    });

    modal.present();
    
  }

  async openLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      cssClass: 'my-custom-class'
    });
    modal.present();
  }
}
