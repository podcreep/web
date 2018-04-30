import { Component } from '@angular/core';
import { AccountService } from '../services/account';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  constructor(
    public readonly accountService: AccountService,
    private readonly router: Router) {
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}
