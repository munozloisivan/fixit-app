import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LogroService {

  constructor(private http: Http) { }

  getAllLogros() {
    return new Promise((resolve, reject) => {
      this.http.get('/logro')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showLogro(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/logro/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveLogro(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/logro', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateLogro(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/logro/' + id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteLogro(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/logro/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
