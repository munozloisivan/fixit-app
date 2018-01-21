import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../Services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var swal: any;


@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.css']
})
export class UsuarioDetailsComponent implements OnInit {

  usuario: {};

  public popoverTitle = '¿Estás seguro?';
  public popoverMessage = 'Eliminar un usuario es una acción irreversible y también se eliminarán los avisos que haya creado este usuario.';
  public cancel = false;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getUsuarioDetails(this.route.snapshot.params['id']);
  }

  getAvisoDetails(id) {
    this.router.navigate(['/aviso-details', id]);
  }

  deleteUsuario(id) {
    this.usuarioService.deleteUsuario(id).then((result) => {
      swal(
        'Eliminado',
        'El usuario se ha eliminado correctamente',
        'success'
      );
      this.router.navigate(['/admin-usuarios']);
      // this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
      swal(
        'Error',
        'Ha ocurrido un error al eliminar al usuario',
        'error'
      );
    });
  }

  getUsuarioDetails(id) {
    this.usuarioService.showUsuario(id).then((res) => {
      console.log('Usuario:' + res);
      this.usuario = res;
    }, (err) => {
      console.log(err);
    });
  }

}
