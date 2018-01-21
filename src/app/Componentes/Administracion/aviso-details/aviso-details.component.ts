import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AvisoService} from '../../../Services/aviso.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var swal: any;


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

  public popoverTitle = '¿Estás seguro?';
  public popoverMessage = 'Eliminar un aviso es una acción irreversible.';
  public cancel = false;

  constructor(private route: ActivatedRoute, private avisoService: AvisoService, private router: Router) { }

  ngOnInit() {
    this.getAvisoDetails(this.route.snapshot.params['id']);
  }

  goToAutor(id) {
    this.router.navigate(['/usuario-details', id]);
  }

  deleteAviso(id) {
   this.avisoService.deleteAviso(id).then((result) => {
      // this.router.navigate(['/dashboard']);
     swal(
       'Eliminado',
       'El aviso se ha eliminado correctamente',
       'success'
     );
      this.router.navigate(['/admin-avisos']);
    }, (err) => {
      console.log(err);
     swal(
       'Error',
       'Ha ocurrido un error al eliminar el aviso',
       'error'
     );
    });
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
