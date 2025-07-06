import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  profileForm: NgForm;

  @ViewChild('registerForm') registerForm: NgForm;

  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.confirmPassword = this.registerForm.value.confirmPassword;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;
    this.phoneNumber = this.registerForm.value.phoneNumber;

    this.authService
      .register(this.username, this.password, this.confirmPassword, this.email)
      .subscribe({
        next: () => {
          this.registerForm.reset();
          alert(`Successfully registered user ${this.username}!`);
          this.router.navigate(['/login']);
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          console.info('Registration request complete.');
        },
      });
  }
}
