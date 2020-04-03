import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/data.service';
import {Post} from "../shared/data.model";
import {MatDialog} from "@angular/material/dialog";
import {JwtService} from "../shared/jwt/jwt.service";
import {NewPostDialog} from "./new-dialog/new-post-dialog";

@Component({
  selector: 'app-post',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit {

  selectedPost: Post;
  feedback: any = {};

  posts : Post[];

   constructor(private dataService: DataService, public jwtService: JwtService, public dialog: MatDialog) {
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

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.savePost(result).subscribe(_ => this.getPosts())
    });
  }

  select(selected: Post): void {
    this.selectedPost = selected;
  }

  delete(post: Post): void {
    if (confirm('Are you sure?')) {
      this.dataService.deletePost(post.id).subscribe(value => this.getPosts());
    }
  }
}
