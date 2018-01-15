import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../../Services/aviso.service';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aviso-gestion',
  templateUrl: './aviso-gestion.component.html',
  styleUrls: ['./aviso-gestion.component.css']
})
export class AvisoGestionComponent implements OnInit {

  detalles_aviso: string;
  view_location: any;
  view_lon: any;
  view_lat: any;
  aviso: any;
  avisomodal: any;
  idavisoedit: any;

  constructor(private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
    this.getAvisoList();
  }
  getAvisoList() {
    this.avisoService.getAllAvisos().then((res) => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosByCategoria(categoria) {
    this.avisoService.getAvisosByCategoria(categoria).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosByTipo(tipo) {
    this.avisoService.getAvisosByTipo(tipo).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosBySubtipo(subtipo) {
    this.avisoService.getAvisosBySubtipo(subtipo).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosByPrioridad(tipo) {
    this.avisoService.getAvisosByPrioridad(tipo).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosOrderedByDate() {
    this.avisoService.getAvisosOrderedByDate().then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisoDetails(id) {
    this.router.navigate(['/aviso-details', id]);
  }

  deleteAviso(id) {
    this.avisoService.deleteAviso(id).then((result) => {
      this.getAvisoList();
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

  updateAviso(data) {
    this.avisoService.updateAviso(this.idavisoedit, data).then((result) => {
      this.aviso = result;
    }, (err) => {
      console.log(err);
    });
  }
}
