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

  usuario = {
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  Register() {
    this.usuarioService.saveUsuario(this.usuario).then((result) => {
      alert('Registrado Correctamente');
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }
}
