
import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { searchMovies, Movie } from '../utils/movieData';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    // Debounce search
    const timer = setTimeout(() => {
      const searchResults = searchMovies(query);
      setResults(searchResults);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  if (!isOpen) return null;
  
  const handleResultClick = (id: string) => {
    navigate(`/watch/${id}`);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center pt-20 px-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex items-center">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن فيلم أو مسلسل..."
            className="flex-1 bg-transparent border-none focus:outline-none text-white"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-400">جاري البحث...</div>
          ) : results.length === 0 ? (
            query.trim() ? (
              <div className="p-4 text-center text-gray-400">لا توجد نتائج مطابقة</div>
            ) : null
          ) : (
            <div className="p-2">
              {results.map(result => (
                <div 
                  key={result.id}
                  onClick={() => handleResultClick(result.id)} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                >
                  <img 
                    src={result.posterUrl} 
                    alt={result.title} 
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-white">{result.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{result.year}</span>
                      <span>•</span>
                      <span>{result.type === 'movie' ? 'فيلم' : 'مسلسل'}</span>
                      <span>•</span>
                      <span>{result.quality}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
