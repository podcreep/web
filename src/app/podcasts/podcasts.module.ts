import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { DetailsComponent } from './details';
import { DiscoverComponent } from './discover';
import { EpisodeDetailsComponent } from './episode_details';
import { SubscriptionsComponent } from './subscriptions';

import { ServicesModule } from '../../services/services.module';

@NgModule({
  declarations: [
    DiscoverComponent,
    DetailsComponent,
    EpisodeDetailsComponent,
    SubscriptionsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule,
    ServicesModule,
  ],
  providers: []
})
export class PodcastsModule { }
