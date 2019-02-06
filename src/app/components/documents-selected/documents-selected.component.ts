import { Component, OnInit } from '@angular/core';

import { LocalstorageService } from '../../services/localstorage.service';

import { Observable } from "rxjs/Observable"

import { Document } from "../../document"

@Component({
  selector: 'app-documents-selected',
  templateUrl: './documents-selected.component.html',
  styleUrls: ['./documents-selected.component.scss']
})

export class DocumentsSelectedComponent implements OnInit {

  documents : Array<Document> = [];
  document : any;

  constructor(private lss : LocalstorageService,) { }

  ngOnInit() {
    this.lss.getDocuments().subscribe(data => {
      data.forEach(element => {
        this.documents.push(new Document(element.details, element.delivery))    
      });
    })
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
