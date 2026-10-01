import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_GAMES } from './data/defaultGames.js';
import { Header } from './components/Header.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { PanicScreen } from './components/PanicScreen.jsx';
import {
  Search,
  Shuffle,
  Heart,
  SlidersHorizontal,
  Flame,
  Gamepad2,
  HelpCircle,
  FileCode
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Arcade',
  'Puzzle',
  'Action',
  'Retro',
  'Sports',
  'Casual',
  'Favorites'
];

export default function App() {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('apex_games_catalog');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return DEFAULT_GAMES;
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [tabCloak, setTabCloak] = useState('default');

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_favorites');
      return saved ? JSON.parse(saved) : ['tetris', 'snake', '2048'];
    } catch {
      return ['tetris', 'snake', '2048'];
    }
  });

  // Attempt to load from /games.json on initial load
  useEffect(() => {
    fetch('/games.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load games.json');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // If no custom local edits, sync with games.json
          const hasLocalEdits = localStorage.getItem('apex_games_catalog');
          if (!hasLocalEdits) {
            setGames(data);
          }
        }
      })
      .catch(err => {
        console.warn('Loading fallback default games:', err);
      });
  }, []);

  // Update tab title and favicon based on tab cloaking preset
  useEffect(() => {
    const titleEl = document.querySelector('title');
    if (!titleEl) return;

    if (isPanicMode) {
      document.title = 'AP World History: Unit 5 Study Companion';
      return;
    }

    if (tabCloak === 'classroom') {
      document.title = 'Classes - Google Classroom';
    } else if (tabCloak === 'docs') {
      document.title = 'Untitled document - Google Docs';
    } else if (tabCloak === 'khan') {
      document.title = 'Dashboard | Khan Academy';
    } else {
      if (selectedGame) {
        document.title = `${selectedGame.title} - Apex Arcade`;
      } else {
        document.title = 'Apex Arcade - Unblocked Games Hub';
      }
    }
  }, [tabCloak, isPanicMode, selectedGame]);

  // Global keydown listener for Panic button (Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPanicMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('apex_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleAddGame = (newGame) => {
    const updated = [newGame, ...games];
    setGames(updated);
    localStorage.setItem('apex_games_catalog', JSON.stringify(updated));
    setSelectedGame(newGame);
  };

  const handleImportJson = (imported) => {
    setGames(imported);
    localStorage.setItem('apex_games_catalog', JSON.stringify(imported));
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('apex_games_catalog');
    setGames(DEFAULT_GAMES);
  };

  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    setSelectedGame(games[randomIndex]);
  };

  // Filtered and sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter(game => {
        // Category filter
        if (currentCategory === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (currentCategory !== 'All' && game.category !== currentCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          const matchTags = game.tags && game.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.plays - a.plays;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, currentCategory, searchQuery, sortBy, favorites]);

  // Featured games (top 3)
  const featuredGames = useMemo(() => {
    return games.filter(g => g.featured).slice(0, 3);
  }, [games]);

  if (isPanicMode) {
    return <PanicScreen onExit={() => setIsPanicMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSelectedGame(null);
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onTriggerPanic={() => setIsPanicMode(true)}
        tabCloak={tabCloak}
        onSetTabCloak={setTabCloak}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {selectedGame ? (
          <GamePlayer
            game={selectedGame}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedGame(null)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            
            {/* Hero & Search Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                    Unblocked Arcade
                  </h1>
                  <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">
                    Lightweight, self-contained HTML5 games embedded via JSON iframe configs.
                    No tracking, zero ads, instant launch.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRandomGame}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-500/20 whitespace-nowrap"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Random Game</span>
                  </button>

                  <button
                    onClick={() => setIsJsonModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <FileCode className="w-4 h-4 text-sky-400" />
                    <span>View games.json</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by title, tag, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort Option */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="title">Alphabetical (A-Z)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Interactive Category Segmented Filter Controls */}
              <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map(cat => {
                  const isActive = currentCategory === cat;
                  const count = cat === 'Favorites'
                    ? favorites.length
                    : cat === 'All'
                    ? games.length
                    : games.filter(g => g.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setCurrentCategory(cat)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                      }`}
                    >
                      {cat === 'Favorites' && <Heart className={`w-3 h-3 ${isActive ? 'fill-current' : ''}`} />}
                      <span>{cat}</span>
                      <span className={`text-[10px] tabular-nums ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Showcase (Only on All category without active search) */}
            {currentCategory === 'All' && !searchQuery && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Featured Highlights
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {featuredGames.map(game => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelectGame={setSelectedGame}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Catalog Grid Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-sky-400" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    {currentCategory === 'All' ? 'All Games' : `${currentCategory} Collection`}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  Showing {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
                </span>
              </div>

              {filteredGames.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center">
                  <HelpCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-300">No games found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    {currentCategory === 'Favorites'
                      ? 'You have not added any favorites yet. Click the heart icon on any game card to bookmark it!'
                      : `No titles match "${searchQuery}". Try a different keyword or reset filters.`}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentCategory('All');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredGames.map(game => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelectGame={setSelectedGame}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Educational / JSON Architecture Footer Note */}
            <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500">
              <div>
                <h4 className="font-bold text-slate-400 mb-1">JSON-Driven Architecture</h4>
                <p className="leading-relaxed">
                  Every game record is declared in <code className="text-amber-400 font-mono">/public/games.json</code> with
                  its sandboxed iframe source, metadata, controls, and aspect ratio.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-400 mb-1">Offline &amp; Unblocked Ready</h4>
                <p className="leading-relaxed">
                  All 12 retro games run self-contained HTML5 canvases with synthesized Web Audio API sounds.
                  Zero external server dependencies or cross-origin blocking.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-400 mb-1">Stealth &amp; Cloaking</h4>
                <p className="leading-relaxed">
                  Equipped with instant tab disguises (Google Classroom, Docs, Khan Academy) and a panic hotkey (<code className="text-amber-400 font-mono">Esc</code>).
                </p>
              </div>
            </div>

          </div>
        )}
      </main>

      {/* JSON Database Modal */}
      <JsonManagerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onResetToDefault={handleResetToDefault}
        onImportJson={handleImportJson}
      />

      {/* Add Custom Game Modal */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />
    </div>
  );
}
