export interface Episode {
  id: number;
  name: string;
  airDate: string;
  episode: string;
}

export interface EpisodeFilters {
  page: number;
  name: string;
  episode: string;
}
