import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    const token = JSON.parse(localStorage.getItem('token'));
    const role = localStorage.getItem('role');

    if (token) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/acceso']);
    return false;
  }
}
