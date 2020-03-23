import {Component, Inject, OnInit} from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Post} from "./shared/model";
import {PostService} from "./post/post.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'blog-front';
  isAuthenticated: boolean;
  user : string;

  constructor(public oktaAuth: OktaAuthService, public dialog: MatDialog, private postService: PostService, private router:Router, private snackBar: MatSnackBar) {
    oktaAuth.getUser().then(value => {
      if (value) {
        this.user = value.given_name
      }
    });
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  openSnackBar(message : string, action :string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(NewPostDialog, {
      width: '250px',
      data : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.postService.save(result).toPromise().then(reponse =>
      {
        // this.router.navigate(['posts']);
        location.reload();
        this.openSnackBar(`new post created at ${reponse.dateTime} with id ${reponse.id}`,"");
      });
      // this.animal = result;
    });
  }
}

@Component({
  selector: 'new-post-dialog',
  templateUrl: 'new-post-dialog.html',
})
export class NewPostDialog {

  constructor(
    public dialogRef: MatDialogRef<NewPostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Post) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

