import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/delay';

import { ENV } from '../environments/environment';

/**
 * The status we'll return for a username.
 */
export enum UsernameStatus {
  /** The username doesn't exist on the server, and is available to be used. */
  AVAILABE,
  /** The username is already registered. */
  UNAVAILABLE,
  /** The username is somehow invalid. */
  INVALID,
  /** Some other error occured. */
  UNKNOWN,
}

interface RegisterResponse {
  cookie: string;
}

@Injectable()
export class AccountService {
  constructor(private readonly httpClient: HttpClient) {
  }

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

  /**
   * Register the user on the server, returns the cookie you should use to authenticate further
   * requests.
   *
   * @param username The username to register.
   * @param password The password for the user.
   * @returns An {@link Observable} of the cookie to be saved and used in subsequent requests.
   */
  register(username: string, password: string): Observable<string> {
    return this.httpClient
      .post<RegisterResponse>(ENV.BACKEND + 'api/accounts', {
        username: username,
        password: password
      })
      .map(resp => {
        this.saveCookie(username, resp.cookie);
        return resp.cookie;
      });
  }

  login(username: string, password: string): Observable<string> {
    return this.httpClient
      .post<RegisterResponse>(ENV.BACKEND + 'api/accounts/login', {
        username: username,
        password: password
      })
      .map(resp => {
        this.saveCookie(username, resp.cookie);
        return resp.cookie;
      });
  }

  logout() {
    this.saveCookie("", "");
  }

  isLoggedIn(): boolean {
    return window.localStorage["cookie"] != "";
  }

  username(): string {
    if (!this.isLoggedIn()) {
      return "";
    }
    return window.localStorage["username"];
  }

  private saveCookie(username: string, cookie: string) {
    window.localStorage["username"] = username;
    window.localStorage["cookie"] = cookie;
  }
}
