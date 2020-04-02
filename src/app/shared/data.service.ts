import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post, User} from "./data.model";
import {catchError, tap} from "rxjs/operators";
import {FeedbackService} from "./feedback/feedback.service";
import {environment} from "../../environments/environment";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
// TODO refactor pour que les méthodes get, save, ... ne soient pas dupliquées
export class DataService {


  constructor(private http: HttpClient, private feedbackService: FeedbackService) {
  }

  initData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/init`).pipe(
      tap(_ => console.log('init data')), // TODO remove console
      catchError(this.feedbackService.handleError<any>('initData'))
    );
  }

  //////////////////////////////////////////////////////////////////////////////

  getUsers(): Observable<User[]> {
    const params = new HttpParams();
    return this.http.get<User[]>(`${environment.apiUrl}/users`, {params, headers}).pipe(
      tap(_ => console.log('fetched users')), // TODO remove console
      catchError(this.feedbackService.handleError<User[]>('getUsers', []))
    );
  }

  deleteUser(id: number): Observable<any> {
    let params = new HttpParams();
    let url = `${environment.apiUrl}/users/${id.toString()}`;
    return this.http.delete(url, {headers, params}).pipe(
      tap(_ => this.feedbackService.info.next(`user ${id} deleted`)),
      catchError(this.feedbackService.handleError<any>('deleteUser'))
    );
  }

  //////////////////////////////////////////////////////////////////////////////

  getPosts(): Observable<Post[]> {
    const params = new HttpParams();
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`, {params, headers}).pipe(
      tap(_ => console.log('fetched posts')), // TODO remove console
      catchError(this.feedbackService.handleError<Post[]>('getPosts', []))
    );
  }

  savePost(entity: Post): Observable<Post> {
    let params = new HttpParams();
    const url = entity.id ? `${environment.apiUrl}/posts/${entity.id.toString()}` : `${environment.apiUrl}/posts`;

    return this.http.post<Post>(url, entity, {headers, params}).pipe(
      tap(reponse => this.feedbackService.info.next(`new post created at ${reponse.dateTime} with id ${reponse.id}`)),
      catchError(this.feedbackService.handleError<Post>('savePost'))
    );
  }

  deletePost(id: number): Observable<any> {
    let params = new HttpParams();
    let url = `${environment.apiUrl}/posts/${id.toString()}`;
    return this.http.delete(url, {headers, params}).pipe(
      tap(_ => {
        this.feedbackService.info.next(`post ${id} deleted`);
      }),
      catchError(this.feedbackService.handleError<any>('deletePost'))
    );
  }

}

