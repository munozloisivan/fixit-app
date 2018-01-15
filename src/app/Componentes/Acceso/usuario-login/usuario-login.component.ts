import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario.service';
import {Router} from '@angular/router';

declare const FB: any;

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
  public name;
  public imagen;
  public display;

  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  ngOnInit() {
    FB.init({
      appId: '130567867638561',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    });
  }

  Login() {
    this.usuarioService.authenticateUsuario({email: this.email, password: this.password}).subscribe(
      (data) => {
        this.data = data;

        if (this.data['token'].length <= 0) {
          alert('El token no se ha generado');
        } else {
          this.status = 'success';
          localStorage.setItem('token', JSON.stringify(this.data['token']));
          localStorage.setItem('identity', JSON.stringify(this.data['user']));
          localStorage.setItem('role', JSON.stringify(this.data['role']));
          setTimeout(() => {
            this.router.navigate(['/usuario/perfil']);
          }, 1500);
        }
        // sessionStorage.setItem('usuario', JSON.stringify(data));
        // this.router.navigate(['/dashboard']);
        // window.location.reload();
      },
      (err) => {
        console.log(err);
        this.status = 'error';
        setTimeout(() => {this.status = ''; }, 1500);
      }
    );
  }

  loginF() {
    FB.getLoginStatus(
      (response) => {
        if (response.status === 'connected') {
          FB.api('/me?fields=id,email,name,first_name,gender,picture.width(150).height(150),age_range,friends',
            (result) => {
              console.log(result.email);
              if (result && !result.error) {
                this.name = result.name;
                this.imagen = result.picture.data.url;
                this.display = true;
              } else {
                console.log(result.error);
              }
            }, { scope: 'public_profile,email'});
        } else {

          FB.login((res) => {
            if (res.autResponse) {
              FB.api('/me?fields=id,email,name,first_name,gender,picture.width(150).height(150),age_range,friends',
                (result) => {
                  console.log(result.email);
                  if (result && !result.error) {
                    this.name = result.name;
                    this.imagen = result.picture.data.url;
                    this.display = true;
                  } else {
                    console.log(result.error);
                  }
                });
            } else {
              console.log('Problemas al llamar el login de Facebook: ' + res.err);
            }
          }, { scope: 'public_profile,email'}
          );
        }
      });
  }
}
