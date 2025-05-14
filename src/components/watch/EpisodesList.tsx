
import { Play } from "lucide-react";
import { Episode } from "../../utils/movieData";

interface EpisodesListProps {
  episodes: Episode[];
  selectedEpisode: Episode | null;
  onSelectEpisode: (episode: Episode) => void;
}

export const EpisodesList = ({ episodes, selectedEpisode, onSelectEpisode }: EpisodesListProps) => {
  if (!episodes || episodes.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">الحلقات</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {episodes.map((episode) => (
          <div 
            key={episode.id} 
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedEpisode?.id === episode.id ? 'border-blue-500' : 'border-gray-800'}`}
            onClick={() => onSelectEpisode(episode)}
          >
            <div className="relative aspect-video">
              <img 
                src={episode.thumbnailUrl} 
                alt={episode.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="p-2 bg-gray-800">
              <p className="font-bold text-sm truncate">{episode.title}</p>
              <p className="text-gray-400 text-xs">{episode.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
