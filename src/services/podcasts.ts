import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, EMPTY } from 'rxjs';

import { PlaybackStateJson, PlaybackService } from './playback';

import { ENV } from '../environments/environment';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  episodes: Episode[];
  isSubscribed: boolean;
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

  podcastID?: number;
  position?: number;
  isComplete?: boolean;
}

export interface PodcastWithEpisode {
  podcast: Podcast,
  episode: Episode,
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
  newEpisodes: Episode[];
  inProgress: Episode[];
}

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
