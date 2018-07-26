import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../providers/user.service';
import { Observable } from 'rxjs';
import { AfService } from '../providers/af.service';
import { map, tap, take } from '../../../node_modules/rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router,
    private authService: AfService
  ) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    // if (this.authService.isLoggedIn()) {
    //   return true;
    // }
    // this.router.navigate(['/']);
    // return false;

    return this.afAuth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Access Denied!');
          this.router.navigate(['/login']);
        }
      }));
  }

  canActivateChild(): Observable<boolean> | boolean {

    return this.afAuth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Access Denied!');
          this.router.navigate(['/login']);
        }
      }));
  }
}
