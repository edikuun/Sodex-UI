import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../providers/user.service';
import { Observable } from 'rxjs';
import { AfService } from '../providers/af.service';
import { map, tap, take } from '../../../node_modules/rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
    private auth: AfService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.auth.user.pipe();
  }
}
