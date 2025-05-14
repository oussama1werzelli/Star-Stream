
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MovieCard from "./MovieCard";

interface ContentRowProps {
  title: string;
  items: {
    id: string;
    title: string;
    posterUrl: string;
    year: string;
    quality?: string;
    rating?: number;
    downloadUrl?: string;
  }[];
}

const ContentRow = ({ title, items }: ContentRowProps) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        <a href="#" className="text-blue-500 hover:text-blue-400 text-sm">
          عرض المزيد
        </a>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <MovieCard
                id={item.id}
                title={item.title}
                posterUrl={item.posterUrl}
                year={item.year}
                quality={item.quality}
                rating={item.rating}
                downloadUrl={item.downloadUrl}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default ContentRow;
