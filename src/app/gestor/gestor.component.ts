import { Component, OnInit } from '@angular/core';
import {GestorService} from "../Services/gestor.service";

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {
  gestor: any;

  constructor(private gestorService: GestorService) { }

  ngOnInit() {
    this.getGestorList();
  }
  getGestorList() {
    this.gestorService.getAllGestor().then((res) => {
      this.gestor = res;
    }, (err) => {
      console.log(err);
    });
  }

}
