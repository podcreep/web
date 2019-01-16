import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

import { PodcastsService, Podcast, Episode } from '../../services/podcasts';
import { ActivatedRoute } from '@angular/router';
import { PlaybackService } from '../../services/playback';

@Component({
  selector: 'podcast-details',
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent {
  @Input() id: number;
  podcast: Podcast;

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
    this.podcastsService.subscribe(this.podcast.id).subscribe(p => {
      this.podcast = p;
    });
  }

  play(ep: Episode) {
    this.playbackService.start(this.podcast, ep);
  }

  formatDate(pubDate: string): string {
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dt = new Date(pubDate);
    return MONTHS[dt.getMonth()] + " " + dt.getDate();
  }
}
