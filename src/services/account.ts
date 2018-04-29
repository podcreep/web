import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/delay';

import { ENV } from '../environments/environment';

export enum UsernameStatus {
  AVAILABE,
  UNAVAILABLE,
  INVALID,
  UNKNOWN,
}

@Injectable()
export class AccountService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Gets the status of the given username. Returns one of the {@link UsernameStatus} enumerations,
   * depending on whether the username is available, already taken, or invalid,
   *
   * @param username The username to check.
   */
  getUsernameStatus(username: string): Observable<UsernameStatus> {
    return this.httpClient
      .get(ENV.BACKEND + 'api/accounts', {
        params: { username: username },
      })
      .map(resp => {
        console.log("here we are");
        // Any 200 response means the username was in the database already.
        return UsernameStatus.UNAVAILABLE;
      })
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 404) {
          return of(UsernameStatus.AVAILABE);
        } else {
          return of(UsernameStatus.INVALID);
        }
      }));
  }
}
