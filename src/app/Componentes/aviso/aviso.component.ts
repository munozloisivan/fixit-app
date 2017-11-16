import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../Services/aviso.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {
  aviso: any;

  constructor(private avisoService: AvisoService) { }

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
  deleteAviso(id){
    this.avisoService.deleteAviso(id).then((result) => {
        this.router.navigate(['avisos']);
    }, (err) => {
      console.log(err);
    });
  }
  updateAviso(id){
    this.avisoService.updateAviso(id, this.aviso).then((result) => {
      let id = result['_id'];
    }, (err) => {
      console.log(err);
    });
  }
}
//

//
