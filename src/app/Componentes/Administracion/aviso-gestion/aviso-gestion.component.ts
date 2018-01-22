import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../../Services/aviso.service';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {CategoriaService} from '../../../Services/categoria.service';

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
  tipo_filtrado: any;
  prioridad_filtrado: any;
  categorias: any;
  ciudad_filtrado: any;
  cp_filtrado: any;
  seguimiento_filtrado: any;

  constructor(private avisoService: AvisoService, private categoriasService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.getAvisoList();
    this.getCategorias();
  }

  getAvisoList() {
    this.avisoService.getAllAvisos().then((res) => {
      this.aviso = res;
      this.tipo_filtrado = null;
      this.prioridad_filtrado = null;
      this.cp_filtrado = null;
      this.ciudad_filtrado = null;
      this.seguimiento_filtrado = null;
    }, (err) => {
      console.log(err);
    });
  }

  getCategorias() {
    this.categoriasService.getAllCategorias().then((res) => {
      this.categorias = res;
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

  getAvisosBySeguimiento(seg) {
    this.avisoService.getAvisosBySeguimiento(seg).then(res => {
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

  getAvisosByCiudad(ciudad) {
    this.avisoService.getAvisosByCiudad(ciudad).then(res => {
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

  getAvisosByCP(tipo) {
    this.avisoService.getAvisosByCP(tipo).then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosOrderedByApoyos() {
    this.avisoService.getAvisosOrderedByApoyos().then(res => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisoDetails(id) {
    this.router.navigate(['/aviso-details', id]);
  }
}
