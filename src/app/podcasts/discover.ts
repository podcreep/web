import { Component } from '@angular/core';

import { PodcastsService, Podcast } from '../../services/podcasts';

@Component({
  selector: 'discover',
  templateUrl: './discover.html',
  styleUrls: ['./discover.css']
})
export class DiscoverComponent {
  podcasts: Podcast[];

  constructor(private readonly podcastsService: PodcastsService) {
  }

  ngOnInit() {
    this.podcastsService.trending().subscribe(podcastList => {
      this.podcasts = podcastList.podcasts;
    });
  }
}
