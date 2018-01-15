import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AvisoService} from '../../../Services/aviso.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-aviso-details',
  templateUrl: './aviso-details.component.html',
  styleUrls: ['./aviso-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AvisoDetailsComponent implements OnInit {

  avisomodal: any;
  view_location: any;
  view_lon: any;
  view_lat: any;

  constructor(private route: ActivatedRoute, private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
    this.getAvisoDetails(this.route.snapshot.params['id']);
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
}
