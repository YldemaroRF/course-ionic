import { Component, OnInit } from '@angular/core';

import { Platform, ModalController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ReservationPage } from './pages/reservation/reservation.page';
import { LoginPage } from './pages/login/login.page';
import { Network } from '@ionic-native/network/ngx';


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

  loading: any = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private network: Network
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();

      this.network.onDisconnect().subscribe(() => {
        if (!this.loading) {
          this.loading = this.loadingCtrl.create({
            message: 'Network Disconnected'
          });
          this.loading.present();
        }
      });

      this.network.onConnect().subscribe(() => {

        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      });
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
