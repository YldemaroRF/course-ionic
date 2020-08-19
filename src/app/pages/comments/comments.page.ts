import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController,Platform} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  commentForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ModalController,
    public platform: Platform,
    private fb: FormBuilder) { 
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        rating: ['5', [Validators.required]],
        comment: ['', [Validators.required] ],
        date: new Date()
      });

    }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.viewCtrl.dismiss(this.commentForm.value)
  }

}
