
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bookmark, Download, Plus, HelpCircle } from "lucide-react";
import { Episode } from "../../utils/movieData";
import { toast } from "@/components/ui/use-toast";

interface ActionButtonsProps {
  movie: {
    id: string;
    title: string;
    posterUrl: string;
    year: string;
    type: 'movie' | 'series';
    downloadUrl?: string;
  };
  isLoggedIn: boolean;
  selectedEpisode: Episode | null;
}

export const ActionButtons = ({ movie, isLoggedIn, selectedEpisode }: ActionButtonsProps) => {
  const handleAddToFavorites = () => {
    if (!isLoggedIn) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يرجى تسجيل الدخول أولاً لإضافة هذا الفيلم إلى المفضلة",
        variant: "destructive",
      });
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Check if already in favorites
    const isInFavorites = favorites.some((fav: any) => fav.id === movie.id);
    
    if (isInFavorites) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast({
        title: "تمت الإزالة من المفضلة",
        description: "تم إزالة هذا العنصر من قائمة المفضلة",
      });
    } else {
      // Add to favorites
      favorites.push({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        year: movie.year
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      toast({
        title: "تمت الإضافة إلى المفضلة",
        description: "تم إضافة هذا العنصر إلى قائمة المفضلة",
      });
    }
  };

  const handleDownload = () => {
    // Handle download link
    const downloadUrl = movie.type === 'movie' ? movie.downloadUrl : selectedEpisode?.downloadUrl;
    
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
      toast({
        title: "جارٍ التحميل",
        description: "بدأ تحميل الملف، يرجى الانتظار",
      });
    } else {
      toast({
        title: "التحميل غير متاح",
        description: "عذرًا، رابط التحميل غير متاح حاليًا",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Button onClick={handleAddToFavorites} variant="outline" className="gap-2">
        <Bookmark className="h-4 w-4" />
        إضافة إلى المفضلة
      </Button>
      <Button onClick={handleDownload} variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        تحميل
      </Button>
      <Link to={`/watchlist`}>
        <Button variant="ghost" className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة إلى قائمة المشاهدة
        </Button>
      </Link>
      <Link to={`/faq`}>
        <Button variant="ghost" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          المساعدة
        </Button>
      </Link>
    </div>
  );
};
