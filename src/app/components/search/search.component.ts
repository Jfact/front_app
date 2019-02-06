import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

import { AsyncLocalStorage } from 'angular-async-local-storage';

import { GlobalVariables } from '../../shared/global-variables';

import { Observable } from 'rxjs';

import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { SearchService } from '../../services/search.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [

    trigger('results', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),
    trigger('searchTypeFast', [
      state('full', style({display: 'none'})),
      state('fast', style({display: 'block'})),
      transition('show <=> hide', animate('3000ms ease-in')),
    ]),
    trigger('searchTypeFull', [
      state('fast', style({display: 'none'})),
      state('full', style({display: 'block'})),
      transition('show <=> hide', animate('3000ms ease-in')),
    ]),

  ]
})
export class SearchComponent implements OnInit {

  state : string = 'fast';
  
  search_types : any = ['fast', 'full'];

  storage : any = {};
  searchHistory : any = {};
  searchResults : any = {};

  searchFastForm : FormGroup;
  searchFullForm : FormGroup;

  constructor(private http : HttpClient,
              private fb : FormBuilder,
              protected localStorage: AsyncLocalStorage,
              private router : Router,
              private searchService : SearchService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
    this.searchFastForm = this.fb.group({
      'type' : ['fast'],
      'catalog' : ['ekc'],
      'limit' : [],
      'place' : ['abis'],

      'query': [null, Validators.required],
    });

    this.searchFullForm = this.fb.group({
      'type' : ['full'],
      'catalog' : ['ekc'],
      'limit' : [''],
      'place' : ['abis'],

      'keyword': [null, Validators.required],
      'author': [null],
      'title' : [null],
      'year' : [null, Validators.required],
      'operation' : [null],
    });

    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.searchService
        .get(this.storage.authentication_token)
        .subscribe(res => {
          
          this.searchHistory = res;
          console.log(this.searchHistory)
        })
    });

  }

  post(formData){
    this.lss.get().subscribe(data => {
      this.storage = data;
      console.log('form data -> ', formData)
      console.log('storage data -> ',this.storage)
      
      this.searchService
        .post(formData, this.storage.authentication_token)
        .subscribe(res => {
          this.searchResults = res;
          console.log(res);
          if(this.searchResults.hasOwnProperty('query'))
            this.router.navigate(['/search', this.searchResults.query]);
        })
    });
    
  }

  changeSearchType(value){
    this.state = value;
  }

}
