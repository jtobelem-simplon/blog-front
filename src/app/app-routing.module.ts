import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {PostListComponent} from "./post-list/post-list.component";


const routes: Routes = [
  { path: '', redirectTo: '/post', pathMatch: 'full' },
  {
    path: 'post',
    component: PostListComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
