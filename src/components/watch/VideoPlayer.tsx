
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, AlertCircle, Volume2, Pause, Maximize } from "lucide-react";
import { Episode } from "../../utils/movieData";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import useImageFallback from "@/hooks/use-image-fallback";
import { useWatchProgress } from "@/hooks/use-watch-progress";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  episodeTitle?: string;
  type: 'movie' | 'series';
  selectedEpisode: Episode | null;
  posterUrl?: string;
  contentId: string;
  duration?: number;
}

export const VideoPlayer = ({ 
  videoUrl, 
  title, 
  episodeTitle, 
  type, 
  selectedEpisode,
  posterUrl,
  contentId,
  duration = 0
}: VideoPlayerProps) => {
  const [isVideoError, setIsVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration || 0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  const { isLoggedIn } = useAuth();
  const { progress, updateProgress } = useWatchProgress(contentId, totalDuration);
  const progressCheckInterval = useRef<number | null>(null);
  const { imgSrc } = useImageFallback(
    posterUrl || 
    (selectedEpisode?.thumbnailUrl) || 
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  );

  // Setup message listeners for iframe communication
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        // Handle progress updates from the video player
        if ('currentTime' in event.data && 'duration' in event.data) {
          const { currentTime, duration } = event.data;
          setCurrentTime(currentTime);
          setTotalDuration(duration || 0);
          
          if (duration > 0) {
            const progressPercent = Math.round((currentTime / duration) * 100);
            updateProgress(progressPercent);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [updateProgress]);

  // Simulate progress updates for demo purposes
  // In a real implementation, this would come from the video player API
  useEffect(() => {
    if (isLoggedIn && !isVideoError && !isLoading && isPlaying && progress < 100) {
      // Clear any existing interval
      if (progressCheckInterval.current) {
        window.clearInterval(progressCheckInterval.current);
      }
      
      // Start a new progress tracking interval
      progressCheckInterval.current = window.setInterval(() => {
        // Simulate progress increasing by 1% every 3 seconds when playing
        updateProgress(Math.min(progress + 1, 99)); // Never reach 100% automatically
        setCurrentTime(prev => prev + 3); // Increment by 3 seconds
      }, 3000);
    } else if (!isPlaying && progressCheckInterval.current) {
      window.clearInterval(progressCheckInterval.current);
    }
    
    return () => {
      if (progressCheckInterval.current) {
        window.clearInterval(progressCheckInterval.current);
      }
    };
  }, [isLoggedIn, isVideoError, isLoading, progress, updateProgress, isPlaying]);

  // Try to resume from saved position
  useEffect(() => {
    if (progress > 0 && progress < 95 && videoRef.current && !isLoading) {
      try {
        // For a real implementation, you'd use the video player's API to set the current time
        const resumeTime = (progress / 100) * totalDuration;
        setCurrentTime(resumeTime);
        
        toast({
          title: "استئناف المشاهدة",
          description: `جاري استئناف المشاهدة من ${Math.floor(resumeTime / 60)}:${Math.floor(resumeTime % 60).toString().padStart(2, '0')}`,
        });
      } catch (error) {
        console.error("Failed to set video time:", error);
      }
    }
  }, [progress, isLoading, totalDuration]);

  const handleVideoError = () => {
    setIsVideoError(true);
    setIsPlaying(false);
    toast({
      title: "خطأ في تشغيل الفيديو",
      description: "تعذر تحميل الفيديو، يرجى المحاولة مرة أخرى لاحقًا",
      variant: "destructive"
    });
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    toast({
      title: "تم تحميل الفيديو",
      description: "استمتع بالمشاهدة!",
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you'd use the video player's API to play/pause
    if (!isPlaying) {
      toast({
        title: "تشغيل",
        description: "تم تشغيل الفيديو",
      });
    } else {
      toast({
        title: "إيقاف",
        description: "تم إيقاف الفيديو مؤقتًا",
      });
    }
  };

  const handleFullScreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVideoSource = () => {
    if (type === 'movie' && videoUrl) {
      return videoUrl;
    } else if (selectedEpisode?.videoUrl) {
      return selectedEpisode.videoUrl;
    }
    return null;
  };

  const videoSource = getVideoSource();

  return (
    <div 
      className="mb-6 rounded-lg overflow-hidden bg-black shadow-xl" 
      ref={videoContainerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <AspectRatio ratio={16 / 9}>
        {videoSource && !isVideoError ? (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin mb-4"></div>
                  <p className="text-gray-400">جاري تحميل الفيديو...</p>
                </div>
              </div>
            )}
            <iframe
              ref={videoRef}
              src={videoSource}
              allowFullScreen
              className="w-full h-full"
              title={type === 'movie' ? title : `${title} - ${selectedEpisode?.title}`}
              onLoad={handleVideoLoad}
              onError={handleVideoError}
            ></iframe>
            
            {/* Custom video controls overlay */}
            {!isLoading && (showControls || !isPlaying) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
                <div className="p-4 space-y-2">
                  {/* Progress bar */}
                  <div className="relative h-1 bg-gray-600 w-full rounded overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={togglePlay} 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(totalDuration)}
                      </span>
                    </div>
                    
                    <div>
                      <Button 
                        onClick={handleFullScreen} 
                        variant="ghost" 
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 relative">
            <img 
              src={imgSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="text-center z-10 relative bg-black/50 p-6 rounded-lg">
              {isVideoError ? (
                <>
                  <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
                  <p className="text-lg mb-2">حدث خطأ في تحميل الفيديو</p>
                  <p className="text-gray-400">يرجى المحاولة مرة أخرى لاحقًا</p>
                </>
              ) : (
                <>
                  <Play className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                  <p className="text-lg mb-2">عرض الفيلم غير متاح حالياً</p>
                  <p className="text-gray-400">هذه نسخة تجريبية من المنصة</p>
                </>
              )}
            </div>
          </div>
        )}
      </AspectRatio>
    </div>
  );
};
