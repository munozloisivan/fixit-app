import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../Services/aviso.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-aviso-admin',
  templateUrl: './aviso-admin.component.html',
  styleUrls: ['./aviso-admin.component.css']
})
export class AvisoAdminComponent implements OnInit {

  aviso: any;

  constructor(private avisoService: AvisoService, private router: Router) { }

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

  deleteAviso(id) {
    this.avisoService.deleteAviso(id).then((result) => {
      this.getAvisoList();
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }
}
