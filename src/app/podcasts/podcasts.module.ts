import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, } from '@angular/material';

import { PodcastsListComponent } from './podcasts_list';

import { ServicesModule } from '../../services/services.module';

@NgModule({
  declarations: [
    PodcastsListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    ServicesModule,
  ],
  providers: []
})
export class PodcastsModule { }
