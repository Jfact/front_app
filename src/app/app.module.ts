import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component'
import { MenuChildComponent } from './components/menu-child/menu-child.component';
import { DocumentsSelectedComponent } from './components/documents-selected/documents-selected.component';
import { DocumentsAddComponent } from './components/documents-add/documents-add.component';
import { ProfileAddressComponent } from './components/profile-address/profile-address.component';
import { SearchDetailComponent } from './components/search-detail/search-detail.component'
import { QueryComponent } from './components/query/query.component';
import { QueryDetailComponent } from './components/query-detail/query-detail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';
import { BreadcrumbChildComponent } from './components/breadcrumb-child/breadcrumb-child.component';

import { UserService } from './services/user.service'
import { LocalstorageService } from './services/localstorage.service';
import { SearchService } from './services/search.service';
import { QueryService } from './services/query.service';
import { DocumentService } from './services/document.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    RegistrationComponent,
    SearchComponent,
    ProfileComponent,
    ProfileEditComponent,
    MenuChildComponent,
    ProfileAddressComponent,
    SearchDetailComponent,
    QueryComponent,
    QueryDetailComponent,
    NotificationComponent,
    NotificationDetailComponent,
    DocumentsSelectedComponent,
    BreadcrumbChildComponent,
    DocumentsAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AsyncLocalStorageModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
  ],
  providers: [UserService, LocalstorageService, SearchService, QueryService, NotificationService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
