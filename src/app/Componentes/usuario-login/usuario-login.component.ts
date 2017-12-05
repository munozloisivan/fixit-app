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
  public status: string;
  public token;
  public identity: {};
  public data: {};

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.usuarioService.authenticateUsuario({email: this.email, password: this.password}).subscribe(
      (data) => {
        this.data = data;

        if (this.data['token'].length <= 0) {
          alert('El token no se ha generado');
        }else {
          this.status = 'success';
          localStorage.setItem('token', JSON.stringify(this.data['token']));
          localStorage.setItem('identity', JSON.stringify(this.data['user']));
          localStorage.setItem('role', JSON.stringify(this.data['role']));
          setTimeout(() => {this.router.navigate(['/usuario/perfil']); }, 1500);
        }
        // sessionStorage.setItem('usuario', JSON.stringify(data));
        // this.router.navigate(['/dashboard']);
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        this.status = 'error';
      }
    );
  }

}
