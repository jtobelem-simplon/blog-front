import { Component, OnInit } from '@angular/core';
import {JwtService} from "../shared/jwt/jwt.service";
import {FeedbackService} from "../shared/feedback/feedback.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  hide = true;
  showLogin = false;

  constructor(public jwtService: JwtService, private feedbackService:FeedbackService, private router: Router) { }

  ngOnInit(): void {
  }

  loginBouton() {
    this.showLogin = !this.showLogin;
  }

  adminBouton() {
    this.router.navigate(["/admin"]);
  }

  login(user : string, password : string) {
    this.jwtService.login(user, password).subscribe(res => {
      this.loginBouton();
      this.feedbackService.info.next(`connected`);
    },
        error => {
      console.log(error) // TODO
      this.feedbackService.warning.next(error.message)
    }
      );
  }

  logout() {
    this.jwtService.logout();
    this.feedbackService.info.next("disconnected");
  }

}
