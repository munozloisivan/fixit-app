import { Component, OnInit } from '@angular/core';
import {AvisoService} from "../../../Services/aviso.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

  avisos: any;

  constructor(private avisoService: AvisoService, private router: Router) {
  }

  ngOnInit() {
    this.getAvisoList();
  }
  getAvisoList() {
    this.avisoService.getAllAvisos().then((res) => {
      this.avisos = res;
    }, (err) => {
      console.log(err);
    });
  }

  clickedMarker(index: number) {
    this.router.navigate(['/aviso-details', index]);
  }
}
