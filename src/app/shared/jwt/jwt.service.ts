import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../data.model";
import * as jwt_decode from 'jwt-decode';
import {catchError, tap} from "rxjs/operators";
import {FeedbackService} from "../feedback/feedback.service";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
// TODO nettoyer cette classe
export class JwtService {

  constructor(private httpClient: HttpClient, private feedbackService: FeedbackService) {
  }


  ////////////////////////////////////////////////////////////////////

  isLogged(): boolean {
    return Boolean(JwtService.getToken());
  }

  getUsername(): string {
    if (this.isLogged()) {
      return JwtService.userFromToken(JwtService.getToken()).name;
    }
    return undefined;
  }

  getRole(): string {
    if (this.isLogged()) {
      return JwtService.userFromToken(JwtService.getToken()).role.label;
    }
    return undefined;
  }

  ////////////////////////////////////////////////////////////////////


  login(name: string, password: string) {
    const user = {name: name, password: password};

    return this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/sign-in`, user).pipe(
      tap(res => {
        JwtService.setToken(res.access_token);
        this.feedbackService.info.next(`${name} connected`);
      }),
      catchError(this.feedbackService.handleError<{ access_token: string }>('login'))
    );
  }

  // TODO add a register form
  register(name: string, password: string) {
    const user = {name: name, password: password};

    this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/sign-up`, user).pipe(tap(_ => {
      this.login(name, password);
    }));
  }

  logout() {
    if (this.isLogged()) {
      this.feedbackService.info.next(`${this.getUsername()} disconnected`);
      JwtService.clearToken();
    }
  }

  private static getToken(): string {
    return localStorage.getItem('access_token');
  }

  private static setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  private static clearToken() {
    localStorage.removeItem('access_token');
  }

  private static userFromToken(token: string): User {
    const decodedToken = jwt_decode(token);

    const name = decodedToken.sub;
    const roles = decodedToken.auth.map(authority => {
      return {label: authority.authority};
    });

    return {id: 0, name: name, role: roles[0]};
  }
}
