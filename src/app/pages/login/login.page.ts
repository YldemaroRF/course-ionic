import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController,Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../../shared/user';
import { RegisterPage } from '../register/register.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ModalController,
    private formBuilder: FormBuilder,
    public platform: Platform,
    private storage: Storage) { 

      storage.get('user').then(user => {
        if (user) {
          console.log(user);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username, 
              'password': this.user.password 
            });
        }
        else
          console.log('user not defined');
      });

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['',Validators.required],
        remember: true
      });
    }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.loginForm.value, this.user);
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    console.log(this.user);
    if(this.loginForm.get('remember').value)
      this.storage.set('user', this.user)
    else
      this.storage.remove('user');
    this.viewCtrl.dismiss();
  }

  async openRegister() {
    let modal = await this.viewCtrl.create({
      component: RegisterPage,
      cssClass: 'my-custom-class'
    });

    modal.present();
    this.viewCtrl.dismiss();
  }

}
