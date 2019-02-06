import { Component, OnInit } from '@angular/core';

import { GlobalVariables } from './shared/global-variables';

import { UserService } from './services/user.service';
import { LocalstorageService } from './services/localstorage.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title : string = 'Тюменская Областная Научная Библиотека';
  subTitle : string = 'Межбиблиотечный Абонемент и Электронная Доставка Документов';
  roles : any = GlobalVariables.ROLES;

  menu : any = GlobalVariables.MENU;

  user : any = null;
  storage : any = {};


  constructor(private userService : UserService,
              private lss : LocalstorageService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.lss.get().subscribe(data => {
      this.storage = data;

      this.userService
        .get(this.storage.authentication_token, this.storage.id).subscribe(res => {this.user = res; console.log(res)})
    });
  }
}
