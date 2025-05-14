
import { useState, useMemo } from "react";
import { movies } from "../utils/movieData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [genre, setGenre] = useState<string | null>(null);
  
  // Filter movies by type and selected genre
  const filteredMovies = useMemo(() => {
    let filtered = movies.filter(movie => movie.type === "movie");
    
    if (genre) {
      filtered = filtered.filter(movie => movie.genre.includes(genre));
    }
    
    return filtered;
  }, [genre]);
  
  // Get unique genres from all movies
  const genres = useMemo(() => {
    const allGenres = movies
      .filter(movie => movie.type === "movie")
      .flatMap(movie => movie.genre);
    return [...new Set(allGenres)];
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">أفلام</h1>
        
        {/* Genre filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setGenre(null)}
            className={`px-4 py-2 rounded-full text-sm ${
              genre === null ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            الكل
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-2 rounded-full text-sm ${
                genre === g ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        
        {/* Movies grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-400">لا توجد أفلام متاحة في هذا التصنيف</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                year={movie.year}
                quality={movie.quality}
                rating={movie.rating}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Movies;
