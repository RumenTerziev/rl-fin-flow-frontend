import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {



  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  reload() {
    window.location.reload();
  }
}
