import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtService} from "./shared/jwt/jwt.service";
import {FeedbackService} from "./shared/feedback/feedback.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'blog-front';

  constructor(public jwtService: JwtService, private feedbackService: FeedbackService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.feedbackService.info.subscribe(next => this.openSnackBar(next, true));
    this.feedbackService.warning.subscribe(next => this.openSnackBar(next, false));
  }

  openSnackBar(message: string, info: boolean) {
    if (message) {
      const style = info ? "info" : "warning";

      this.snackBar.open(message, undefined, {
        duration: 3000,
        panelClass : style
      });
    }
  }
}





