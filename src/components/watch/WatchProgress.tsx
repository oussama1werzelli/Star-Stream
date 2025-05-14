
import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getMovieById, Movie } from "@/utils/movieData";

interface WatchProgress {
  id: string;
  contentId: string;
  progress: number;
  timestamp: string;
  duration: number;
}

interface WatchProgressProps {
  userId: string;
  maxItems?: number;
}

export const WatchProgress = ({ userId, maxItems = 6 }: WatchProgressProps) => {
  const [progressItems, setProgressItems] = useState<Array<WatchProgress & { content: Movie | null }>>([]);
  
  useEffect(() => {
    if (!userId) return;
    
    const progressKey = `watch_progress_${userId}`;
    const progressList: WatchProgress[] = JSON.parse(localStorage.getItem(progressKey) || '[]');
    
    // Get the content details for each progress item
    const detailedItems = progressList.slice(0, maxItems).map(item => ({
      ...item,
      content: getMovieById(item.contentId)
    }));
    
    setProgressItems(detailedItems);
  }, [userId, maxItems]);
  
  if (progressItems.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8">
      {progressItems.map((item) => (
        item.content && (
          <Link key={item.id} to={`/watch/${item.contentId}`} className="block">
            <div className="relative group rounded-lg overflow-hidden">
              {/* Poster Image */}
              <div className="aspect-video">
                <img 
                  src={item.content.posterUrl}
                  alt={item.content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay with Play Button */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="h-12 w-12 text-white" />
              </div>
              
              {/* Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-bold truncate">{item.content.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">استئناف المشاهدة</span>
                  <span className="text-xs text-gray-300">
                    {new Date(item.timestamp).toLocaleDateString('ar-EG')}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <Progress value={item.progress} className="h-1 mt-2" />
              </div>
            </div>
          </Link>
        )
      ))}
    </div>
  );
};
