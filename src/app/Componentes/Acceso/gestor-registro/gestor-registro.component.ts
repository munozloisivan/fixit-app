import { Component, OnInit } from '@angular/core';
import { GestorService } from '../../../Services/gestor.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-gestor-registro',
  templateUrl: './gestor-registro.component.html',
  styleUrls: ['./gestor-registro.component.css']
})
export class GestorRegistroComponent implements OnInit {

 gestor = 'HOLIIIIII';

  constructor(private gestorService: GestorService, private router: Router) { }

  ngOnInit() {
  }

  registerMailGestor() {
    this.gestorService.registerMailGestor(this.gestor).then((result) => {
      alert('Registrado Correctamente');
      this.router.navigate(['/']);
    }, (err) => {
      console.log(err);
    });
  }


}
