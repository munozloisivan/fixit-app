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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarioLogros('5a0f1b45b33008338475cceb');
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

}
