import {Component, OnInit} from '@angular/core';
import {PostFilter} from '../post-filter';
import {PostService} from '../post.service';
import {Post} from "../../shared/model";
import {NewPostDialog} from "../../app.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtService} from "../../shared/jwt/jwt.service";

@Component({
  selector: 'app-post',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit {

  filter = new PostFilter();
  selectedPost: Post;
  feedback: any = {};

  get postList(): Post[] {
    return this.postService.postList;
  }

  constructor(private postService: PostService, public jwtService: JwtService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.search();
  }

  openDialog(post : Post): void {
    const dialogRef = this.dialog.open(NewPostDialog, {
      width: '250px',
      data : post
    });

    dialogRef.afterClosed().subscribe(result => {
      this.postService.save(result).toPromise().then(reponse =>
      {
        this.openSnackBar(`post updated`,"");
      });
    });
  }

  openSnackBar(message : string, action :string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  search(): void {
    this.postService.load(this.filter);
  }

  select(selected: Post): void {
    this.selectedPost = selected;
  }

  delete(post: Post): void {
    if (confirm('Are you sure?')) {
      this.postService.delete(post).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
