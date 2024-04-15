import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = "rl-fin-flow";

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
