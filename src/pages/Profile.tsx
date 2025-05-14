
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWatchHistory, movies, Movie } from "../utils/movieData";
import MovieCard from "../components/MovieCard";

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [watchHistory, setWatchHistory] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get watch history
    const history = getWatchHistory();
    const historyMovies = history
      .map(item => movies.find(movie => movie.id === item.movieId))
      .filter(Boolean) as Movie[];
    
    setWatchHistory(historyMovies);

    // Get favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favMovies = favorites
      .map((fav: { id: string }) => movies.find(movie => movie.id === fav.id))
      .filter(Boolean) as Movie[];
    
    setFavoriteMovies(favMovies);
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Info Card */}
          <div className="w-full md:w-1/3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-white">الملف الشخصي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`} />
                    <AvatarFallback className="bg-blue-600">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{user?.username}</h2>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    تسجيل الخروج
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">إحصائيات</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold">{watchHistory.length}</p>
                      <p className="text-sm text-gray-400">مشاهدة</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold">{favoriteMovies.length}</p>
                      <p className="text-sm text-gray-400">مفضلة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Watch History and Favorites Tabs */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 mb-4">
                <TabsTrigger value="history">سجل المشاهدة</TabsTrigger>
                <TabsTrigger value="favorites">المفضلة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history">
                <h2 className="text-xl font-bold mb-4">سجل المشاهدة</h2>
                {watchHistory.length === 0 ? (
                  <div className="text-center py-12 bg-gray-900 rounded-lg">
                    <p className="text-gray-400">لا توجد أفلام في سجل المشاهدة</p>
                    <p className="mt-2 text-sm">ابدأ بمشاهدة الأفلام لتظهر هنا</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {watchHistory.map(movie => (
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
              </TabsContent>
              
              <TabsContent value="favorites">
                <h2 className="text-xl font-bold mb-4">المفضلة</h2>
                {favoriteMovies.length === 0 ? (
                  <div className="text-center py-12 bg-gray-900 rounded-lg">
                    <p className="text-gray-400">لا توجد أفلام في المفضلة</p>
                    <p className="mt-2 text-sm">أضف أفلامك المفضلة لتظهر هنا</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
