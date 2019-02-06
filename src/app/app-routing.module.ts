import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './components/search/search.component';
import { SearchDetailComponent } from './components/search-detail/search-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileAddressComponent } from './components/profile-address/profile-address.component';
import { QueryComponent } from './components/query/query.component';
import { QueryDetailComponent } from './components/query-detail/query-detail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';
import { DocumentsAddComponent } from './components/documents-add/documents-add.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'sign-in',
		component: SignInComponent
	},
	{
		path: 'registration',
		component: RegistrationComponent
	},
	{
		path: 'search',
		component: SearchComponent,
	},
	{
		path: 'search/:id',
		component: SearchDetailComponent,
	},
	{
		path: 'profile',
		component: ProfileComponent
	},
	{
		path: 'profile/edit',
		component: ProfileEditComponent
	},
	{
		path: 'profile/address',
		component: ProfileAddressComponent
	},
	{
		path: 'profile/notification',
		component: NotificationComponent
	},
	{
		path: 'profile/notification/:id',
		component: NotificationDetailComponent
	},
	{
		path: 'profile/notification/:id/:action',
		component: NotificationDetailComponent
	},
	{
		path: 'query',
		component: QueryComponent
	},
	{
		path: 'query/:id',
		component: QueryDetailComponent,
	},
	{
		path: 'documents',
		component: DocumentsAddComponent,
	},
];

@NgModule({
  imports: [
  	RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
