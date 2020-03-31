import {Component, OnInit} from '@angular/core';
import {JwtService} from "../shared/jwt/jwt.service";
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../shared/data.service";
import {FeedbackService} from "../shared/feedback/feedback.service";
import {NewPostDialog} from "../post-list/new-dialog/new-post-dialog";

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.css']
})
export class MenuFooterComponent implements OnInit {

  constructor(public jwtService: JwtService, private postService: DataService, private feedbackService:FeedbackService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPostDialog, {
      width: '250px',
      data : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.postService.savePost(result).toPromise().then(
        reponse =>
      {
        // this.router.navigate(['posts']);
        location.reload();
        this.feedbackService.info.next(`new post created at ${reponse.dateTime} with id ${reponse.id}`);
      },
          reason => {
        this.feedbackService.warning.next(reason);
      });
      // this.animal = result;
    });
  }
}


