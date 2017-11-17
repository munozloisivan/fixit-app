import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AvisoService} from '../../Services/aviso.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-aviso-details',
  templateUrl: './aviso-details.component.html',
  styleUrls: ['./aviso-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AvisoDetailsComponent implements OnInit {

  aviso: {};

  constructor(private route: ActivatedRoute, private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
    this.getAvisoDetails(this.route.snapshot.params['id']);
  }

  getAvisoDetails(id) {
    this.avisoService.showAviso(id).then((res) => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }
}
