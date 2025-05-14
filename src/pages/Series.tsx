
import { useState, useMemo } from "react";
import { movies } from "../utils/movieData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

const Series = () => {
  const [genre, setGenre] = useState<string | null>(null);
  
  // Filter series by type and selected genre
  const filteredSeries = useMemo(() => {
    let filtered = movies.filter(movie => movie.type === "series");
    
    if (genre) {
      filtered = filtered.filter(movie => movie.genre.includes(genre));
    }
    
    return filtered;
  }, [genre]);
  
  // Get unique genres from all series
  const genres = useMemo(() => {
    const allGenres = movies
      .filter(movie => movie.type === "series")
      .flatMap(movie => movie.genre);
    return [...new Set(allGenres)];
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">مسلسلات</h1>
        
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
        
        {/* Series grid */}
        {filteredSeries.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-400">لا توجد مسلسلات متاحة في هذا التصنيف</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredSeries.map(series => (
              <MovieCard
                key={series.id}
                id={series.id}
                title={series.title}
                posterUrl={series.posterUrl}
                year={series.year}
                quality={series.quality}
                rating={series.rating}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Series;
