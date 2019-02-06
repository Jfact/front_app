import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../shared/global-variables';

export interface Search{
  
}

@Injectable()
export class SearchService {
  url = 'search/';
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
       .get<Search[]>(GlobalVariables.BASE_API_URL + this.finalUrl, {headers})

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
    console.log(this.uri)
    return this.uri;
  }

}
