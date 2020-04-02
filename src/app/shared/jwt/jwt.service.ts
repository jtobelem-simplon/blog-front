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
export class JwtService {

  constructor(private httpClient: HttpClient, private feedbackService: FeedbackService) {
  }


  ////////////////////////////////////////////////////////////////////

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getUsername() : string {
    if (this.isLogged()) {
      return this.userFromToken(this.getToken()).name;
    }
    return undefined;
  }

  getRole() : string {
    if (this.isLogged()) {
      return this.userFromToken(this.getToken()).role.label;
    }
    return undefined;
  }

  ////////////////////////////////////////////////////////////////////


  login(name: string, password: string) {
    const user = {name: name, password: password};

    return this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/sign-in`, user).pipe(
      tap(res => {
        this.setToken(res.access_token);
        this.feedbackService.info.next(`${name} connected`);
      }),
      catchError(this.feedbackService.handleError<{ access_token: string }>('login'))
    );
  }

  // TODO add a register form
  register(name: string, password: string) {
    const user = {name: name, password: password};

    this.httpClient.post<{ access_token: string }>(`${environment.apiUrl}/sign-up`, user).pipe(tap(res => {
      this.login(name, password);
    }));
  }

  logout() {
    this.clearToken();
  }

  private getToken(): string {
    return localStorage.getItem('access_token');
  }

  private setToken(token: string) {
    localStorage.setItem('access_token', token);

    const newUser = this.userFromToken(token);
  }

  private clearToken() {
    localStorage.removeItem('access_token');
  }

  private userFromToken(token: string): User {
    const decodedToken = jwt_decode(token);

    const name = decodedToken.sub;
    const roles = decodedToken.auth.map(authority => {
      return {label : authority.authority};
    });

    let newUser: User = {id: 0, name: name, role: roles[0]};

    return newUser;
  }
}
