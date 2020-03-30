import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtService} from "../jwt/jwt.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
