import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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
          resolve(res)
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
}
