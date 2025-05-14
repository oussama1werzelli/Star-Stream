
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface HeroProps {
  featuredContent: {
    id: string;
    title: string;
    description: string;
    backdropUrl: string;
    type: 'movie' | 'series';
    year: string;
  }[];
}

const Hero = ({ featuredContent }: HeroProps) => {
  return (
    <div className="w-full bg-gradient-to-b from-black/80 to-black relative pt-16">
      <Carousel className="w-full">
        <CarouselContent>
          {featuredContent.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative h-[60vh] md:h-[70vh] w-full">
                <div className="absolute inset-0">
                  <img
                    src={item.backdropUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col justify-center h-full max-w-3xl px-8 space-y-4 text-right">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{item.title}</h1>
                  <p className="text-gray-300 text-sm md:text-base line-clamp-3">{item.description}</p>
                  <div className="flex space-x-4 justify-end">
                    <Link to={`/watch/${item.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Play className="h-4 w-4" />
                        شاهد الآن
                      </Button>
                    </Link>
                    <Link to={`/details/${item.id}`}>
                      <Button variant="outline" className="text-white border-white hover:bg-white/20">
                        التفاصيل
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center justify-end gap-4 text-sm text-gray-400">
                    <span>{item.year}</span>
                    <span className="capitalize">{item.type === 'movie' ? 'فيلم' : 'مسلسل'}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
