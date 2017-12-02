import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AvisoService } from '../../Services/aviso.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-usuario-avisos',
  templateUrl: './usuario-avisos.component.html',
  styleUrls: ['./usuario-avisos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuarioAvisosComponent implements OnInit {

  aviso: any;
  avisomodal: {};

  constructor(private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
    this.getUsuarioAvisos('5a0a294ba92f340c2c0a2a5e');
  }

 getUsuarioAvisos(usuario) {
    this.avisoService.getUsuarioAvisos(usuario).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisoDetails(id) {
    this.avisoService.showAviso(id).then((res) => {
      this.avisomodal = res;
    }, (err) => {
      console.log(err);
    });
  }

  deleteAviso(id) {
    this.avisoService.deleteAviso(id).then((result) => {
      this.getUsuarioAvisos('5a0a294ba92f340c2c0a2a5e');
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }
}