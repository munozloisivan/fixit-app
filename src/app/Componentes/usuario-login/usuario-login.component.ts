import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioLoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.usuarioService.authenticateUsuario({'email': this.email, 'password': this.password}).then((res) => {
      // this.usuario = res;
      alert('Autenticado Correctamente');
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

}
