import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  info : BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  warning : BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() { }


}
