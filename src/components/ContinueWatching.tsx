
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWatchProgress } from "@/hooks/use-watch-progress";
import { useAuth } from "@/contexts/AuthContext";
import { Play, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/utils/dateUtils";

interface ContinueWatchingItem {
  id: string;
  contentId: string;
  progress: number;
  timestamp: string;
  title?: string;
  posterUrl?: string;
  currentTime?: number;
  duration?: number;
}

const ContinueWatching = () => {
  const [watchItems, setWatchItems] = useState<ContinueWatchingItem[]>([]);
  const { isLoggedIn } = useAuth();
  const { getAllProgress, clearProgress } = useWatchProgress("");
  
  useEffect(() => {
    if (isLoggedIn) {
      const items = getAllProgress();
      setWatchItems(items.filter(item => item.progress < 98 && item.progress > 0).slice(0, 10));
    }
  }, [isLoggedIn, getAllProgress]);

  const handleRemove = (e: React.MouseEvent, contentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    clearProgress(contentId);
    setWatchItems(prev => prev.filter(item => item.contentId !== contentId));
    toast({
      title: "تمت الإزالة",
      description: "تم إزالة العنصر من قائمة المشاهدة المستمرة",
    });
  };

  if (!isLoggedIn || watchItems.length === 0) return null;

  return (
    <div className="py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">استكمال المشاهدة</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {watchItems.map((item) => (
          <Link 
            key={item.id} 
            to={`/watch/${item.contentId}`}
            className="relative group"
          >
            <div className="relative aspect-video rounded-md overflow-hidden">
              <img 
                src={item.posterUrl || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"} 
                alt={item.title || "Continue watching"} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12 text-white" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleRemove(e, item.contentId)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                <Progress value={item.progress} className="h-1 w-full bg-gray-700" />
              </div>
            </div>
            <div className="mt-2">
              <p className="font-medium text-sm truncate">{item.title || "استئناف المشاهدة"}</p>
              <p className="text-xs text-gray-400">
                {formatTimeAgo(new Date(item.timestamp))}
                {item.currentTime && item.duration ? ` • ${Math.floor(item.currentTime / 60)}:${Math.floor(item.currentTime % 60).toString().padStart(2, '0')} من ${Math.floor(item.duration / 60)}:${Math.floor(item.duration % 60).toString().padStart(2, '0')}` : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
