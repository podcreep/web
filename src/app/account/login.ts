import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services/account';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    private fb: FormBuilder,
    private readonly router: Router) {

    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.accountService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value).subscribe(
        data => { this.router.navigate(['subscriptions']); },
        err => { /* todo: show the error */ console.log(err); }
      );
  }
}
