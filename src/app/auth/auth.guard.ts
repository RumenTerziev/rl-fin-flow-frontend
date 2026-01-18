import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './service/auth.service';
import { catchError, map, take } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    const currentUser: User = this.authService.user.value;
    if (currentUser) {
      return of(true);
    }

    return this.authService.autoLoginFetch().pipe(
      map((user) => {
        if (user) {
          this.authService.user.next(user);
          return true;
        }
        return this.router.createUrlTree(['/login']);
      }),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    );
  }
}
