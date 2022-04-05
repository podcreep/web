import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EpisodeDetailsComponent } from './episode_details';

import { Episode, Podcast, PodcastsService, Subscription } from '../../services/podcasts';
import { PlaybackService } from '../../services/playback';
import { formatTime } from '../../services/utils';

class EpisodeDetails {
  episode: Episode
  podcast: Podcast
}

@Component({
  selector: 'subscriptions',
  templateUrl: './subscriptions.html',
  styleUrls: ['./subscriptions.css']
})
export class SubscriptionsComponent {
  subscriptions: Subscription[];
  newEpisodes: EpisodeDetails[];
  inProgress: EpisodeDetails[];

  formatTime = formatTime;

  constructor(
    private readonly podcastsService: PodcastsService,
    private readonly playbackService: PlaybackService,
    private readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.podcastsService.subscriptions().subscribe(subscriptionList => {
      this.subscriptions = subscriptionList.subscriptions;
      const podcasts = new Map<Number, Podcast>();
      for (const s of this.subscriptions) {
        podcasts[s.podcast.id] = s.podcast;
      }
      this.newEpisodes = [];
      for (const ep of subscriptionList.newEpisodes) {
        const podcast = podcasts[ep.podcastID];
        this.newEpisodes.push({
          episode: ep,
          podcast: podcast,
        });
      }
      this.inProgress = [];
      for (const ep of subscriptionList.inProgress) {
        const podcast = podcasts[ep.podcastID];
        this.inProgress.push({
          episode: ep,
          podcast: podcast,
        });
      }
    });
  }

  play(p: Podcast, ep: Episode) {
    this.playbackService.start(p, ep);
  }

  showEpisodeDetails(p: Podcast, ep: Episode) {
    const dialogRef = this.dialog.open(
      EpisodeDetailsComponent,
      {
        data: {
          podcast: p,
          episode: ep,
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // We need to refresh the list, probably marked an epsiode as done.
        //?? this.reload();
      }
    });
  }

  // TODO: share this & details.ts version
  formatDate(pubDate: string): string {
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dt = new Date(pubDate);
    return MONTHS[dt.getMonth()] + " " + dt.getDate();
  }
}
