import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent, NewPostDialog} from './app.component';
import {AuthRoutingModule} from './auth-routing.module';
import {PostModule} from './post/post.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from "./material-module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NewPostDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    PostModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
