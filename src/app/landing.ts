import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../services/account';

@Component({
  selector: 'landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router) {
  }


  ngOnInit() {
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['subscriptions']); 
    }
  }
}
