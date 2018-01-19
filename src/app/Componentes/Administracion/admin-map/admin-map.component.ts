import { Component, OnInit } from '@angular/core';
import {AvisoService} from "../../../Services/aviso.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoriaService} from "../../../Services/categoria.service";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

  avisos: any;
  ciudad_filtrado: any;
  tipo_filtrado: any;
  categorias: any;
  init_lat: number;
  init_lon: number;
  init_zoom: number;

  constructor(private avisoService: AvisoService, private categoriasService: CategoriaService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.setMapa();
    this.getAvisoList();
    this.getCategorias();
  }

  setMapa() {
    this.route.queryParams.forEach((params: Params) => {
      this.init_lat = +params['lat'];
      this.init_lon = +params['lon'];
      this.init_zoom = +params['zoom'];
      console.log(this.init_lat, this.init_lon, this.init_zoom);
    });
  }

  getAvisoList() {
    this.avisoService.getAllAvisos().then((res) => {
      this.avisos = res;
      this.tipo_filtrado = null;
      this.ciudad_filtrado = null;
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

  getAvisosByTipo(tipo) {
    this.avisoService.getAvisosByTipo(tipo).then(res => {
      this.avisos = res;
    }, (err) => {
      console.log(err);
    });
  }

  getAvisosByCiudad(ciudad) {
    this.avisoService.getAvisosByCiudad(ciudad).then(res => {
      this.avisos = res;
    }, (err) => {
      console.log(err);
    });
  }

  clickedMarker(index: number) {
    this.router.navigate(['/aviso-details', index]);
  }
}
