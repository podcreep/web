import { Pipe, PipeTransform } from '@angular/core';

import { ENV } from '../environments/environment';
import { Podcast } from '../services/model';

@Pipe({
  name: 'podcastImageUrl'
})
export class PodcastImageUrlPipe implements PipeTransform {
  _joinUrl(left: String, right: String): String {
    if (right.startsWith("/")) {
      right = right.substring(1);
    }
    if (left.endsWith("/")) {
      left = left.substring(0, left.length - 1);
    }
    return left + "/" + right;
  }

  transform(podcast: Podcast, size?: any): any {
    if (podcast.isImageExternal) {
      return podcast.imageUrl;
    }

    var url = this._joinUrl(ENV.BACKEND, podcast.imageUrl);
    if (size != null) {
      url += `?width=${size}&height=${size}`;
    }
    return url;
  }
}
