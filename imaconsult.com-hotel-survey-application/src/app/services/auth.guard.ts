import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(public userService: UserService, private route : Router,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (Object.keys(this.userService.user).length === 0 && Object.getPrototypeOf(this.userService.user) === Object.prototype) {
      this.route.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
