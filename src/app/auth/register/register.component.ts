import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

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
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;
    this.phoneNumber = this.registerForm.value.phoneNumber;

    this.authService.register(this.username, this.password, this.firstName, this.lastName, this.email, this.phoneNumber)
      .subscribe(
        {
          next: () => {
            this.router.navigate(['/login']);
            alert(`Successfully registered user ${this.username}!`);
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        }
      );

    this.registerForm.reset();
  }
}
