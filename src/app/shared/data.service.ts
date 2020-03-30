import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post, User} from "./data.model";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class DataService {
  postList: Post[] = [];
  userList: User[] = [];

  api = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  //////////////////////////////////////////////////////////////////////////////

  loadUsers(): void {
    this.findUsers().subscribe(result => {
        this.userList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  findUsers(): Observable<User[]> {
    const params = {};
    return this.http.get<User[]>(`${this.api}/users`, {params, headers});
  }

  // TODO réécrire cette méthode
  deleteUser(id: number) : Observable<any> {
    let params = new HttpParams();
    let url = `${this.api}/users/${id.toString()}`;
    params = new HttpParams().set('ID', id.toString());
    return this.http.delete(url, {headers, params});
  }

  //////////////////////////////////////////////////////////////////////////////

  findPostById(id: string): Observable<Post> {
    const url = `${this.api}/posts/${id}`;
    const params = {id: id};
    return this.http.get<Post>(url, {params, headers});
  }

  loadPosts(): void {
    this.findPosts().subscribe(result => {
        this.postList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  findPosts(): Observable<Post[]> {
    const params = {};
    return this.http.get<Post[]>(`${this.api}/posts`, {params, headers});
  }

  savePost(entity: Post): Observable<Post> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/posts/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Post>(url, entity, {headers, params});
    } else {
      url = `${this.api}/posts`;
      return this.http.post<Post>(url, entity, {headers, params});
    }
  }

  deletePost(entity: Post): Observable<Post> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Post>(url, {headers, params});
    }
    return null;
  }
}

