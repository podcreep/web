import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaybackService, PlaybackState } from '../services/playback';

class BufferedSegment {
  start: number;
  end: number;
}

@Component({
  selector: 'playback',
  templateUrl: './playback.html',
  styleUrls: ['./playback.css']
})
export class PlaybackComponent {
  playbackState: PlaybackState;

  constructor(
    private readonly playbackService: PlaybackService) {
    this.refresh(this.playbackService.getState());
    this.playbackService.state.addEventListener("updated", (e: CustomEvent) => {
      this.refresh(e.detail);
    });
  }

  bufferedSegments() {
    const duration = this.playbackState.duration;
    const segments = new Array<BufferedSegment>();
    const buffered = this.playbackState.buffered;
    if (!buffered) {
      return segments;
    }

    for(let i = 0; i < buffered.length; i++) {
      segments.push({
        start: 100.0 * buffered.start(i) / duration,
        end: 100.0 * buffered.end(i) / duration});
    }
    return segments;
  }

  playbackPercent(): number {
    if (!this.playbackState.isPlaying) {
      return 0;
    }

    return 100.0 * this.playbackState.currTime / this.playbackState.duration;
  }

  playPause() {
    this.playbackService.play();
  }

  skip(seconds) {
    this.playbackService.skip(seconds);
  }

  formatTime(seconds): string {
    if (!seconds) {
      return "--:--";
    }

    const min = Math.floor(seconds / 60);
    const sec = Math.round(seconds - (min * 60));
    let str = "";
    if (min < 10) {
      str += "0";
    }
    str += min + ":";
    if (sec < 10) {
      str += "0";
    }
    str += sec;
    return str;
  }

  private refresh(playbackState: PlaybackState) {
    this.playbackState = playbackState;
  }
}
