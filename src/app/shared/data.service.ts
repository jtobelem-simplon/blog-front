import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post, Role, User} from "./data.model";
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
    if (confirm("Est-ce que vous confirmez la réinitialisation de toutes les données?")) {
      return this.http.get<any>(`${environment.apiUrl}/init`).pipe(
        tap(_ => console.log('init data')), // TODO remove console
        catchError(this.feedbackService.handleError<any>('initData'))
      );
    } else {
      return of<any>();
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  users: BehaviorSubject<User[]> = new BehaviorSubject(undefined);

  loadUsers() {
    this.getUsers().subscribe(users => this.users.next(users));
  }

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

  saveUser(entity: User): Observable<User> {
    console.log(">> new", entity);

    let params = new HttpParams();

    if (entity.id) {
      console.log("put");

      const url = `${environment.apiUrl}/users/${entity.id.toString()}`;
      return this.http.put<User>(url, entity, {headers, params}).pipe(
        tap(reponse => this.feedbackService.info.next(`user updated at ${new Date()} with id ${reponse.id}`)),
        catchError(this.feedbackService.handleError<User>('saveUser'))
      );
    }
    else {
      const url = `${environment.apiUrl}/users`;

      console.log("post", url, entity);

      return this.http.post<User>(url, entity, {headers, params}).pipe(
        tap(reponse => this.feedbackService.info.next(`new user created at ${new Date()} with id ${reponse.id}`)),
        catchError(this.feedbackService.handleError<User>('saveUser'))
      );
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  getRoles(): Observable<Role[]> {
    const params = new HttpParams();
    return this.http.get<Role[]>(`${environment.apiUrl}/roles`, {params, headers}).pipe(
      tap(_ => console.log('fetched roles')), // TODO remove console
      catchError(this.feedbackService.handleError<Role[]>('getRoles', []))
    );
  }

  //////////////////////////////////////////////////////////////////////////////

  getPosts(): Observable<Post[]> {
    const params = new HttpParams();
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`, {params, headers}).pipe(
      tap(_ => console.log('fetched posts')), // TODO remove console
      catchError(this.feedbackService.handleError<Post[]>('getPosts', [])) // TODO attraper les erreurs avec un interceptor
    );
  }

  savePost(entity: Post): Observable<Post> {
    let params = new HttpParams();


    if (entity.id) {
      const url = `${environment.apiUrl}/posts/${entity.id.toString()}`;
      return this.http.put<Post>(url, entity, {headers, params}).pipe(
        tap(reponse => this.feedbackService.info.next(`post updated at ${reponse.dateTime} with id ${reponse.id}`)),
        catchError(this.feedbackService.handleError<Post>('savePost'))
      );
    }
    else {
      const url = `${environment.apiUrl}/posts`;
      return this.http.post<Post>(url, entity, {headers, params}).pipe(
        tap(reponse => this.feedbackService.info.next(`new post created at ${reponse.dateTime} with id ${reponse.id}`)),
        catchError(this.feedbackService.handleError<Post>('savePost'))
      );
    }

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

