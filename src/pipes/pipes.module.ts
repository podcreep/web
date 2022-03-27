import { NgModule } from '@angular/core';

import { PodcastImageUrlPipe } from './podcast_image_url';

@NgModule({
  imports: [],
  declarations: [
    PodcastImageUrlPipe
  ],
  exports: [
    PodcastImageUrlPipe
  ]
})
export class PipesModule {
}
