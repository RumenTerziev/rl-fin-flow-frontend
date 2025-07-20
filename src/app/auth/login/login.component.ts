import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  username: string;
  password: string;

  loginError: string = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    this.isLoading = true;
    this.loginError = null;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/applications']);
      },
      error: (e) => {
        this.isLoading = false;
        this.loginError = e.message || 'Login failed.';
        console.error(e);
      },
      complete: () => console.info('Login process completed.'),
    });

    this.loginForm.reset();
  }
}
