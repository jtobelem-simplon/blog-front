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

  posts : Post[];

   constructor(private dataService: DataService, public jwtService: JwtService, public dialog: MatDialog, private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
     this.dataService.getPosts().subscribe(posts => this.posts = posts);
  }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(NewPostDialog, {
      width: '250px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => { // TODO change the message, move to service
      this.dataService.savePost(result).toPromise().then(reponse => {
        this.feedbackService.info.next(`post updated`);
      });
    });
  }

  select(selected: Post): void {
    this.selectedPost = selected;
  }

  delete(post: Post): void {
    if (confirm('Are you sure?')) {// TODO change the message
      this.dataService.deletePost(post).subscribe(() => {
          this.feedbackService.info.next('Delete was successful!');
        },
        err => {
          this.feedbackService.warning.next('Error deleting.');
        }
      );
    }
  }
}
