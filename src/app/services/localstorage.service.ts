import { Injectable } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class LocalstorageService {

  constructor(protected ls : AsyncLocalStorage) { }
  
  get(){
    return this.ls
      .getItem('session_user')
      //.subscribe((auth) => {});
  }  

  put(location, documents){
    this.ls.setItem(location, documents)
      .subscribe(data => {
        this.getDocuments().subscribe(data => console.log(data))
    })
  }

  getDocuments(){
    return this.ls
    .getItem('documents')
  }

}
