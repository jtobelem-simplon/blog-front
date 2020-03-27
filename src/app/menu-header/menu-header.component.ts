import { Component, OnInit } from '@angular/core';
import {JwtService} from "../shared/jwt/jwt.service";
import {FeedbackService} from "../shared/feedback/feedback.service";

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  hide = true;
  showLogin = false;

  constructor(public jwtService: JwtService, private feedbackService:FeedbackService) { }

  ngOnInit(): void {
  }

  loginBouton() {
    this.showLogin = !this.showLogin;
  }

  login(user : string, password : string) {
    this.jwtService.login(user, password).subscribe(res => {
      this.loginBouton();
      this.feedbackService.message.next(`connected`);
    });
  }

  logout() {
    this.jwtService.logout();
    this.feedbackService.message.next("disconnected");
  }

}
