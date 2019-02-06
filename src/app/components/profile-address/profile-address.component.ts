import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.scss']
})
export class ProfileAddressComponent implements OnInit {

  addAddressForm : FormGroup;
  delAddressForm : FormGroup;
  clsAddressForm : FormGroup;

  storage : any = {};
  user : any;

  payload : any = {};

  elements : any = {'elements':[]};

  constructor(private fb : FormBuilder,
              private router : Router,
              private userService : UserService,
              private lss : LocalstorageService,) { }

  ngOnInit() {
    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.userService
        .get(this.storage.authentication_token, this.storage.id)
        .subscribe(res => {
          
          this.user = res; 
          console.log(this.user)
      
          this.addAddressForm = this.fb.group({
            'elements' : [null, Validators.required],
            'action' : ['add'],
          });

          this.delAddressForm = this.fb.group({
            'elements' : [null],
            'action' : ['remove'],
          });

          this.clsAddressForm = this.fb.group({
            'elements' : [null],
            'action' : ['clear'],
          });

        })
    });
  }

  put(formData : any){
    this.lss.get().subscribe(data => {
      this.storage = data;
      console.log(formData)
      
      //this.payload = {'delivery':{'action': formData.action, 'elements': this.elements.elements}};
      this.payload = {'delivery':formData};
      console.log(this.payload)
      this.userService
        .put(this.payload, this.storage.authentication_token, this.storage.id).subscribe(res => {console.log(res)})
    });
  }

  addElements(value, isChecked: boolean){
    if(isChecked)
      this.elements.elements.push(value);
    else {
      const index =  this.elements.elements.controls
      console.log(this.elements.elements)
      this.elements.elements.removeAt(index);
    }

    console.log(this.elements)
  }

}
