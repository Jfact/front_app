import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalVariables } from '../shared/global-variables';

import { Observable } from 'rxjs/Observable';

export interface Notification{
  
}

@Injectable()
export class NotificationService {

  url = 'notification/';
  uri : any;
  finalUrl : any;

  constructor(private http : HttpClient,) { }

  get(token : string, id : string = null){
      this.finalUrl = this.getUri(id);

      console.log(this.finalUrl);

      const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      });

      return this.http
         .get<Notification[]>(GlobalVariables.BASE_API_URL + this.finalUrl, {headers})

  }

  put(formData : any, token : string, id : string = null){
    this.finalUrl = this.getUri(id);

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });

    return this.http
      .put<Notification[]>(GlobalVariables.BASE_API_URL + this.finalUrl, formData, {headers});
  
  }
  
  delete(token : string, id : string = null){
    this.finalUrl = this.getUri(id);

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });

    console.log('headers ->', token)

    return this.http
      .delete<Notification[]>(GlobalVariables.BASE_API_URL + this.finalUrl, {headers});
  }


  post(formData : any){

    return this.http
      .post(GlobalVariables.BASE_API_URL + this.finalUrl, formData);
  
  }
  
  getUri(id : string = null){
    if(id != null) this.uri = this.url + id + '/';
      else this.uri = this.url;

    return this.uri;
  }

}
