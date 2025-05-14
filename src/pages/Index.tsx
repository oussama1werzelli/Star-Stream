import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getNewReleases, getRecommendedMovies, getTrendingMovies, getWatchHistory, Movie, movies } from '../utils/movieData';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const [watchHistory, setWatchHistory] = useState<Movie[]>([]);

  // Get movies for each section
  const featuredMovies = getRecommendedMovies();
  const trendingMovies = getTrendingMovies();
  const newReleases = getNewReleases();

  useEffect(() => {
    if (isLoggedIn) {
      const history = getWatchHistory();
      const historyMovies = history.map(item => 
        movies.find(movie => movie.id === item.movieId)
      ).filter(Boolean) as Movie[];
      
      setWatchHistory(historyMovies);
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <Hero featuredContent={featuredMovies} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        {isLoggedIn && watchHistory.length > 0 && (
          <ContentRow title="متابعة المشاهدة" items={watchHistory} />
        )}
        
        <ContentRow title="أحدث الأفلام" items={newReleases} />
        
        <ContentRow title="الأكثر مشاهدة" items={trendingMovies} />
        
        <ContentRow title="أفلام مقترحة لك" items={featuredMovies} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
