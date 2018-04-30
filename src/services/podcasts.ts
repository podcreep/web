import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/delay';

import { ENV } from '../environments/environment';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PodcastList {
  podcasts: Podcast[];
}

@Injectable()
export class PodcastsService {
  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Searches for podcasts using the given query parameters. TODO: support query parameters.
   */
  search(): Observable<PodcastList> {
    return this.httpClient
      .get<PodcastList>(ENV.BACKEND + 'api/podcasts')
      .map(resp => {
        return resp;
      });
  }
}
