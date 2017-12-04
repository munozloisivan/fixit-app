import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarUsuarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  close_session() {
    localStorage.clear();
    setTimeout(() => {this.router.navigate(['/home']); }, 1000);
  }
}
