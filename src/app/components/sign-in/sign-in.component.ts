import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import 'rxjs/add/operator/toPromise';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { GlobalVariables } from '../../shared/global-variables';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  signInForm : FormGroup;
  payload : any = {};
  response : any = {};

  constructor(private http : HttpClient,
              private fb : FormBuilder, 
              private router : Router,
              protected localStorage: AsyncLocalStorage){}

  ngOnInit() {    
    //console.log(this.router);
    this.signInForm = this.fb.group({
      'userName' : [null, Validators.required],
      'userPassword' : [null, Validators.required]
    });
  }

  private signIn(formData){
    this.payload = {'username': formData.userName, 'password': formData.userPassword}
    
    this.http.post(GlobalVariables.BASE_API_URL + GlobalVariables.URLS.login, 
                   this.payload)
                    .toPromise()
                    .then((res)=>{
                      this.response = res;
                      console.log(this.response)
                      this.localStorage.setItem('session_user', this.response).subscribe(() => {})
  	                });
  }

}
