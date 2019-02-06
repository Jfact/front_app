import { Component, OnInit } from '@angular/core';

import { GlobalVariables } from '../../shared/global-variables';

import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-menu-child',
  templateUrl: './menu-child.component.html',
  styleUrls: ['./menu-child.component.scss']
})
export class MenuChildComponent implements OnInit {
  roles : any = GlobalVariables.ROLES;
  menu : any = GlobalVariables.MENU;
  storage : any = {};
  user : any;

  constructor(private userService : UserService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
  

    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.userService
        .get(this.storage.authentication_token, this.storage.id)
        .subscribe(res => {
          
          this.user = res; 
          console.log(this.user)

        })
    });

  }

}
