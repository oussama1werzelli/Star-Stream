
export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  backdropUrl: string;
  year: string;
  duration: string;
  genre: string[];
  description: string;
  rating: number;
  type: 'movie' | 'series';
  quality: string;
  videoUrl?: string;
  downloadUrl?: string;
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  downloadUrl?: string;
  thumbnailUrl: string;
  seasonNumber: number;
  episodeNumber: number;
}

export interface WatchHistoryItem {
  movieId: string;
  timestamp: string;
}
