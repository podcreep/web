import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CookieInterceptor } from './cookie_interceptor';
import { AccountService } from './account';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true }
  ]
})
export class ServicesModule { }
