import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';

interface AppsPageProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const AppsPage: React.FC<AppsPageProps> = ({ games, onGameSelect }) => {
  const appsList = games.filter(game => game.category === 'app');

  return (
    <div className="px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold">Apps</h2>
        <button className="text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors">
          Filter
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {appsList.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            onSelect={onGameSelect}
            variant="grid"
          />
        ))}
      </div>
    </div>
  );
};

export default AppsPage;