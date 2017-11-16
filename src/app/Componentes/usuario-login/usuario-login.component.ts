import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioLoginComponent implements OnInit {

  usuario: {};

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  authenticateUsuario() {
    this.usuarioService.authenticateUsuario(this.usuario).then((res) => {
      this.usuario = res;
      console.log(this.usuario);
    }, (err) => {
      console.log(err);
    });
  }

}
