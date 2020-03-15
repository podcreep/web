import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule, } from '@angular/material/toolbar';
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
