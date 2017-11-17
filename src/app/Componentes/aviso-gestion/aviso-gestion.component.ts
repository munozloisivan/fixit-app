import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../Services/aviso.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-aviso-gestion',
  templateUrl: './aviso-gestion.component.html',
  styleUrls: ['./aviso-gestion.component.css']
})
export class AvisoGestionComponent implements OnInit {

  aviso: any;

  constructor(private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
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
}
