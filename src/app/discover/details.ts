import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { PlaybackService } from '../../services/playback';
import { formatTime } from '../../services/utils';
import { Podcast, Episode } from '../../services/model';
import { DiscoveryService } from '../../services/discovery';
import { PodcastsService } from '../../services/podcasts';

@Component({
  selector: 'discover-details',
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DiscoverDetailsComponent {
  @Input() id: number;
  podcast?: Podcast = null;

  formatTime = formatTime;

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly podcastsService: PodcastsService,
    private readonly playbackService: PlaybackService,
    public readonly location: Location,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(map(p => p.id))
      .subscribe(sid => {
        const id = parseInt(sid, 10);
        if (!Number.isNaN(id)) {
          this.discoveryService.get(id).then(p => {
            this.podcast = p;
          });
        }
      });
  }

  subscribe() {
    this.podcastsService.subscribeDiscovered(this.podcast.discoverId).then(subscription => {
      this.podcast = subscription.podcast;
    });
  }

  unsubscribe() {
   // this.podcastsService.unsubscribe(this.podcast.id).subscribe(podcast => {
   //   this.podcast = podcast;
   // });
  }

  play(ep: Episode) {
    this.playbackService.start(this.podcast, ep);
  }

  showEpisodeDetails(ep: Episode) {/*
    const dialogRef = this.dialog.open(
      EpisodeDetailsComponent,
      {
        data: {
          podcast: this.podcast,
          episode: ep,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // We need to refresh the list, probably marked an epsiode as done.
        this.reload();
      }
    });*/
  }

  isInProgress(podcast: Podcast, ep: Episode): boolean {
    if (!podcast.isSubscribed) {
      // If you're not subscribed, it's definitely not in progress.
      return false;
    }
    return (ep.position > 0);
  }

  getProgress(podcast: Podcast, ep: Episode): string {
    const position = ep.position;
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
