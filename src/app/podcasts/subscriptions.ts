import { Component } from '@angular/core';

import { PodcastsService, Subscription } from '../../services/podcasts';

@Component({
  selector: 'subscriptions',
  templateUrl: './subscriptions.html',
  styleUrls: ['./subscriptions.css']
})
export class SubscriptionsComponent {
  subscriptions: Subscription[];

  constructor(private readonly podcastsService: PodcastsService) {
  }

  ngOnInit() {
    this.podcastsService.subscriptions().subscribe(subscriptionList => {
      this.subscriptions = subscriptionList.subscriptions;
    });
  }
}
