import React from 'react';
import { Game } from '../types';
import FeaturedBanner from './FeaturedBanner';
import GameCard from './GameCard';

interface DiscoverPageProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
  onSeeAll: (category: string, games: Game[]) => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ games, onGameSelect, onSeeAll }) => {
  const featuredGame = games.find(game => game.featured);
  const newGames = games
    .filter(game => !game.featured)
    .sort((a, b) => {
      // Sort by rating (descending), then by downloads
      if (b.rating !== a.rating) return b.rating - a.rating;
      const aDownloads = parseFloat(a.downloads.replace(/[^\d.]/g, ''));
      const bDownloads = parseFloat(b.downloads.replace(/[^\d.]/g, ''));
      return bDownloads - aDownloads;
    });

  const trendingGames = games
    .filter(game => !game.featured)
    .sort((a, b) => {
      // Sort by downloads (descending), then by rating
      const aDownloads = parseFloat(a.downloads.replace(/[^\d.]/g, ''));
      const bDownloads = parseFloat(b.downloads.replace(/[^\d.]/g, ''));
      if (bDownloads !== aDownloads) return bDownloads - aDownloads;
      return b.rating - a.rating;
    });

  const handleSeeAllNew = () => {
    onSeeAll('New Games', newGames);
  };

  const handleSeeAllTrending = () => {
    onSeeAll('Trending Now', trendingGames);
  };

  return (
    <div className="space-y-6">
      {featuredGame && (
        <div className="px-4">
          <FeaturedBanner game={featuredGame} onSelect={onGameSelect} />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-white text-xl font-bold">New Games</h2>
          <button 
            onClick={handleSeeAllNew}
            className="text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors"
          >
            See All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {newGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onSelect={onGameSelect}
                variant="horizontal"
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-white text-xl font-bold">Trending Now</h2>
          <button 
            onClick={handleSeeAllTrending}
            className="text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors"
          >
            See All
          </button>
        </div>
        
        <div className="px-4 space-y-3">
          {trendingGames.slice(0, 3).map((game) => (
            <GameCard 
              key={`trending-${game.id}`} 
              game={game} 
              onSelect={onGameSelect}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;