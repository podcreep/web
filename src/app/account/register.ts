import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService, UsernameStatus } from '../../services/account';

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    private fb: FormBuilder,
    private readonly router: Router) {

    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required], [this.userNameValidator()]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    });
  }

  userNameValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
      return this.accountService.getUsernameStatus(ctrl.value)
          .pipe(
            map(status => {
              switch(status) {
                case UsernameStatus.AVAILABE:
                  return null;
                case UsernameStatus.UNAVAILABLE:
                  return { username: "unavailable" };
                case UsernameStatus.INVALID:
                  return { username: "invalid" };
                default:
                  return { username: "unknown" };
              }
            })
          );
    }
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.accountService.register(
      this.registerForm.controls['username'].value,
      this.registerForm.controls['password'].value).subscribe(
        data => { this.router.navigate(['podcasts']); },
        err => { /* todo: show the error */ console.log(err); }
      );
  }
}
