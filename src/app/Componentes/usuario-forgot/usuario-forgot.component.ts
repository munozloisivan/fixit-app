import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-usuario-forgot',
  templateUrl: './usuario-forgot.component.html',
  styleUrls: ['./usuario-forgot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioForgotComponent implements OnInit {

  email: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  ForgotPassword() {
    this.usuarioService.reestablecerPassword(this.email).then((res) => {
      // this.usuario = res;
      alert('Contraseña restablecida. Revisa el correo');
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
    });
  }
}
