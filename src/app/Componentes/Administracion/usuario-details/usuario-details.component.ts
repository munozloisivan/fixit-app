import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.css']
})
export class UsuarioDetailsComponent implements OnInit {

  usuario: {};

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsuarioDetails(this.route.snapshot.params['id']);
  }

  getAvisoDetails(id) {
    this.router.navigate(['/aviso-details', id]);
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