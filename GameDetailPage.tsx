import React from 'react';
import { ArrowLeft, Star, Download, Users, Calendar } from 'lucide-react';
import { Game } from '../types';
import LoadingPopup from './LoadingPopup';
import DownloadForm from './DownloadForm';

interface GameDetailPageProps {
  game: Game;
  onBack: () => void;
}

const GameDetailPage: React.FC<GameDetailPageProps> = ({ game, onBack }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleDownload = () => {
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

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative">
        <img 
          src={game.bannerImage} 
          alt={game.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <div className="flex items-start space-x-4">
            <img 
              src={game.icon} 
              alt={game.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {game.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className={`${getTagColor(tag)} text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">{game.title}</h1>
              <div className="flex items-center space-x-4 text-gray-300 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{game.rating}</span>
                </div>
                <span>{game.size}</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{game.downloads}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleDownload}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 mt-6 transition-colors"
            disabled={showLoading}
          >
            <Download className="w-5 h-5" />
            <span>Download Now</span>
          </button>
        </div>
      </div>
      
      <div className="px-4 mt-6 space-y-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed">
            {game.description}
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Experience the ultimate gaming adventure with stunning graphics, immersive gameplay, and exciting challenges. This premium version includes all features unlocked, unlimited resources, and ad-free experience.
          </p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Size</span>
              <span className="text-white">{game.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Downloads</span>
              <span className="text-white">{game.downloads}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rating</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white">{game.rating}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Category</span>
              <span className="text-white capitalize">{game.category}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-20" />
      
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

export default GameDetailPage;