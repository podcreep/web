import { Component } from '@angular/core';

import { Podcast } from '../../services/model';
import { DiscoveryService } from '../../services/discovery';

@Component({
  selector: 'discover',
  templateUrl: './discover.html',
  styleUrls: ['./discover.css']
})
export class DiscoverComponent {
  podcasts: Podcast[];

  constructor(private readonly discoveryService: DiscoveryService) {
  }

  ngOnInit() {
    this.discoveryService.trending().subscribe(podcastList => {
      this.podcasts = podcastList.podcasts;
    });
  }
}
