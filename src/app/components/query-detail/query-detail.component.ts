import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GlobalVariables } from '../../shared/global-variables';

import { QueryService } from '../../services/query.service';
import { DocumentService } from '../../services/document.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {

  storage : any = {};
  query : any = null;
  documents : any = {};

  editQueryForm : FormGroup;

  roles : any = GlobalVariables.ROLES;
  queryStatuses : any = GlobalVariables.QSTATUSES;
  documentStatuses : any = GlobalVariables.DSTATUSES;
  delivery : any = GlobalVariables.DELIVERY;

  constructor(private route: ActivatedRoute,
              private fb : FormBuilder,
              private queryService : QueryService,
              private documentService : DocumentService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.lss.get().subscribe(data => {
      this.storage = data;

      this.queryService
        .get(this.storage.authentication_token, id)
        .subscribe(res => {
          this.query = res; 
          console.log(this.query)
          this.editQueryForm = this.fb.group({
            'status' : ['confirm'],
            // 'catalog' : ['ekc'],
            // 'limit' : [],
            // 'place' : ['abis'],
      
            // 'query': [null, Validators.required],
          });
        })

      this.documentService
        .get(this.storage.authentication_token, id)
        .subscribe(res => {this.documents = res; console.log(this.documents)})

    });

  }

  put(formData){
    let id = this.route.snapshot.paramMap.get('id');
    
    this.lss.get().subscribe(data => {
      this.storage = data;

      this.queryService
        .put(formData, this.storage.authentication_token, id)
        .subscribe(res => {this.query = res; console.log(this.query)})
    });

    
  }

}
