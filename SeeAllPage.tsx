import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Game } from '../types';
import GameCard from './GameCard';

interface SeeAllPageProps {
  title: string;
  games: Game[];
  onGameSelect: (game: Game) => void;
  onBack: () => void;
}

const SeeAllPage: React.FC<SeeAllPageProps> = ({ title, games, onGameSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 z-10">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white text-xl font-bold">{title}</h1>
          <span className="text-gray-400 text-sm">({games.length} items)</span>
        </div>
      </div>
      
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onSelect={onGameSelect}
              variant="horizontal"
            />
          ))}
        </div>
        
        {games.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No items found</div>
            <div className="text-gray-500 text-sm">Try browsing other categories</div>
          </div>
        )}
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default SeeAllPage;