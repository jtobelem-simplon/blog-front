import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Post} from "./data.model";
import {tap} from "rxjs/operators";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class DataService {
  postList: Post[] = [];
  api = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Post> {
    const url = `${this.api}/${id}`;
    const params = { id: id };
    return this.http.get<Post>(url, {params, headers});
  }

  load(): void {
    this.find().subscribe(result => {
        this.postList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(): Observable<Post[]> {
    const params = {
    };

    const home = 'http://localhost:8080/home/posts';

    return this.http.get<Post[]>(home, {params, headers});
  }

  save(entity: Post): Observable<Post> {
    let params = new HttpParams();
    let url = '';
    if (entity.id) {
      url = `${this.api}/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Post>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Post>(url, entity, {headers, params});
    }
  }

  delete(entity: Post): Observable<Post> {
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

