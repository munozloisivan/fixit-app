import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PerfilComponent implements OnInit {

  usuario: {};
  identity: {};

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
    this.getUsuarioDetails(this.identity['_id']);
  }

  getUsuarioDetails(id) {
    this.usuarioService.showUsuario(id).then((res) => {
      console.log('Usuario:' + res);
      this.usuario = res;
    }, (err) => {
      console.log(err);
    });
  }
}
