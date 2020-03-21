import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Podcast, Episode } from 'src/services/podcasts';

export interface EpisodeDetailsData {
  podcast: Podcast
  episode: Episode
}

@Component({
  selector: 'episode-details',
  templateUrl: 'episode_details.html',
  styleUrls: ['episode_details.css'],
})
export class EpisodeDetailsComponent {
  podcast: Podcast
  episode: Episode
  htmlDescription: SafeHtml

  constructor(
      private sanitizer: DomSanitizer,
      @Inject(MAT_DIALOG_DATA) public data: EpisodeDetailsData) {
    this.podcast = data.podcast;
    this.episode = data.episode;

    this.htmlDescription = sanitizer.bypassSecurityTrustHtml(this.episode.description);
  }
}
