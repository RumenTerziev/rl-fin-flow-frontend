import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  profileForm: NgForm

  @ViewChild('createBookForm') loginForm: NgForm;

  username: string;
  password: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit(loginForm: NgForm): void {
    this.username = loginForm.value.username;
    this.password = loginForm.value.password;
    const url = '/api/v1/authenticate';

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this.http.post(url, formData, { observe: 'response' }).pipe(
      catchError((err) => {
        console.error(err);
        return err;
      })
    ).subscribe((resp) => {
      console.log('resp');
    });
    this.username = '';
    this.password = '';
  }
}
