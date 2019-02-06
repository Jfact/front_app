import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {
  routerParams : any = {};
  
  storage : any = {};
  
  notification : any = {};
  
  id : string = null;
  action : string = null;

  constructor(private routerActive : ActivatedRoute,
              private router : Router,
              private notificationService : NotificationService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
    this.id = this.routerActive.snapshot.paramMap.get('id');
    this.action = this.routerActive.snapshot.paramMap.get('action');

    console.log('id', this.id)
    console.log('action', this.action)

    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.notificationService
        .get(this.storage.authentication_token, this.id)
        .subscribe(res => {this.notification = res; console.log(res)})

      if(this.action == 'delete')
        this.notificationService
          .delete(this.storage.authentication_token, this.id)
          .subscribe(res => {
            this.notification = res; console.log(res)
            this.router.navigate(['/profile/notification'])
          })
      if(this.action == 'seen')
        this.notificationService
            .put({'seen' : true}, this.storage.authentication_token, this.id)
            .subscribe(res => {
              this.notification = res; 
              console.log(res);
              this.router.navigate(['/profile/notification'])
            }) 
    });
  }

}
