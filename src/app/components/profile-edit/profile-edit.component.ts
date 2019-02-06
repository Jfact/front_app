import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  editUserForm : FormGroup;
  editAddressForm : FormGroup;

  storage : any = {};
  res : any = {};

  user : any;

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
          this.editUserForm = this.fb.group({
            'first_name' : [this.user.first_name, Validators.required],
            'last_name' : [this.user.last_name, Validators.required],
            'patronymic_name' : [this.user.patronymic_name, Validators.required],
            'phone' : [this.user.phone, Validators.required],
            'email' : [this.user.email, Validators.required],
            'education' : [this.user.education, Validators.required],
            'birth_date' : [this.user.birth_date, Validators.required],
          });
      
          this.editAddressForm = this.fb.group({
            'elements' : [null, Validators.required],
            'action' : ['add', Validators.required],
          });

        })
    });

  }

  put(formData : any){
    this.lss.get().subscribe(data => {
      this.storage = data;
      console.log(formData)
      this.userService
        .put(formData, this.storage.authentication_token, this.storage.id).subscribe(res => {this.router.navigate(['/profile']); console.log(res)})
    });
  }
  
}
