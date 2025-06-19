import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinFlowUser } from '../../model/fin-flow-user.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable()
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    const url = '/api/v1/auth/login';

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post(url, formData)
      .pipe(
        tap((resp: User) => {
          const user = new User(resp.username);
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        }));
  }

  register(username: string, password: string, confirmPassword: string, firstName: string, lastName: string, email: string, phoneNumber: string) {

    const url = '/api/v1/auth/register';

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user: FinFlowUser = {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      phoneNumber
    };

    return this.http.post<any>(url, user);
  }

  logout() {
    const url = '/api/v1/auth/logout';
    this.user.next(null);
    localStorage.removeItem('userData');
    return this.http.post<any>(url, {});
  }

  autoLogin() {
    const userData: {
      username: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.username);

    if (loadedUser.username) {
      this.user.next(loadedUser);
      this.autoLogout(100000000);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
