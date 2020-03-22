import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Podcast, Episode, PodcastsService } from '../../services/podcasts';

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
      private readonly dialogRef: MatDialogRef<EpisodeDetailsComponent>,
      private readonly podcastsService: PodcastsService,
      private readonly sanitizer: DomSanitizer,
      @Inject(MAT_DIALOG_DATA) public data: EpisodeDetailsData) {
    this.podcast = data.podcast;
    this.episode = data.episode;

    this.htmlDescription = sanitizer.bypassSecurityTrustHtml(this.episode.description);
  }

  markDone() {
    this.podcastsService.markEpisodeDone(this.podcast.id, this.episode.id);
    this.dialogRef.close(true);
  }

  markAllDone() {
    this.podcastsService.markEpisodeAfterDone(this.podcast.id, this.episode.id);
    this.dialogRef.close(true);
  }
}
