import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GestorService} from '../../Services/gestor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestor-login',
  templateUrl: './gestor-login.component.html',
  styleUrls: ['./gestor-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GestorLoginComponent implements OnInit {

  email: string;
  password: string;

  constructor( private router: Router, private gestorService: GestorService) { }

  ngOnInit() {
  }

  LoginGestor() {
    this.gestorService.authenticateGestor({'email': this.email, 'password': this.password}).then((res) => {
      // this.usuario = res;
      alert('Autenticado Correctamente');
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log(err);
    });
  }

}
