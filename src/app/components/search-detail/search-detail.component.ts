import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { GlobalVariables } from '../../shared/global-variables';

import { SearchService } from '../../services/search.service';
import { LocalstorageService } from '../../services/localstorage.service';

import { Document } from "../../document"

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss'],
})
export class SearchDetailComponent implements OnInit {
  searchHistory : any = {};
  search : any = null;

  id : any;

  storage : any = {};

  documents : Array<Document> = [];
  document : any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchService : SearchService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.searchService
        .get(this.storage.authentication_token)
        .subscribe(res => {this.searchHistory = res;})

      this.searchService
        .get(this.storage.authentication_token, id)
        .subscribe(res => {this.search = res; console.log(this.search)})

      this.lss.getDocuments().subscribe(data => {
        data.forEach(element => {
          this.documents.push(new Document(element.details, element.delivery))    
        });
      })
    });

    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.router.navigate(['/search/' + this.id]);
      }
    );

  }

  addDocument(details, delivery){
    this.documents.push(new Document(details, delivery));
    this.updateList(this.documents)
  }

  delDocument(track_info){

    this.documents.forEach( (element, index) => {
      this.document = element.details;
      if(this.document.track_info == track_info) this.documents.splice(index, 1);
    });

    this.updateList(this.documents)
  }

  clsDocuments(){
    this.documents = [];
    this.updateList(this.documents)
  }

  updateList(list){
    this.lss.put('documents', list);
    console.log(this.lss.getDocuments());
  }

  

}
