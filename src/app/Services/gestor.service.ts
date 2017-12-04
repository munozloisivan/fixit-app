import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class GestorService {


  constructor(private http: Http) { }

  getAllGestores() {
    return new Promise((resolve, reject) => {
      this.http.get('/gestor')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showGestor(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/gestor/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveGestor(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/gestor', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateGestor(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/gestor/' + id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteGestor(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/gestor/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  authenticateGestor(gestor): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/gestor/auth', gestor)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Error del servidor'));
  }

  /*authenticateGestor(email) {
    return new Promise((resolve, reject) => {
      this.http.post('/gestor/auth', email)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }*/

  registerMailGestor(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/gestor/registermail', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
