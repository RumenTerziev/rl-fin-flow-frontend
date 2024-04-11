import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinFlowUser } from '../model/fin-flow-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    const url = '/api/v1/authenticate';

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<any>(url, formData);

  }

  register(username: string, password: string, firstName: string, lastName: string, email: string, phoneNumber: string) {

    const url = '/api/v1/users/register';

    const user: FinFlowUser = {
      username,
      password,
      firstName,
      lastName,
      email,
      phoneNumber
    };

    return this.http.post<any>(url, user);
  }
}
