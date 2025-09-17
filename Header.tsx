import React from 'react';
import { Search, Crown, X } from 'lucide-react';
import { Game } from '../types';

interface HeaderProps {
  showCrown?: boolean;
  games?: Game[];
  onGameSelect?: (game: Game) => void;
}

const Header: React.FC<HeaderProps> = ({ showCrown = false, games = [], onGameSelect }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Game[]>([]);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    
    // Search algorithm with relevance scoring
    const results = games
      .map(game => {
        const titleMatch = game.title.toLowerCase().includes(query.toLowerCase());
        const descMatch = game.description.toLowerCase().includes(query.toLowerCase());
        const tagMatch = game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        const categoryMatch = game.category.toLowerCase().includes(query.toLowerCase());
        
        // Calculate relevance score
        let score = 0;
        if (titleMatch) score += 10; // Title matches are most important
        if (game.title.toLowerCase().startsWith(query.toLowerCase())) score += 5; // Starts with query
        if (tagMatch) score += 3; // Tag matches
        if (categoryMatch) score += 2; // Category matches
        if (descMatch) score += 1; // Description matches
        if (game.featured) score += 1; // Boost featured games slightly
        
        return { game, score };
      })
      .filter(item => item.score > 0) // Only include matches
      .sort((a, b) => {
        // Sort by score (descending), then by rating (descending)
        if (b.score !== a.score) return b.score - a.score;
        return b.game.rating - a.game.rating;
      })
      .map(item => item.game)
      .slice(0, 6); // Limit to 6 results
    
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchActive(false);
  };

  const handleGameClick = (game: Game) => {
    if (onGameSelect) {
      onGameSelect(game);
      clearSearch();
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'MOD':
        return 'bg-red-500';
      case 'PREMIUM':
        return 'bg-purple-500';
      case 'UNLOCKED':
        return 'bg-green-500';
      case 'FREE':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      <header className="bg-slate-900 sticky top-0 z-50 px-4 py-3 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">king</span>
            </div>
            <h1 className="text-white font-bold text-xl">KingsMod</h1>
          </div>
          
          <div className="flex-1 mx-4 max-w-md relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games & apps..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-slate-800 text-white placeholder-gray-400 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          {showCrown && (
            <Crown className="text-yellow-400 w-6 h-6" />
          )}
        </div>
      </header>

      {/* Search Results Overlay */}
      {isSearchActive && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={clearSearch}>
          <div className="bg-slate-900 mt-16 mx-4 rounded-lg shadow-xl max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {searchResults.length > 0 ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Search Results ({searchResults.length})</h3>
                  <button onClick={clearSearch} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {searchResults.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleGameClick(game)}
                      className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
                    >
                      <img 
                        src={game.icon} 
                        alt={game.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{game.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {game.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className={`${getTagColor(tag)} text-white text-xs px-2 py-0.5 rounded-full`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-gray-400 text-sm capitalize">{game.category}</span>
                          <span className="text-gray-400 text-sm">★ {game.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">No results found</h3>
                <p className="text-gray-400 text-sm">Try searching for different keywords</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;