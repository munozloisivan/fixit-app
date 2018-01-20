import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../../../Services/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";

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
      this.router.navigate(['/categorias']);
    }, (err) => {
      console.log(err);
    });
  }
}
