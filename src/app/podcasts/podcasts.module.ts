import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatToolbarModule, } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DiscoverComponent } from './discover';
import { SubscriptionsComponent } from './subscriptions';

import { ServicesModule } from '../../services/services.module';
import { DetailsComponent } from './details';

@NgModule({
  declarations: [
    DiscoverComponent,
    DetailsComponent,
    SubscriptionsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    RouterModule,
    ServicesModule,
  ],
  providers: []
})
export class PodcastsModule { }
