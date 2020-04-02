import { Component, OnInit } from '@angular/core';
import {JwtService} from "../shared/jwt/jwt.service";
import {FeedbackService} from "../shared/feedback/feedback.service";
import {Router} from "@angular/router";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {

  hide = true;
  showLogin = false;

  constructor(public jwtService: JwtService, private feedbackService:FeedbackService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  loginBouton() {
    this.showLogin = !this.showLogin;
  }

  adminBouton() {
    this.router.navigate(["/admin"]);
  }

  login(user : string, password : string) {
    this.jwtService.login(user, password).subscribe(_ => this.loginBouton());
  }

  logout() {
    this.jwtService.logout();
  }

  initData(){
    this.dataService.initData().subscribe(_ => location.reload());
  }

}
