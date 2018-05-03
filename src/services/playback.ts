import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/delay';
import { Podcast, Episode } from './podcasts';

export class PlaybackState {
  isPlaying: boolean;
  podcast?: Podcast;
  episode?: Episode;
  buffered?: TimeRanges;
  duration?: number;
  currTime?: number;
}

/**
 * PlaybackService manages the state of the currently-playing podcast episode (if any).
 */
@Injectable()
export class PlaybackService {
  private currState: PlaybackState;
  private audio: HTMLAudioElement;
  private audioContext: AudioContext;
  private audioSource: MediaElementAudioSourceNode;

  private timer: any;

  public state = document.createElement("div");

  constructor() {
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
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  skip(seconds) {
    if (this.audio.paused) {
      return;
    }
    console.log("skipping " + seconds);
    this.audio.currentTime += seconds;
  }

  private updateState() {
    if (!this.currState.isPlaying) {
      clearInterval(this.timer);
      return;
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

  private setState(state: PlaybackState) {
    this.currState = state;
    this.state.dispatchEvent(new CustomEvent("updated", {detail: this.currState}));
  }
}
