import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


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


  saveUsuario(user): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/usuario/add', user)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Error del servidor'));
  }


  /* saveUsuario(data) {
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
 */
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

  updateTituloUsuario(id, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.put('/usuario/titulo/' + id, data)
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

  deleteAvisoUsuario(id, idaviso) {
    return new Promise((resolve, reject) => {
      this.http.delete('/usuario/' + id + '/aviso/' + idaviso)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  authenticateUsuario(user): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/usuario/auth', user)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Error del servidor'));
  }

  /*authenticateUsuario(email) {
    return new Promise((resolve, reject) => {
      this.http.post('/usuario/auth', email)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }*/

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
  olvideContrasena(user): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/usuario/olvideContraseña', user)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Error del servidor'));
  }
  resetearContrasena(user1= {password: '', token_temporal: ''}): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/usuario/resetearContrasena', user1)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Error del servidor'));
  }


  /* TO DO TASKS */

  // addAvisoToUsuario(idusuario,idaviso)

  // addLogroToUsuario(idusuario,idlogro)

  // deleteAvisoFromUsuario(idusuario,idaviso)

}
