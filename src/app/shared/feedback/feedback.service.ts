import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  message : BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() { }
}
