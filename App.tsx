import React, { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import DiscoverPage from './components/DiscoverPage';
import GamesPage from './components/GamesPage';
import AppsPage from './components/AppsPage';
import GameDetailPage from './components/GameDetailPage';
import SeeAllPage from './components/SeeAllPage';
import { games } from './data/mockData';
import { Game } from './types';

interface SeeAllState {
  title: string;
  games: Game[];
}

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [seeAllState, setSeeAllState] = useState<SeeAllState | null>(null);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBack = () => {
    setSelectedGame(null);
    setSeeAllState(null);
  };

  const handleSeeAll = (title: string, gamesList: Game[]) => {
    setSeeAllState({ title, games: gamesList });
  };

  const renderContent = () => {
    if (selectedGame) {
      return <GameDetailPage game={selectedGame} onBack={handleBack} />;
    }

    if (seeAllState) {
      return (
        <SeeAllPage 
          title={seeAllState.title}
          games={seeAllState.games}
          onGameSelect={handleGameSelect}
          onBack={handleBack}
        />
      );
    }

    switch (activeTab) {
      case 'discover':
        return <DiscoverPage games={games} onGameSelect={handleGameSelect} onSeeAll={handleSeeAll} />;
      case 'games':
        return <GamesPage games={games} onGameSelect={handleGameSelect} />;
      case 'apps':
        return <AppsPage games={games} onGameSelect={handleGameSelect} />;
      default:
        return <DiscoverPage games={games} onGameSelect={handleGameSelect} onSeeAll={handleSeeAll} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {!selectedGame && !seeAllState && (
        <Header 
          showCrown={activeTab === 'discover'} 
          games={games}
          onGameSelect={handleGameSelect}
        />
      )}
      
      <main className={`${!selectedGame && !seeAllState ? 'pt-4 pb-20' : ''}`}>
        {renderContent()}
      </main>
      
      {!selectedGame && !seeAllState && (
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default App;