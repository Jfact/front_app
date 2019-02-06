import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { NotificationService } from '../../services/notification.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notification : any = null;
  storage : any = {};

  notifyForm : FormGroup;
  notificationRes : any = {};


  constructor(private notificationService : NotificationService,
              private lss : LocalstorageService,
              private fb : FormBuilder,) { }

  ngOnInit() {

    this.notifyForm = this.fb.group({
      'seen' : ['true', Validators.required],
      'id' : [null]
    });

    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.notificationService
        .get(this.storage.authentication_token).subscribe(res => {this.notification = res.reverse(); console.log(res)})
    });
  }

  put(formData){
    this.lss.get().subscribe(data => {
      this.storage = data;
      console.log('form data -> ', formData)
      console.log('storage data -> ',this.storage)
      this.notificationService
        .put(formData, this.storage.authentication_token)
        .subscribe(res => {
          this.notificationRes = res;
          console.log(this.notificationRes);
        })
    });
  }

  delete(formData){
    this.lss.get().subscribe(data => {
      this.storage = data;
      console.log('form data -> ', formData)
      console.log('storage data -> ',this.storage)
      this.notificationService
        .delete(this.storage.authentication_token, formData.id)
        .subscribe(res => {
          this.notificationRes = res;
          console.log(this.notificationRes);
        })
    });
  }

}
