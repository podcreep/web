import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { ENV } from '../environments/environment';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  episodes: Episode[];
  subscription: Subscription;
}

export interface PodcastList {
  podcasts: Podcast[];
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  descriptionHtml: boolean;
  shortDescription: string;
  mediaUrl: string;
  pubDate: string;
}

export interface Subscription {
  id: number;
  oldestUnlistenedEpisodeID: number;
  positions: Map<number, number>;
  podcastID: number;
  podcast: Podcast;
}

export interface SubscriptionList {
  subscriptions: Subscription[];
}

@Injectable()
export class PodcastsService {
  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Searches for podcasts using the given query parameters. TODO: support query parameters.
   */
  search(): Observable<PodcastList> {
    return this.httpClient.get<PodcastList>(ENV.BACKEND + 'api/podcasts');
  }

  /**
   * Gets the details of the podcast with the given ID.
   *
   * @param id The ID of the podcast you're interested in.
   */
  get(id: number, refresh?: boolean): Observable<Podcast> {
    let url = ENV.BACKEND + "api/podcasts/" + id;
    if (refresh) {
      url += "?refresh=1";
    }
    return this.httpClient.get<Podcast>(url);
  }

  /**
   * Subscribe to the given podcast.
   *
   * @param id The ID of the podcast you want to subscribe to.
   */
  subscribe(id: number): Observable<Subscription> {
    const url = ENV.BACKEND + "api/podcasts/" + id + "/subscriptions"
    return this.httpClient.post<Subscription>(url, {});
  }

  /**
   * Subscribe to the given podcast.
   *
   * @param id The ID of the podcast you want to subscribe to.
   */
  unsubscribe(podcastID: number, subscriptionID: number): Observable<Podcast> {
    const url = ENV.BACKEND + "api/podcasts/" + podcastID + "/subscriptions/" + subscriptionID
    return this.httpClient.delete<Podcast>(url, {});
  }

  subscriptions(): Observable<SubscriptionList> {
    const url = ENV.BACKEND + "api/subscriptions"
    return this.httpClient.get<SubscriptionList>(url, {});
  }
}
