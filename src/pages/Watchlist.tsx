
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies, Movie } from "../utils/movieData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [historyMovies, setHistoryMovies] = useState<Movie[]>([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favMovies = favorites.map((fav: { id: string }) => 
      movies.find(movie => movie.id === fav.id)
    ).filter(Boolean) as Movie[];
    setFavoriteMovies(favMovies);

    // Get watch history
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      const history = JSON.parse(localStorage.getItem(`watch_history_${currentUser.id}`) || '[]');
      const histMovies = history.map((item: { movieId: string }) => 
        movies.find(movie => movie.id === item.movieId)
      ).filter(Boolean) as Movie[];
      
      setHistoryMovies(histMovies);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">قائمة المشاهدة</h1>
        
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 border-r-4 border-blue-500 pr-3">المفضلة</h2>
          {favoriteMovies.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg">
              <p className="text-gray-400">لا توجد أفلام في المفضلة</p>
              <p className="mt-2 text-sm">أضف أفلامك المفضلة لتظهر هنا</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {favoriteMovies.map(movie => (
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
        
        <div>
          <h2 className="text-xl font-bold mb-6 border-r-4 border-blue-500 pr-3">سجل المشاهدة</h2>
          {historyMovies.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg">
              <p className="text-gray-400">لا توجد أفلام في سجل المشاهدة</p>
              <p className="mt-2 text-sm">ابدأ بمشاهدة الأفلام لتظهر هنا</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {historyMovies.map(movie => (
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
      </div>
      
      <Footer />
    </div>
  );
};

export default Watchlist;
