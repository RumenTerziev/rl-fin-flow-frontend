import { Component, OnInit } from '@angular/core';
import { FinFlowUser } from '../model/fin-flow-user.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  finFlowUser: FinFlowUser;
  editMode: boolean = false;
  profileForm: FormGroup;
  pictureUrl: string = 'assets/images/avatar.avif';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.http
      .get<FinFlowUser>('/api/v1/users/me', { withCredentials: true })
      .subscribe((user) => {
        this.finFlowUser = user;
        if (this.finFlowUser.pictureUrl) {
          this.pictureUrl = this.finFlowUser.pictureUrl;
        }
        this.createForm();
      });
  }

  createForm() {
    this.profileForm = this.fb.group({
      email: [this.finFlowUser.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  enableEdit() {
    this.editMode = true;
    this.createForm();
  }

  cancelEdit() {
    this.editMode = false;
  }

  saveChanges() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const payload: any = {
      email: this.profileForm.value.email.trim(),
    };

    if (this.profileForm.value.password) {
      payload.password = this.profileForm.value.password;
    }

    this.http.put('/api/v1/users/me', payload).subscribe({
      next: () => {
        this.loadUser();
        this.editMode = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Could not update user info.');
      },
    });
  }
}
