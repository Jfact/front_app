import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../shared/global-variables';

import { Observable } from 'rxjs/Observable';

export interface User{

}

@Injectable()
export class UserService {
  url = 'user/';
  uri : any;
  finalUrl : any;

  constructor(private http : HttpClient,) { }

  get(token : string, id : string = null){
    this.finalUrl = this.getUri(id);

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });

    return this.http
        .get<User[]>(GlobalVariables.BASE_API_URL + this.finalUrl, {headers})

  }

  put(formData : any, token : string, id : string = null){
    this.finalUrl = this.getUri(id);

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });

    return this.http
      .put<User[]>(GlobalVariables.BASE_API_URL + this.finalUrl, formData, {headers});
  
  } 


  post(formData : any){

    return this.http
      .post(GlobalVariables.BASE_API_URL + this.url, formData);
  
  }
  
  getUri(id : string = null){
    if(id != null) this.uri = this.url + id + '/';
      else this.uri = this.url;

    return this.uri;
  }

}
