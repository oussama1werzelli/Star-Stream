import { movies } from '../data/moviesData';
import { Movie, WatchHistoryItem } from '../models/types';

// Get recommended movies
export const getRecommendedMovies = (): Movie[] => {
  return movies.slice(0, 5);
};

// Get trending movies
export const getTrendingMovies = (): Movie[] => {
  return [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);
};

// Get new releases
export const getNewReleases = (): Movie[] => {
  return [...movies].sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 5);
};

// Get movie by ID
export const getMovieById = (id: string): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

// Get watch history from local storage
export const getWatchHistory = (): WatchHistoryItem[] => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) return [];
  
  const history = JSON.parse(localStorage.getItem(`watch_history_${currentUser.id}`) || '[]');
  return history;
};

// Add to watch history
export const addToWatchHistory = (movieId: string) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) return;
  
  const historyKey = `watch_history_${currentUser.id}`;
  let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  
  // Remove if already in history
  history = history.filter((item: {movieId: string}) => item.movieId !== movieId);
  
  // Add to beginning of array
  history.unshift({
    movieId,
    timestamp: new Date().toISOString()
  });
  
  // Keep only most recent 20 items
  if (history.length > 20) {
    history = history.slice(0, 20);
  }
  
  localStorage.setItem(historyKey, JSON.stringify(history));
};

// Search function to search through movies and series
export const searchMovies = (query: string): Movie[] => {
  if (!query) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowerCaseQuery) || 
    (movie.originalTitle && movie.originalTitle.toLowerCase().includes(lowerCaseQuery))
  );
};

// Get movies by genre
export const getMoviesByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => movie.genre.includes(genre));
};

// Get all genres
export const getAllGenres = (): string[] => {
  const allGenres = movies.flatMap(movie => movie.genre);
  return [...new Set(allGenres)];
};

// Get movies by type (movie or series)
export const getByType = (type: 'movie' | 'series'): Movie[] => {
  return movies.filter(movie => movie.type === type);
};
