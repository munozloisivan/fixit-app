import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AvisoService {


  constructor(private http: Http) {
  }

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
          resolve(res);
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

  getUsuarioAvisos(usuario) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/usuario/' + usuario)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  getAvisosByCategoria(categoria) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/categoria/' + categoria)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAvisosBySeguimiento(seguimiento) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/seguimiento/' + seguimiento)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAvisosByTipo(tipo) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/tipo/' + tipo)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAvisosByCiudad(subtipo) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/ciudad/' + subtipo)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAvisosByCP(subtipo) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/cp/' + subtipo)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAvisosByPrioridad(prioridad) {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/prioridad/' + prioridad)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAvisosOrderedByApoyos() {
    return new Promise((resolve, reject) => {
      this.http.get('/aviso/filter/apoyos/')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
