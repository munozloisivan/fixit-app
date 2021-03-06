import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CategoriaService} from '../../../Services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: any;
  categoriaedit: {};
  idcategoriaedit: any;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.getCategoriaList();
  }

  getCategoriaList() {
    this.categoriaService.getAllCategorias().then((res) => {
      console.log(res);
      this.categoria = res;
    }, (err) => {
      console.log(err);
    });
  }

  getCategoria(id) {
    this.categoriaService.showCategoria(id).then((res) => {
      this.categoriaedit = res;
      this.idcategoriaedit = id;
    }, (err) => {
      console.log(err);
    });
  }

  deleteCategoria(id) {
    this.categoriaService.deleteCategoria(id).then((result) => {
      this.getCategoriaList();
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

  addCategoria(id) {
    this.categoriaService.saveCategoria(id).then((result) => {
      this.getCategoriaList();
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }
}
