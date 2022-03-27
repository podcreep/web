import { Pipe, PipeTransform } from '@angular/core';

import { ENV } from '../environments/environment';
import { Podcast } from '../services/podcasts';

@Pipe({
  name: 'podcastImageUrl'
})
export class PodcastImageUrlPipe implements PipeTransform {
  transform(podcast: Podcast, size?: any): any {
    var url = ENV.BACKEND + podcast.imageUrl;
    if (size != null) {
      url += `?width=${size}&height=${size}`;
    }
    return url;
  }
}
