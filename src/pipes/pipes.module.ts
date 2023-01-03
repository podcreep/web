import { NgModule } from '@angular/core';

import { PodcastImageUrlPipe } from './podcast_image_url';
import { SafeHtmlPipe } from './safe_html';

@NgModule({
  imports: [],
  declarations: [
    PodcastImageUrlPipe,
    SafeHtmlPipe
  ],
  exports: [
    PodcastImageUrlPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule {
}
