import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {PostListComponent} from "./post-list/post-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserGuard} from "./shared/guards/user.guard";
import {AdminGuard} from "./shared/guards/admin.guard";


const routes: Routes = [
  { path: '', redirectTo: '/post', pathMatch: 'full' },
  {
    path: 'post',
    component: PostListComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'admin',
    component: UserListComponent,
    canActivate: [AdminGuard]
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
