import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../Services/usuario.service";

@Component({
  selector: 'app-usuario-gestion',
  templateUrl: './usuario-gestion.component.html',
  styleUrls: ['./usuario-gestion.component.css']
})
export class UsuarioGestionComponent implements OnInit {

  usuarios: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarioList();
  }
  getUsuarioList() {
    this.usuarioService.getAllUsuarios().then((res) => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    });
  }

}
