import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AccountService, UsernameStatus } from '../../services/account';

/** Error when invalid control is dirty, touched, or submitted. */
export class UsernameErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  usernameFormControl = new FormControl(
    '',
    [Validators.required],
    [this.isUserNameTaken.bind(this)]);

  usernameErrorStateMatcher = new UsernameErrorStateMatcher();

  constructor(private readonly accountService: AccountService) {}

  isUserNameTaken(ctrl: AbstractControl): Observable<ValidationErrors> {
    return this.accountService.getUsernameStatus(ctrl.value)
        .map(status => {
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
        });
  }
}
