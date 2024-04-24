import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onLogut() {

    this.authService.logout()
    .subscribe(
      {
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }
}
