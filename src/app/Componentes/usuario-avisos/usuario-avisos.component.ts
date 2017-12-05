import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AvisoService } from '../../Services/aviso.service';
import {Router} from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';


@Component( {
  selector: 'app-usuario-avisos',
  templateUrl: './usuario-avisos.component.html',
  styleUrls: ['./usuario-avisos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioAvisosComponent implements OnInit {

  aviso: any;
  avisomodal: {};
  identity: {};

  constructor(private usuarioService: UsuarioService , private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
    this.getUsuarioAvisos(this.identity['_id']);
  }

 getUsuarioAvisos(usuario) {
    this.avisoService.getUsuarioAvisos(usuario).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisoDetails(id) {
    this.avisoService.showAviso(id).then((res) => {
      this.avisomodal = res;
    }, (err) => {
      console.log(err);
    });
  }

  deleteAviso(id, idaviso) {
    this.usuarioService.deleteAvisoUsuario(id, idaviso).then((result) => {
      this.getUsuarioAvisos(this.identity['_id']);
    }, (err) => {
      console.log(err);
    });
  }
}
