import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatToolbarModule, } from '@angular/material';

import { DiscoverComponent } from './discover';
import { PodcastsListComponent } from './podcasts_list';

import { ServicesModule } from '../../services/services.module';

@NgModule({
  declarations: [
    DiscoverComponent,
    PodcastsListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    ServicesModule,
  ],
  providers: []
})
export class PodcastsModule { }
