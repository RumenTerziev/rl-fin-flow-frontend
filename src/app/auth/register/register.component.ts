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
  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const { username, password, confirmPassword, email } =
      this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService
      .register(username, password, confirmPassword, email)
      .subscribe({
        next: () => {
          this.registerForm.reset();
          alert(`Successfully registered user ${username}!`);
          this.router.navigate(['/login']);
        },
        error: (e) => {
          console.error(e);
          alert('Registration failed. Please try again.');
        },
        complete: () => {
          console.info('Registration request complete.');
        },
      });
  }
}
