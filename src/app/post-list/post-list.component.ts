import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Post} from "../shared/data.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtService} from "../shared/jwt/jwt.service";
import {NewPostDialog} from "./new-dialog/new-post-dialog";
import {FeedbackService} from "../shared/feedback/feedback.service";

@Component({
  selector: 'app-post',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit {

  selectedPost: Post;
  feedback: any = {};

  get postList(): Post[] {
    return this.dataService.postList;
  }

  constructor(private dataService: DataService, public jwtService: JwtService, public dialog: MatDialog, private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.search();
  }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(NewPostDialog, {
      width: '250px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.savePost(result).toPromise().then(reponse => {
        this.feedbackService.message.next(`post updated`);
      });
    });
  }

  search(): void {
    this.dataService.loadPosts();
  }

  select(selected: Post): void {
    this.selectedPost = selected;
  }

  delete(post: Post): void {
    if (confirm('Are you sure?')) {
      this.dataService.deletePost(post).subscribe(() => {
          this.feedbackService.message.next('Delete was successful!');
        },
        err => {
          this.feedbackService.message.next('Error deleting.');
        }
      );
    }
  }
}
