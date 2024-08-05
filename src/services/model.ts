
export interface Podcast {
  id: number;
  discoverId: string;
  title: string;
  description: string;
  imageUrl: string;
  isImageExternal: boolean;
  episodes: Episode[];
  isSubscribed: boolean;
}

export interface PodcastList {
  podcasts: Podcast[];
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  descriptionHtml: boolean;
  shortDescription: string;
  mediaUrl: string;
  pubDate: string;

  podcastID?: number;
  position?: number;
  isComplete?: boolean;
}

export interface PodcastWithEpisode {
  podcast: Podcast,
  episode: Episode,
}

export interface Subscription {
  id: number;
  oldestUnlistenedEpisodeID: number;
  positions: Map<number, number>;
  podcastID: number;
  podcast: Podcast;
}

export interface SubscriptionList {
  subscriptions: Subscription[];
  newEpisodes: Episode[];
  inProgress: Episode[];
}
