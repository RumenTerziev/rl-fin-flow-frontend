import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  warningMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  goToConverter(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.warningMessage = null;
        this.router.navigate(['/applications/converter']);
      } else {
        this.warningMessage = '⚠️ Please login before accessing the Converter.';
        this.router.navigate(['/login'], {
          queryParams: { authRequired: 'true' },
        });
      }
    });
  }

  goToChat(): void {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.warningMessage = null;
        this.router.navigate(['/applications/chat-ai']);
      } else {
        this.warningMessage = '⚠️ Please login before accessing the AI Chat.';
        this.router.navigate(['/login'], {
          queryParams: { authRequired: 'true' },
        });
      }
    });
  }
}
