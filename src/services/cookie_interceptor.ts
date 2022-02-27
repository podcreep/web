import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  private handleError(resp: HttpErrorResponse): Observable<any> {
    if (resp.status == 401) {
      // If we get a 401 status, it likely means our logic credentials are not valid any more.
      // Make sure to clear out the cookie we have stored (if any)
      window.localStorage["cookie"] = "";

      // And redirect to the login page.
      this.router.navigate(["login"]);
      return of(resp.message);
    }

    return throwError(resp);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (window.localStorage["cookie"]) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${window.localStorage["cookie"]}`
        }
      });
    }
    return next.handle(request).pipe(catchError(resp => this.handleError(resp)));
  }
}
