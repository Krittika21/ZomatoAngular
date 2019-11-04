import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Injectable({
    providedIn : 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private user: UserService,private router: Router) {}

  canActivate() {

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['login-form']);
       return false;
    }

    return true;
  }
}