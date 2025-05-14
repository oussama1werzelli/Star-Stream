import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import useImageFallback from '@/hooks/use-image-fallback';
import { toast } from '@/components/ui/use-toast';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  year: string;
  quality?: string;
  rating?: number;
  downloadUrl?: string;
}

const MovieCard = ({ id, title, posterUrl, year, quality = "HD", rating, downloadUrl }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { imgSrc, onError } = useImageFallback(posterUrl);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((fav: { id: string }) => fav.id === id));
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    }
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (isFavorite) {
        const updatedFavorites = favorites.filter((fav: { id: string }) => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        toast({
          title: "تم الإزالة من المفضلة",
          description: `${title} تمت إزالته من قائمة المفضلة.`,
        });
      } else {
        favorites.push({ id, title, posterUrl, year });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        toast({
          title: "تمت الإضافة إلى المفضلة",
          description: `${title} تمت إضافته إلى قائمة المفضلة.`,
        });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites in localStorage:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث قائمة المفضلة.",
        variant: "destructive",
      });
    }
  };

  // Handle download action
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
      toast({
        title: "جارٍ التحميل",
        description: "بدأ تحميل الملف، يرجى الانتظار.",
      });
    } else {
      toast({
        title: "التحميل غير متاح",
        description: "عذرًا، رابط التحميل غير متاح حاليًا.",
        variant: "destructive",
      });
    }
  };

  return (
    <Link to={`/watch/${id}`}>
      <Card className="overflow-hidden border-0 rounded-lg transition-all duration-300 hover:scale-105">
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover"
            onError={onError}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-black/50 ${isFavorite ? 'text-red-500' : 'text-white'}`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500' : ''}`} />
            </Button>
            {/* Download Button */}
            {downloadUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 text-white"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
            )}
          </div>
          {/* Quality Badge */}
          {quality && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              {quality}
            </span>
          )}
          {/* Rating Badge */}
          {rating && (
            <div className="absolute bottom-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
              {rating}
            </div>
          )}
        </div>
        <CardContent className="bg-gray-900 p-3">
          <h3 className="font-bold text-white text-sm truncate">{title}</h3>
          <p className="text-gray-400 text-xs">{year}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
