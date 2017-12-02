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

  usuario: any;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.getUsuarioDetails('59f8a44a2d3e28801c000001');
  }

  getUsuarioDetails(id) {
    this.usuarioService.showUsuario(id).then((res) => {
      this.usuario = res;
    }, (err) => {
      console.log(err);
    });
  }
}
