import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';
import {map, switchMap} from 'rxjs/operators';
import {Post} from "../../shared/model";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html'
})
export class PostEditComponent implements OnInit {

  id: string;
  post: Post;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          return this.postService.findById(id);
        })
      )
      .subscribe(post => {
          this.post = post;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.postService.save(this.post).subscribe(
      post => {
        this.post = post;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/posts']);
  }
}
