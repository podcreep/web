import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

import { PodcastsService, Podcast } from '../../services/podcasts';
import { ActivatedRoute } from '@angular/router';

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

  formatDate(pubDate: string): string {
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dt = new Date(pubDate);
    return MONTHS[dt.getMonth()] + " " + dt.getDate();
  }
}
