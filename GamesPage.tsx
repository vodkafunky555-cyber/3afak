import React from 'react';
import { Game } from '../types';
import GameCard from './GameCard';

interface GamesPageProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const GamesPage: React.FC<GamesPageProps> = ({ games, onGameSelect }) => {
  const gamesList = games.filter(game => game.category === 'game');

  return (
    <div className="px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-bold">Games</h2>
        <button className="text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors">
          Filter
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {gamesList.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            onSelect={onGameSelect}
            variant="horizontal"
          />
        ))}
      </div>
    </div>
  );
};

export default GamesPage;