import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  info : BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  warning : BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      this.warning.next(`${operation} failed: ${error.message}`);

      console.log(`${operation} failed`); // TODO remove console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
