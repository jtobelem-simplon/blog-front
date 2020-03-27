import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from "./material/material-module";
import {FormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import {HttpClientModule} from "@angular/common/http";
import {PostListComponent} from "./post-list/post-list.component";
import {DataService} from "./shared/data.service";
import {MenuHeaderComponent} from './menu-header/menu-header.component';
import {MenuFooterComponent} from './menu-footer/menu-footer.component';
import {NewPostDialog} from "./post-list/new-dialog/new-post-dialog";

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    NewPostDialog,
    MenuHeaderComponent,
    MenuFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return     localStorage.getItem('access_token');},
        whitelistedDomains: ['http://localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/api/sign-in']
      }
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
