import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ENV } from '../environments/environment';
import { Podcast, PodcastList } from './model';

@Injectable()
export class DiscoveryService {
  constructor(
    private readonly httpClient: HttpClient) {
  }

  trending(): Observable<PodcastList> {
    return this.httpClient.get<PodcastList>(ENV.BACKEND + "api/discover/trending");
  }

  /**
   * Gets the details of the podcast with the given ID.
   *
   * @param id The ID of the podcast you're interested in. The ID in this case is the one from discovery, we don't
   *           expect this ID to mean anything outside of discovery.
   */
  get(id: number, refresh?: boolean): Observable<Podcast> {
    let url = ENV.BACKEND + "api/discover/podcast/" + id;
    if (refresh) {
      url += "?refresh=1";
    }
    return this.httpClient.get<Podcast>(url);
  }
}
