import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "../data.model";
import * as jwt_decode from 'jwt-decode';
import {tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  api = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
  }

  login(name: string, password: string) {
    const user = {name: name, password: password};

    // this.httpClient.post<{ access_token: string }>(`${this.api}/sign-in`, user).subscribe(res => {
    //   this.setToken(res.access_token);
    // });

    return this.httpClient.post<{ access_token: string }>(`${this.api}/sign-in`, user).pipe(tap(res => {
      this.setToken(res.access_token);
    }));
  }

  register(name: string, password: string) {
    const user = {name: name, password: password};

    this.httpClient.post<{ access_token: string }>(`${this.api}/sign-up`, user).subscribe(res => {
      this.login(name, password);
    });
  }

  logout() {
    this.clearToken();
    console.log(this.loggedIn);
  }

  private getToken(): string {
    return localStorage.getItem('access_token');
  }

  private setToken(token: string) {
    localStorage.setItem('access_token', token);

    const newUser = this.userFromToken(token);
    this.user.next(newUser);
    this.loggedIn.next(true);
  }

  private clearToken() {
    localStorage.removeItem('access_token');
    this.user.next(undefined);
    this.loggedIn.next(false);
  }

  private userFromToken(token: string): User {
    const decodedToken = jwt_decode(token);

    const name = decodedToken.sub;
    const roles = decodedToken.auth.map(authority => {
      label : authority.authority
    });

    let newUser: User = {id: 0, name: name, role: roles[0]};

    return newUser;
  }
}
