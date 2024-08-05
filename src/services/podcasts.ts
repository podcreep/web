import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, EMPTY, firstValueFrom } from 'rxjs';

import { PlaybackStateJson, PlaybackService } from './playback';

import { ENV } from '../environments/environment';
import { PodcastList, Podcast, PodcastWithEpisode, Subscription, SubscriptionList } from './model';

@Injectable()
export class PodcastsService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly playbackService: PlaybackService) {
  }

  /**
   * Searches for podcasts using the given query parameters. TODO: support query parameters.
   */
  search(): Observable<PodcastList> {
    return this.httpClient.get<PodcastList>(ENV.BACKEND + "api/podcasts");
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
   * Gets the most recently-played episode. We can use this to resume playing on page load.
   */
  getMostRecentlyPlayed(): Observable<PodcastWithEpisode> {
    let url = ENV.BACKEND + "api/last-played"
    return this.httpClient
      .get<PodcastWithEpisode>(url, {})
      .pipe(catchError((err: HttpErrorResponse) => {
        // If we get any error, we'll just return an empty observable.
        return EMPTY
      }));
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
   * Subscribe to a podcast that we got back from discoveryService. These will have different IDs to podcasts that we
   * track. If we don't already have this podcast tracked, we'll start tracking it and the new ID will be returned in
   * the subscription.
   * 
   * @param discoverId 
   */
  subscribeDiscovered(discoverId: string): Promise<Subscription> {
    const url = ENV.BACKEND + "api/podcasts/subscribeDiscovered"
    return firstValueFrom(this.httpClient.post<Subscription>(url, {
      discoveryId: discoverId,
    }))
  }

  /**
   * Subscribe to the given podcast.
   *
   * @param id The ID of the podcast you want to subscribe to.
   */
  unsubscribe(podcastID: number): Observable<Podcast> {
    const url = ENV.BACKEND + "api/podcasts/" + podcastID
    return this.httpClient.delete<Podcast>(url, {});
  }

  subscriptions(): Observable<SubscriptionList> {
    const url = ENV.BACKEND + "api/subscriptions"
    return this.httpClient.get<SubscriptionList>(url, {});
  }

  /** Mark the given podcast/episode as done. */
  markEpisodeDone(podcastID: number, episodeID: number) {
    const json = new PlaybackStateJson(podcastID, episodeID, -1, new Date());
    const url = `${ENV.BACKEND}api/podcasts/${podcastID}/episodes/${episodeID}/playback-state`;
    this.httpClient.put<Subscription>(url, json).subscribe();

    // If this is the currently-playing song, stop playing.
    const playbackState = this.playbackService.getState();
    if (playbackState.isPlaying &&
        playbackState.podcast.id == podcastID &&
        playbackState.episode.id == episodeID) {
      this.playbackService.stop();
    }
  }

  /** Mark the given episode and all older episodes as done. */
  markEpisodeAfterDone(podcastID: number, episodeID: number) {
    // TODO:
    const json = new PlaybackStateJson(podcastID, episodeID, -1, new Date());
    const url = `${ENV.BACKEND}api/podcasts/${podcastID}/episodes/${episodeID}/playback-state`;
    this.httpClient.put<Subscription>(url, json).subscribe();

    // TODO: if this is the currently-playing song, or the currently playing song is before this
    // one, stop playing.
  }
}
