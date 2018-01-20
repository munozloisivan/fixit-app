import { Component, OnInit } from '@angular/core';
import { UsuarioService} from '../../../Services/usuario.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuarioedit: {};

  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsuario(this.route.snapshot.params['id']);
  }

  getUsuario(id) {
    this.usuarioService.showUsuario(id).then((res) => {
      this.usuarioedit = res;
    }, (err) => {
      console.log(err);
    });
  }

  updateUsuario(id, data) {
    this.usuarioService.updateUsuario(id, data).then((result) => {
      this.router.navigate(['/usuario-details', id]);
    }, (err) => {
      console.log(err);
    });
  }
}
