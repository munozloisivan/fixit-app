import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CategoriaService} from '../../Services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria = {};

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
  }

  getCategoriaList() {
    this.categoriaService.getAllCategorias().then((res) => {
      this.categoria = res;
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

  updateCategoria(id, data) {
    this.categoriaService.updateCategoria(id, data).then((result) => {
      this.getCategoriaList();
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }
}
