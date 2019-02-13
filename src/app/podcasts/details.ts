import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PodcastsService, Podcast, Episode } from '../../services/podcasts';
import { PlaybackService } from '../../services/playback';
import { formatTime } from '../../services/utils';

@Component({
  selector: 'podcast-details',
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent {
  @Input() id: number;
  podcast: Podcast;

  formatTime = formatTime;

  constructor(
    private readonly podcastsService: PodcastsService,
    private readonly playbackService: PlaybackService,
    public readonly location: Location,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.map(p => p.id)
      .subscribe(sid => {
        const id = parseInt(sid, 10);
        if (id != NaN) {
          this.podcastsService.get(id).subscribe(p => {
            this.podcast = p;
          });
        }
      });
  }

  refresh() {
    this.podcastsService.get(this.podcast.id, true).subscribe(p => {
      this.podcast = p;
    });
  }

  subscribe() {
    this.podcastsService.subscribe(this.podcast.id).subscribe(subscription => {
      this.podcast = subscription.podcast;
    });
  }

  unsubscribe() {
    this.podcastsService.unsubscribe(this.podcast.id, this.podcast.subscription.id).subscribe(podcast => {
      this.podcast = podcast;
    });
  }

  play(ep: Episode) {
    this.playbackService.start(this.podcast, ep);
  }

  isInProgress(podcast: Podcast, ep: Episode): boolean {
    return (podcast.subscription.positions[ep.id] > 0);
  }

  getProgress(podcast: Podcast, ep: Episode): string {
    const position = podcast.subscription.positions[ep.id];
    if (position <= 0) {
      return "--:--";
    }
    
    return formatTime(position);
  }

  formatDate(pubDate: string): string {
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dt = new Date(pubDate);
    return MONTHS[dt.getMonth()] + " " + dt.getDate();
  }
}
