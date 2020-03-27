import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {PostModule} from "./post/post.module";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    PostModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
