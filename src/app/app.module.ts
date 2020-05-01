import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from "./material/material-module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import {HttpClientModule} from "@angular/common/http";
import {PostListComponent} from "./post-list/post-list.component";
import {DataService} from "./shared/data.service";
import {MenuHeaderComponent} from './menu-header/menu-header.component';
import {MenuFooterComponent} from './menu-footer/menu-footer.component';
import {NewPostDialog} from "./post-list/new-dialog/new-post-dialog";
import {UserListComponent} from './user-list/user-list.component';
import {UserGuard} from "./shared/guards/user.guard";
import {AdminGuard} from "./shared/guards/admin.guard";
import {environment} from "../environments/environment";
import { CreateUserComponent } from './create-user/create-user.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    NewPostDialog,
    MenuHeaderComponent,
    MenuFooterComponent,
    UserListComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return     sessionStorage.getItem('access_token');}, // TODO mettre dans le sessionStorage? https://stackoverflow.com/questions/40230338/jwt-storing-them-in-localstorage-vs-sessionstorage
        whitelistedDomains: [environment.server],
        blacklistedRoutes: [`${environment.apiUrl}/sign-in`]
      }
    })
  ],
  providers: [
    DataService,
    UserGuard,
    AdminGuard,
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
