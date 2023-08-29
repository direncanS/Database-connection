import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Observable, from, of, switchMap } from 'rxjs';
import { AuthService } from '../public/services/auth-service/account.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.authService.getCurrentUser()).pipe(
      switchMap(user => {
        if (Object.entries(user).length > 0) {
          return of(true);
        } else {
          return of(this.router.createUrlTree(['/']));
        }
      })
    );
  }
}
