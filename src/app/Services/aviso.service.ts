import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AvisoService {

  constructor(private http: Http) { }

  getAllAvisos() {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showAviso(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveAviso(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/aviso', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateAviso(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/aviso/' + id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteAviso(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/aviso/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
