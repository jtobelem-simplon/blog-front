import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtService} from "./shared/jwt/jwt.service";
import {FeedbackService} from "./shared/feedback/feedback.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'blog-front';

  constructor(public jwtService: JwtService, private feedbackService: FeedbackService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.feedbackService.message.subscribe(res => this.openSnackBar(res, undefined));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}





