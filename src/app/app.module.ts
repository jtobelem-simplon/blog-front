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
import {UserListComponent} from './user-list/user-list.component';
import {UserGuard} from "./shared/guards/user.guard";
import {AdminGuard} from "./shared/guards/admin.guard";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    NewPostDialog,
    MenuHeaderComponent,
    MenuFooterComponent,
    UserListComponent
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
        whitelistedDomains: [environment.server],
        blacklistedRoutes: [`${environment.apiUrl}/sign-in`]
      }
    })
  ],
  providers: [DataService, UserGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
