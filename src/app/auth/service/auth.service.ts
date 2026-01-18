import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { FinFlowUser } from '../../model/fin-flow-user.model';
import { User } from '../../model/user.model';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private apiAuthUrl = '/api/v1/auth';
  private googleAuthUrl = '/api/v1/oauth2/authorization/google';

  constructor(private http: HttpClient) {}

  loginWithGoogle(): void {
    window.location.href = this.googleAuthUrl;
  }

  login(username: string, password: string) {
    const url = '/api/v1/auth/login';

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<{ username: string }>(url, formData).pipe(
      tap((resp) => {
        const user = new User(resp.username);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }),
      catchError(this.handleError)
    );
  }

  register(
    username: string,
    password: string,
    confirmPassword: string,
    email: string
  ) {
    const url = '/api/v1/auth/register';

    if (password !== confirmPassword) {
      return throwError(() => new Error('Passwords do not match.'));
    }

    const user: FinFlowUser = {
      username,
      password,
      confirmPassword,
      email,
      pictureUrl: '',
    };

    return this.http.post<any>(url, user).pipe(catchError(this.handleError));
  }

  logout() {
    const url = '/api/v1/auth/logout';
    this.user.next(null);
    localStorage.removeItem('userData');
    return this.http.post<any>(url, {}).pipe(catchError(this.handleError));
  }

  autoLogin() {
    this.http
      .get<User>('/api/v1/users/me', { withCredentials: true })
      .subscribe({
        next: (user) => {
          if (user) {
            this.user.next(new User(user.username));
          } else {
            this.user.next(null);
          }
        },
        error: (err) => {
          this.user.next(null);
        },
      });
  }

  autoLoginFetch(): Observable<User | null> {
    return this.http
      .get<User>('/api/v1/users/me', { withCredentials: true })
      .pipe(
        map((user) => (user ? new User(user.username) : null)),
        catchError(() => of(null))
      );
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout().subscribe();
    }, expirationDuration);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = 'Invalid username or password.';
      } else if (error.status === 0) {
        errorMessage = 'No connection to server.';
      } else {
        errorMessage = `Server error (${error.status}): ${error.message}`;
      }
    }

    console.error('AuthService error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
