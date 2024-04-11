import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  profileForm: NgForm

  @ViewChild('loginForm') loginForm: NgForm;

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.authService.login(this.username, this.password)
      .subscribe(
        {
          next: (data) => {
            this.router.navigate(['/finances']);
            console.log(data);
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        }
      );

    this.loginForm.reset();
  }
}
