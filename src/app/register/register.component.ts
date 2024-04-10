import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  profileForm: NgForm

  @ViewChild('registerForm') registerForm: NgForm;

  username: string;
  password: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    const url = '/authenticate';

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this.http.post(url, formData)
      .subscribe(() => {
        console.log('Success');
      });
    this.username = '';
    this.password = '';
  }
}
