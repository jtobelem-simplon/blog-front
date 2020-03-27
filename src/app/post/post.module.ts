import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostService } from './post.service';
import { POST_ROUTES } from './post.routes';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(POST_ROUTES),
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    PostListComponent,
    PostEditComponent
  ],
  providers: [PostService],
    exports: [
        PostListComponent,
        PostEditComponent
    ]
})
export class PostModule { }
