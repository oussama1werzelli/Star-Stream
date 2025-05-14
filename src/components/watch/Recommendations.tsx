
import { useState, useEffect } from "react";
import { Movie, getMoviesByGenre } from "@/utils/movieData";
import ContentRow from "@/components/ContentRow";

interface RecommendationsProps {
  movie: Movie;
  maxItems?: number;
}

export const Recommendations = ({ movie, maxItems = 5 }: RecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (movie && movie.genre.length > 0) {
      // Choose a random genre from the movie's genres
      const randomGenreIndex = Math.floor(Math.random() * movie.genre.length);
      const selectedGenre = movie.genre[randomGenreIndex];
      
      // Get recommendations by genre
      const similarMovies = getMoviesByGenre(selectedGenre)
        // Filter out the current movie
        .filter(m => m.id !== movie.id)
        // Limit the number of recommendations
        .slice(0, maxItems);
      
      setRecommendations(similarMovies);
    }
  }, [movie, maxItems]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">توصيات مشابهة</h2>
      <ContentRow title="" items={recommendations} />
    </div>
  );
};
