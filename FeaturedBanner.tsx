import React from 'react';
import { Star, Download } from 'lucide-react';
import { Game } from '../types';
import LoadingPopup from './LoadingPopup';
import DownloadForm from './DownloadForm';

interface FeaturedBannerProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ game, onSelect }) => {
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

  return (
    <div 
      onClick={() => onSelect(game)}
      className="relative bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-[1.02] transition-transform"
    >
      <div className="relative h-48 bg-gradient-to-r from-slate-900 to-slate-700">
        <img 
          src={game.bannerImage} 
          alt={game.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">
              FEATURED
            </span>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-2xl font-bold mb-2">{game.title}</h2>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{game.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-medium">{game.rating}</span>
              </div>
              <span className="text-gray-300 text-sm">{game.size}</span>
            </div>
            <button 
              onClick={handleDownload}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
              disabled={showLoading}
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>
        </div>
      </div>
      
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
};

export default FeaturedBanner;