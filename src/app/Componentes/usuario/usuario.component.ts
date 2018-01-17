import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

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
