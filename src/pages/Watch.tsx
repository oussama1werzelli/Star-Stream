
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, addToWatchHistory, Episode, Movie } from "../utils/movieData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { VideoPlayer } from "../components/watch/VideoPlayer";
import { ActionButtons } from "../components/watch/ActionButtons";
import { EpisodesList } from "../components/watch/EpisodesList";
import { ContentTabs } from "../components/watch/ContentTabs";
import { useWatchProgress } from "../hooks/use-watch-progress";
import { Progress } from "@/components/ui/progress";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { isLoggedIn } = useAuth();
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const { progress, isLoading: progressLoading } = useWatchProgress(id || '');

  useEffect(() => {
    if (id) {
      const foundMovie = getMovieById(id);
      if (foundMovie) {
        setMovie(foundMovie);
        
        // Set first episode if it's a series
        if (foundMovie.type === 'series' && foundMovie.episodes && foundMovie.episodes.length > 0) {
          setSelectedEpisode(foundMovie.episodes[0]);
        }
        
        // Add to watch history if user is logged in
        if (isLoggedIn) {
          addToWatchHistory(id);
        }
      }
    }
  }, [id, isLoggedIn]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin h-12 w-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full"></div>
          <p className="mr-4">جاري التحميل...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-16">
        <div className="w-full bg-gray-900 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
              {movie.originalTitle && (
                <p className="text-gray-400 text-sm md:text-base">{movie.originalTitle}</p>
              )}
            </div>
            
            {/* Video player */}
            <VideoPlayer 
              videoUrl={movie.videoUrl} 
              title={movie.title} 
              type={movie.type} 
              selectedEpisode={selectedEpisode}
              posterUrl={movie.posterUrl}
              contentId={id || ''}
              duration={movie.duration ? parseInt(movie.duration) : 0}
            />
            
            {progress > 0 && progress < 100 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>المشاهدة</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-1 w-full bg-gray-700" 
                />
              </div>
            )}
            
            {/* Action buttons */}
            <ActionButtons 
              movie={movie} 
              isLoggedIn={isLoggedIn} 
              selectedEpisode={selectedEpisode} 
            />
            
            {/* Episodes List (for series) */}
            {movie.type === 'series' && movie.episodes && (
              <EpisodesList 
                episodes={movie.episodes} 
                selectedEpisode={selectedEpisode} 
                onSelectEpisode={setSelectedEpisode} 
              />
            )}
            
            {/* Content tabs */}
            <ContentTabs movie={movie} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Watch;
