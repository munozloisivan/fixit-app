import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GestorService} from '../../../Services/gestor.service';
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
  public status: string;
  public token;
  public identity: {};
  public data: {};

  constructor( private router: Router, private gestorService: GestorService) { }

  ngOnInit() {
  }

  LoginGestor() {
    this.gestorService.authenticateGestor({'email': this.email, 'password': this.password}).subscribe(
      (data) => {
      this.data = data;

      if (this.data['token'].length <= 0) {
          alert('El token no se ha generado');
      }else {
        this.status = 'success';
        localStorage.setItem('token', JSON.stringify(this.data['token']));
        localStorage.setItem('identity', JSON.stringify(this.data['gestor']));
        localStorage.setItem('role', JSON.stringify(this.data['role']));
        setTimeout(() => {this.router.navigate(['/admin-avisos']); }, 1500);
      }
      }, (err) => {
        console.log(err);
        this.status = 'error';
      });
  }

}
