import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
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

    this.setState({isPlaying: false});
  }

  getState(): PlaybackState {
    return this.currState;
  }

  start(p: Podcast, ep: Episode) {
    this.setState({isPlaying: true, podcast: p, episode: ep});
    this.audio.pause();
    this.audio.src = ep.mediaUrl;
    this.audio.load();
    this.audio.play();
    this.timer = setInterval(() => this.updateState(), 1000);
    this.updateServerState();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    this.updateServerState();
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
    this.setState(this.currState);
  }

  /**
   * Sends the state to the server, called at specific times (e.g. when you hit play/pause) or every
   * now and then as playback proceeds.
   */
  private updateServerState() {
    this.timeToNextServerUpdate = SERVER_UPDATE_FREQ_SECONDS;

    class PlaybackStateJson {
      constructor(
        readonly podcastID: number,
        readonly episodeID: number,
        readonly position: number) {
      }
    }

    const json = new PlaybackStateJson(
      this.currState.podcast.id,
      this.currState.episode.id,
      Math.round(this.currState.currTime));
    const url = ENV.BACKEND + "api/podcasts/" + this.currState.podcast.id + "/episodes/" +
        this.currState.episode.id + "/playback-state";
    this.httpClient.put<Subscription>(url, json).subscribe();
  }

  private setState(state: PlaybackState) {
    this.currState = state;
    this.state.dispatchEvent(new CustomEvent("updated", {detail: this.currState}));
  }
}