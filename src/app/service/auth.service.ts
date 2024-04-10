import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
  };
}
