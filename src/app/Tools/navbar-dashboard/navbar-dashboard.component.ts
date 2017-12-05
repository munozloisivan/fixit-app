import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  close_session() {
    localStorage.clear();
    setTimeout(() => {this.router.navigate(['/home']); }, 1000);
  }
}
