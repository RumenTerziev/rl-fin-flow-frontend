import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  title = 'RumenTerziev';

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
