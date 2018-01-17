import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../Services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario-gestion',
  templateUrl: './usuario-gestion.component.html',
  styleUrls: ['./usuario-gestion.component.css']
})
export class UsuarioGestionComponent implements OnInit {

  usuarios: any;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

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

  getUsuarioDetails(id) {
    this.router.navigate(['/usuario-details', id]);
  }

}
