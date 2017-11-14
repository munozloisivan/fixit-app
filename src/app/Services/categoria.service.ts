import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriaService {

  constructor(private http: Http) { }

  getAllCategorias() {
    return new Promise((resolve, reject) => {
      this.http.get('/categoria')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showCategoria(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/categoria/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveCategoria(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/categoria', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateCategoria(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/categoria/' + id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteCategoria(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/categoria/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
