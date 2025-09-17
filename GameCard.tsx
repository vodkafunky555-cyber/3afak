import React from 'react';
import { Star, Download } from 'lucide-react';
import { Game } from '../types';
import LoadingPopup from './LoadingPopup';
import DownloadForm from './DownloadForm';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  variant?: 'horizontal' | 'grid';
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect, variant = 'horizontal' }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowForm(true);
  };

  const handleFormSubmit = (name: string, code: string) => {
    setShowForm(false);
    
    setShowLoading(true);
    setProgress(0);
    
    // Simulate loading from 1 to 100
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          
          // Small delay before opening URL
          setTimeout(() => {
            setShowLoading(false);
            setProgress(0);
            
            // Open URL in new tab
            const newWindow = window.open(game.downloadUrl, '_blank');
            if (!newWindow) {
              // Fallback if popup blocked
              window.location.href = game.downloadUrl;
            }
          }, 500);
          
          return 100;
        }
        return prev + 1;
      });
    }, 150); // 150ms * 100 = 15 seconds total
  };

  const handleFormCancel = () => {
    setShowForm(false);
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

  if (variant === 'grid') {
    return (
      <div 
        onClick={() => onSelect(game)}
        className="bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-start space-x-3">
          <img 
            src={game.icon} 
            alt={game.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">{game.title}</h3>
            <div className="flex items-center space-x-1 mt-1">
              {game.tags.slice(0, 1).map((tag, index) => (
                <span
                  key={index}
                  className={`${getTagColor(tag)} text-white text-xs px-2 py-0.5 rounded-full`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-gray-300 text-xs">{game.rating}</span>
              </div>
              <span className="text-gray-400 text-xs">{game.size}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2 mt-3 flex items-center justify-center space-x-2 transition-colors"
          disabled={showLoading}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Download</span>
        </button>
        
        <DownloadForm
          isVisible={showForm}
          gameTitle={game.title}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
        
        <LoadingPopup 
          isVisible={showLoading}
          progress={progress}
          gameTitle={game.title}
          onComplete={() => setShowLoading(false)}
        />
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelect(game)}
      className="bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors min-w-[280px]"
    >
      <div className="flex items-center space-x-3">
        <img 
          src={game.icon} 
          alt={game.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-white font-medium">{game.title}</h3>
          <div className="flex items-center space-x-1 mt-1">
            {game.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className={`${getTagColor(tag)} text-white text-xs px-2 py-0.5 rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-gray-300 text-sm">{game.rating}</span>
            </div>
            <span className="text-gray-400 text-sm">{game.size}</span>
          </div>
        </div>
        <button 
          onClick={handleDownload}
          className="rounded-full p-3 bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          disabled={showLoading}
        >
          <Download className="w-5 h-5" />
        </button>
        
        <DownloadForm
          isVisible={showForm}
          gameTitle={game.title}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
        
        <LoadingPopup 
          isVisible={showLoading}
          progress={progress}
          gameTitle={game.title}
          onComplete={() => setShowLoading(false)}
        />
      </div>
    </div>
  );
};

export default GameCard;