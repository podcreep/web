import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (window.localStorage['cookie']) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${window.localStorage['cookie']}`
        }
      });
    }
    return next.handle(request);
  }
}
