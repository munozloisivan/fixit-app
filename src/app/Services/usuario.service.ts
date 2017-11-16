import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  getAllUsuarios() {
    return new Promise((resolve, reject) => {
      this.http.get('/usuario')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showUsuario(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/usuario/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveUsuario(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/usuario', data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUsuario(id, data) {
    return new Promise((resolve, reject) => {
      this.http.put('/usuario/' + id, data)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  deleteUsuario(id) {
    return new Promise((resolve, reject) => {
      this.http.delete('/usuario/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  authenticateUsuario(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/usuario/auth', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  /* TO DO TASKS */

  // addAvisoToUsuario(idusuario,idaviso)

  // addLogroToUsuario(idusuario,idlogro)

  // deleteAvisoFromUsuario(idusuario,idaviso)

}
