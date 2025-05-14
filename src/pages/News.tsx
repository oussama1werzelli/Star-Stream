
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { newsService, NewsItem } from "../utils/newsService";
import { CalendarIcon, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const loadNews = async () => {
    setLoading(true);
    try {
      const latestNews = await newsService.fetchLatestNews();
      setNews(latestNews);
    } catch (error) {
      console.error("Failed to load news", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await newsService.searchNews(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults([]);
    }
  };

  const handleRefresh = () => {
    loadNews();
  };

  const displayedNews = isSearching ? searchResults : news;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">أخبار السينما والمسلسلات</h1>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="ابحث في الأخبار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
            <Button onClick={handleSearch}>بحث</Button>
          </div>
          {isSearching && (
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                نتائج البحث: {searchResults.length} أخبار
              </p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setIsSearching(false);
                }}
              >
                العودة لجميع الأخبار
              </Button>
            </div>
          )}
        </div>
        
        {selectedNews ? (
          <div className="mb-8">
            <button 
              onClick={() => setSelectedNews(null)}
              className="mb-4 text-blue-500 hover:text-blue-400 flex items-center"
            >
              ← العودة للأخبار
            </button>
            
            <Card className="bg-gray-900 border-gray-800">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <CardTitle className="text-xl md:text-2xl text-white">{selectedNews.title}</CardTitle>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {new Date(selectedNews.date).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                {selectedNews.source && (
                  <p className="text-sm text-gray-400">المصدر: {selectedNews.source}</p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 whitespace-pre-line">{selectedNews.content}</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              // Skeleton loading
              Array(4).fill(null).map((_, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <div className="aspect-video w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))
            ) : displayedNews.length > 0 ? (
              // Actual news items
              displayedNews.map((item) => (
                <Card 
                  key={item.id} 
                  className="bg-gray-900 border-gray-800 cursor-pointer hover:border-gray-600 transition-colors"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <CardTitle className="text-lg md:text-xl text-white">{item.title}</CardTitle>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-400">
                          {new Date(item.date).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    {item.source && (
                      <p className="text-xs text-gray-400">المصدر: {item.source}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 line-clamp-3">{item.summary}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center py-12">
                <p className="text-gray-400 mb-4">لا توجد أخبار متاحة حاليًا</p>
                <Button onClick={handleRefresh}>تحديث الصفحة</Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default News;
