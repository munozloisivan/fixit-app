import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../../Services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario-gestion',
  templateUrl: './usuario-gestion.component.html',
  styleUrls: ['./usuario-gestion.component.css']
})
export class UsuarioGestionComponent implements OnInit {

  usuarios: any;
  nombre: any;
  telefono: any;
  cp: any;
  dni: any;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.getUsuarioList();
  }

  getUsuarioList() {
    this.usuarioService.getAllUsuarios().then((res) => {
      this.usuarios = res;
      this.nombre = null;
      this.telefono = null;
      this.cp = null;
      this.dni = null;
    }, (err) => {
      console.log(err);
    });
  }

  getUsuarioDetails(id) {
    this.router.navigate(['/usuario-details', id]);
  }
  getUsuarioByNombre(nombre) {
    this.usuarioService.getUsuarioByNombre(nombre).then(res => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    });
  }
  getUsuarioByTelefono(telefono) {
    this.usuarioService.getUsuarioByTelefono(telefono).then(res => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    });
  }
  getUsuarioByCp(cp) {
    this.usuarioService.getUsuarioByCp(cp).then(res => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    });
  }
  getUsuarioByDni(dni) {
    this.usuarioService.getUsuarioByDni(dni).then(res => {
      this.usuarios = res;
    }, (err) => {
      console.log(err);
    });
  }
}







