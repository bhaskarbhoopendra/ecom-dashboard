import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {Injectable} from '@angular/core';

//import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log('auth-guard--json  ', data);
        if (sessionStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
