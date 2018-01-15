import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario.service';
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
  status: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  Register() {
      this.usuarioService.saveUsuario({email: this.email, password: this.password}).subscribe(
        (data) => {
          console.log(data);
          this.status = 'success';
          // sessionStorage.setItem('usuario', JSON.stringify(data));
          setTimeout(() => {window.location.reload(); }, 1500);
        },
        (err) => {
          console.log(err);
          this.status = 'error';
          setTimeout(() => {this.status = ''; }, 1500);
        }
      );
  }
}
