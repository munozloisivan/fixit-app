import { Component, OnInit } from '@angular/core';
import {AvisoService} from '../../../Services/aviso.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoriaService} from "../../../Services/categoria.service";

@Component({
  selector: 'app-aviso-edit',
  templateUrl: './aviso-edit.component.html',
  styleUrls: ['./aviso-edit.component.css']
})
export class AvisoEditComponent implements OnInit {

  avisomodal: {};
  categorias: any;
  view_location: any;
  view_lon: any;
  view_lat: any;

  constructor(private route: ActivatedRoute,
              private categoriasService: CategoriaService,
              private avisoService: AvisoService,
              private router: Router) {}

  ngOnInit() {
    this.getAvisoDetails(this.route.snapshot.params['id']);
    this.getCategorias();
  }

  getAvisoDetails(id) {
    this.avisoService.showAviso(id).then((res) => {
      this.avisomodal = res;
      this.view_location = res['localizacion'];
      this.view_lon = this.view_location['lon'];
      this.view_lat = this.view_location['lat'];
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

  updateAviso(id, data) {
    this.avisoService.updateAviso(id, data).then((result) => {
      this.router.navigate(['/aviso-details', id]);
    }, (err) => {
      console.log(err);
    });
  }
}
