import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user : any = null;
  storage : any = {};

  constructor(private userService : UserService,
              private lss : LocalstorageService,) {
    
   }

  ngOnInit() {
    this.lss.get().subscribe(data => {
      this.storage = data;

      this.userService
        .get(this.storage.authentication_token, this.storage.id).subscribe(res => {this.user = res; console.log(res)})
    });
  }

}
