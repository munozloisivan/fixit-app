import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AvisoService} from "../../Services/aviso.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aviso-edit',
  templateUrl: './aviso-edit.component.html',
  styleUrls: ['./aviso-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AvisoEditComponent implements OnInit {

  aviso: {};

  constructor(private avisoService: AvisoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAviso(this.route.snapshot.params['id']);
  }

  getAviso(id) {
    this.avisoService.showAviso(id).then((res) => {
      this.aviso = res;
    }, (err) => {
      console.log(err);
    });
  }

  updateAviso(id) {
    this.avisoService.updateAviso(id, this.aviso).then((result) => {
      let id = result['_id'];
      this.router.navigate(['/aviso-details', id]);
    }, (err) => {
      console.log(err);
    });
  }
}
