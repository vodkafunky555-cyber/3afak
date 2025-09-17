import React from 'react';
import { Download, Zap } from 'lucide-react';

interface LoadingPopupProps {
  isVisible: boolean;
  progress: number;
  gameTitle: string;
  onComplete: () => void;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ 
  isVisible, 
  progress, 
  gameTitle, 
  onComplete 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Download className="w-8 h-8 text-white animate-bounce" />
          </div>
          <h3 className="text-white text-xl font-bold mb-2">Preparing Download</h3>
          <p className="text-gray-300 text-sm truncate">{gameTitle}</p>
        </div>

        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={339.292}
              strokeDashoffset={339.292 - (339.292 * progress) / 100}
              className="text-teal-400 transition-all duration-100 ease-out"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Progress text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {progress}%
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                Loading
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">
              {progress < 30 && "Initializing download..."}
              {progress >= 30 && progress < 60 && "Connecting to server..."}
              {progress >= 60 && progress < 90 && "Preparing files..."}
              {progress >= 90 && "Almost ready..."}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-100 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;