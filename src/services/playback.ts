import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Episode, Podcast, Subscription } from './podcasts';
import { ENV } from '../environments/environment';

export class PlaybackState {
  isPlaying: boolean;
  podcast?: Podcast;
  episode?: Episode;
  buffered?: TimeRanges;
  duration?: number;
  currTime?: number;
}

// Simplified PlaybackState that we send via JSON to the server.
export class PlaybackStateJson {
  constructor(
    readonly podcastID: number,
    readonly episodeID: number,
    readonly position: number,
    readonly lastUpdated: Date) {
  }
}

// The number of seconds between updates to the server.
const SERVER_UPDATE_FREQ_SECONDS = 30;

/**
 * PlaybackService manages the state of the currently-playing podcast episode (if any).
 */
@Injectable()
export class PlaybackService {
  private currState: PlaybackState;
  private audio: HTMLAudioElement;

  private timeToNextServerUpdate: number;
  private timer: any;

  public state = document.createElement("div");

  constructor(private readonly httpClient: HttpClient) {
    this.audio = new Audio();
    this.audio.autoplay = true;
    this.audio.preload = "auto";

    this.currState = {isPlaying: false};
    this.dispatchState();
  }

  getState(): PlaybackState {
    return this.currState;
  }

  start(p: Podcast, ep: Episode) {
    this.currState = {isPlaying: false, podcast: p, episode: ep};

    this.audio.pause();
    this.audio.src = ep.mediaUrl;
    this.audio.load();

    // If we're already part-way through playing this episode, start from where we left off.
    const position = ep.position;
    if (position > 0) {
      this.audio.currentTime = position;
    }

    this.play();
  }

  play() {
    if (this.currState.isPlaying) {
      return;
    }

    this.currState.isPlaying = true;
    this.dispatchState();
    this.timer = setInterval(() => this.updateState(), 1000);

    this.audio.play();
    this.updateServerState();
  }

  pause() {
    if (!this.currState.isPlaying) {
      return;
    }

    this.currState.isPlaying = false;
    this.dispatchState();

    this.audio.pause();
    this.updateServerState();
  }

  // Stop playing. Very similar to pause, except we want the playback sheet to go away too.
  stop() {
    if (!this.currState.isPlaying) {
      return;
    }

    this.audio.pause();

    this.currState = {isPlaying: false};
    this.dispatchState();
  }

  skip(seconds) {
    if (this.audio.paused) {
      return;
    }
    this.audio.currentTime += seconds;
    this.updateServerState();
  }

  private updateState() {
    if (!this.currState.isPlaying) {
      clearInterval(this.timer);
      return;
    }

    this.timeToNextServerUpdate --;
    if (this.timeToNextServerUpdate <= 0) {
      this.updateServerState();
    }

    this.currState.buffered = this.audio.buffered;
    if (this.audio.readyState >= 1) {
      this.currState.duration = this.audio.duration;
    }
    if (this.audio.readyState >= 2) {
      this.currState.currTime = this.audio.currentTime;
    }
    this.dispatchState();
  }

  /**
   * Sends the state to the server, called at specific times (e.g. when you hit play/pause) or every
   * now and then as playback proceeds.
   */
  private updateServerState() {
    this.timeToNextServerUpdate = SERVER_UPDATE_FREQ_SECONDS;

    const json = new PlaybackStateJson(
      this.currState.podcast.id,
      this.currState.episode.id,
      Math.round(this.currState.currTime),
      new Date());
    const url = ENV.BACKEND + "api/podcasts/" + this.currState.podcast.id + "/episodes/" +
        this.currState.episode.id + "/playback-state";
    this.httpClient.put<Subscription>(url, json).subscribe();
  }

  private dispatchState() {
    this.state.dispatchEvent(new CustomEvent("updated", {detail: this.currState}));
  }
}
