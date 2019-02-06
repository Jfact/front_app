import { GlobalVariables } from '../../shared/global-variables';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  roles : any = GlobalVariables.ROLES;
  user : any = {};
  storage : any = {};

  constructor(private userService : UserService,
              private lss : LocalstorageService) { }

  ngOnInit() {
    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.userService
        .get(this.storage.authentication_token, this.storage.id).subscribe(res => {this.user = res; console.log(res)})
        //.subscribe(data => {this.user = data; console.log(this.user)})

        //this.userService.user.subscribe(res => {this.user = res;});
    });
  }

}
