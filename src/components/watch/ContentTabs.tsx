
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recommendations } from "./Recommendations";
import { Movie } from "@/utils/movieData";

interface ContentTabsProps {
  movie: Movie;
}

export const ContentTabs = ({ movie }: ContentTabsProps) => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
        <TabsTrigger value="about">عن الفيلم</TabsTrigger>
        <TabsTrigger value="details">تفاصيل</TabsTrigger>
        <TabsTrigger value="similar">أفلام مشابهة</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">ملخص</h3>
          <p className="text-gray-300">{movie.description}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="details">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 mb-1">السنة</p>
              <p className="font-bold">{movie.year}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">المدة</p>
              <p className="font-bold">{movie.duration}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">النوع</p>
              <p className="font-bold">{movie.type === "movie" ? "فيلم" : "مسلسل"}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">الجودة</p>
              <p className="font-bold">{movie.quality}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-400 mb-2">التصنيف</p>
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre: string, index: number) => (
                <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-400 mb-2">التقييم</p>
            <div className="flex items-center">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                {movie.rating.toFixed(1)}
              </span>
              <span className="text-gray-400 ml-2">/ 10</span>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="similar">
        <Recommendations movie={movie} />
      </TabsContent>
    </Tabs>
  );
};
