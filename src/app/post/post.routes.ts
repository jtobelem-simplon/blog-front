import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';

export const POST_ROUTES: Routes = [
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'posts/:id',
    component: PostEditComponent
  }
];
