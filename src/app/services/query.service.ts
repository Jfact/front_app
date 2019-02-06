import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../shared/global-variables';

export interface Query{

}

@Injectable()
export class QueryService {
  url = 'query/';
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
       .get<Query[]>(GlobalVariables.BASE_API_URL + this.finalUrl, {headers})

  }

  put(formData : any, token : string, id : string){
    this.finalUrl = this.getUri(id);
    console.log(GlobalVariables.BASE_API_URL + this.finalUrl)
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });

    return this.http
      .put<Query[]>(GlobalVariables.BASE_API_URL + this.finalUrl, formData, {headers});

  } 

  post(formData : any, token : string){
    
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });

    return this.http
      .post(GlobalVariables.BASE_API_URL + this.url, formData, {headers});

  }
  
  getUri(id : string = null){
    if(id != null) this.uri = this.url + id + '/';
      else this.uri = this.url;

    return this.uri;
  }

}
