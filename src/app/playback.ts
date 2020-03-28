import { Component } from '@angular/core';

import { PodcastsService } from '../services/podcasts';
import { PlaybackService, PlaybackState } from '../services/playback';
import { formatTime } from '../services/utils';

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

  formatTime = formatTime;

  constructor(
    private readonly podcastsService: PodcastsService,
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
    if (this.playbackService.getState().isPlaying) {
      this.playbackService.pause();
    } else {
      this.playbackService.play();
    }
  }

  skip(seconds) {
    this.playbackService.skip(seconds);
  }

  markDone() {
    console.log("markDone()");
    this.podcastsService.markEpisodeDone(
        this.playbackState.podcast.id, this.playbackState.episode.id);
  }

  private refresh(playbackState: PlaybackState) {
    this.playbackState = playbackState;
  }
}
