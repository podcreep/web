import { HttpClient } from '@angular/common/http';

import { ENV } from '../environments/environment';

/** Base class for our services. */
export class BaseService {
  constructor(protected readonly httpClient: HttpClient) {
  }

  protected saveCookie(cookie: string) {
    window.localStorage["cookie"] = cookie;
  }
}
