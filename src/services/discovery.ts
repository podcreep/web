import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

import { ENV } from '../environments/environment';
import { Podcast, PodcastList } from './model';

@Injectable()
export class DiscoveryService {
  constructor(
    private readonly httpClient: HttpClient) {
  }

  trending(): Promise<PodcastList> {
    return firstValueFrom(this.httpClient.get<PodcastList>(ENV.BACKEND + "api/discover/trending"));
  }

  search(query: string): Promise<PodcastList> {
    return firstValueFrom(this.httpClient.get<PodcastList>(ENV.BACKEND + "api/discover/search", {
      params: new HttpParams().set("q", query),
    }))
  }

  /**
   * Gets the details of the podcast with the given ID.
   *
   * @param id The ID of the podcast you're interested in. The ID in this case is the one from discovery, we don't
   *           expect this ID to mean anything outside of discovery.
   */
  get(id: number, refresh?: boolean): Promise<Podcast> {
    let url = ENV.BACKEND + "api/discover/podcast/" + id;
    if (refresh) {
      url += "?refresh=1";
    }
    return firstValueFrom(this.httpClient.get<Podcast>(url));
  }
}
