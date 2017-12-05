import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LogroService } from '../../Services/logro.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-usuario-logros',
  templateUrl: './usuario-logros.component.html',
  styleUrls: ['./usuario-logros.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioLogrosComponent implements OnInit {

  usuarios: any;
  usuario: {};
  identity: {};

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
    this.getUsuarioLogros(this.identity['_id']);
  }

  getUsuarioLogros(usuario) {
    this.usuarioService.showLogrosUsuario(usuario).then(res => {
      console.log(res);
      this.usuarios = res;
      this.usuario = JSON.stringify(res);
      console.log('usuario: ' + this.usuario);
    }, (err) => {
      console.log(err);
    });
  }
  updateTituloUsuario(id, data) {
    console.log(data);
    window.location.reload();
    this.usuarioService.updateTituloUsuario(id, data).then(res => {
      console.log(res);
      this.usuario = res;
    }, (err) => {
      console.log(err);
    });
  }

}
