import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  api = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
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

    return this.httpClient.post<{ access_token: string }>(`${this.api}/sign-in`, user).pipe(tap(res => {
      this.setToken(res.access_token);
    }));
  }

  // TODO add a register form
  register(name: string, password: string) {
    const user = {name: name, password: password};

    this.httpClient.post<{ access_token: string }>(`${this.api}/sign-up`, user).pipe(tap(res => {
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
