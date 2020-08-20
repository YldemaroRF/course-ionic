import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  image: string = 'assets/images/logo.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ModalController,
    private camera: Camera,
    private formBuilder: FormBuilder,
    public platform: Platform,) {
      this.registerForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)] ],
        telnum: ['', [Validators.required, Validators.pattern] ],
        email: ['', [Validators.required, Validators.email] ],
      });
     }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss(true);
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      sourceType:this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {

      this.image = imageData;
      console.log(imageData);
    }, (err) => {
        console.log('Error obtaining picture')
    });
  }

  getFromLibrary() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {

      this.image = imageData;
      console.log(imageData);
    }, (err) => {
        console.log('Error obtaining picture')
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

}
