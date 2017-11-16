import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../Services/aviso.service';

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

}
