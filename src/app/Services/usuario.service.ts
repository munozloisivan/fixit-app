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

  showLogrosUsuario(id) {
    return new Promise((resolve, reject) => {
      this.http.get('/usuario/' + id + '/logros')
        .map(res => res.json())
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveUsuario(data) {
    return new Promise((resolve, reject) => {
      this.http.post('/usuario/add', data)
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

  authenticateUsuario(email) {
    return new Promise((resolve, reject) => {
      this.http.post('/usuario/auth', email)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  reestablecerPassword(email) {
    return new Promise((resolve, reject) => {
      console.log(email);
      this.http.post('usuario/resetpassword', email)
        .subscribe(res => {
          resolve(res.toString());
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
