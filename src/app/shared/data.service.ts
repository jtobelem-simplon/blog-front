import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post, User} from "./data.model";
import {catchError, tap} from "rxjs/operators";
import {FeedbackService} from "./feedback/feedback.service";
import {environment} from "../../environments/environment";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class DataService {


  constructor(private http: HttpClient, private feedbackService : FeedbackService) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      this.feedbackService.warning.next(`${operation} failed: ${error.message}`);

      console.log(`${operation} failed`); // TODO remove console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //////////////////////////////////////////////////////////////////////////////

  getUsers(): Observable<User[]> {
    const params = new HttpParams();
    return this.http.get<User[]>(`${environment.apiUrl}/users`, {params, headers}).pipe(
      tap(_ => console.log('fetched users')), // TODO remove console
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  deleteUser(id: number) : Observable<any>{
    let params = new HttpParams();
    let url = `${environment.apiUrl}/users/${id.toString()}`;
    return this.http.delete(url, {headers, params}).pipe(
      tap(_ => this.feedbackService.info.next(`user ${id} deleted`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  //////////////////////////////////////////////////////////////////////////////

  getPosts(): Observable<Post[]> {
    const params = new HttpParams();
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`, {params, headers}).pipe(
      tap(_ => console.log('fetched posts')), // TODO remove console
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  savePost(entity: Post): Observable<Post> {
    let params = new HttpParams();
    const url = entity.id?`${environment.apiUrl}/posts/${entity.id.toString()}`:`${environment.apiUrl}/posts`;

    return this.http.post<Post>(url, entity, {headers, params}).pipe(
      tap(reponse => this.feedbackService.info.next(`new post created at ${reponse.dateTime} with id ${reponse.id}`)),
      catchError(this.handleError<Post>('savePost'))
    );
  }

  deletePost(id: number) : Observable<any>{
    let params = new HttpParams();
    let url = `${environment.apiUrl}/posts/${id.toString()}`;
    return this.http.delete(url, {headers, params}).pipe(
      tap(_ => {
        this.feedbackService.info.next(`post ${id} deleted`);
        // location.reload(); // TODO reload empeche le snackbar
      }),
      catchError(this.handleError<any>('deletePost'))
    );
  }

}

