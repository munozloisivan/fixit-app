import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioRegistroComponent implements OnInit {

  email: string;
  password: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  Register() {
      this.usuarioService.saveUsuario({email: this.email, password: this.password}).subscribe(
        (data) => {
          console.log(data);
          alert('Usuario registrado');
          // sessionStorage.setItem('usuario', JSON.stringify(data));
          this.router.navigate(['/acceso']);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          alert('El correo electrónico ya esta en uso');
        }
      );
  }
}
