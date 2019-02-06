import { Component, OnInit } from '@angular/core';

import { QueryService } from '../../services/query.service';
import { LocalstorageService } from '../../services/localstorage.service';

import { GlobalVariables } from '../../shared/global-variables';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  storage : any = {};
  queryStatuses : any = GlobalVariables.QSTATUSES;
  
  settings = {
    columns: {
      creator: {
        title: 'Заказчик'
      },
      name: {
        title: 'Название'
      },
      status: {
        title: 'Статус'
      },
      created_at: {
        title: 'Дата'
      }
    }
  };

  queryList : any = {};

  constructor(private queryService : QueryService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.queryService
        .get(this.storage.authentication_token)
        .subscribe(res => {
          
          this.queryList = res.reverse();
          console.log(this.queryList)
        })
    });
  }

}
