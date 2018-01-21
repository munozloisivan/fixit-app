import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../../../Services/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";

declare let swal: any;

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  categoriaedit: {};
  idcategoriaedit: any;

  constructor(private categoriaService: CategoriaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['id']);
  }

  getCategoria(id) {
    this.categoriaService.showCategoria(id).then((res) => {
      this.categoriaedit = res;
      this.idcategoriaedit = id;
    }, (err) => {
      console.log(err);
    });
  }

  updateCategoria(id, data) {
    this.categoriaService.updateCategoria(id, data).then((result) => {
      swal(
        'Actualizada',
        'La categoría se ha actualizado correctamente',
        'success'
      );
      this.router.navigate(['/categorias']);
    }, (err) => {
      console.log(err);
      swal(
        'Error',
        'Ha ocurrido un error durante la actualización de la categoría',
        'error'
      );
    });
  }
}
