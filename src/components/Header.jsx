import React, { useState } from 'react';
import { Shield, Plus, Code, EyeOff } from 'lucide-react';

export const Header = ({
  currentCategory,
  onSelectCategory,
  onOpenAddModal,
  onOpenJsonModal,
  onTriggerPanic,
  tabCloak,
  onSetTabCloak
}) => {
  const [showCloakMenu, setShowCloakMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectCategory('All')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors font-display">
            Apex Arcade
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('All')}
            className={`cursor-pointer transition-colors hover:text-white ${
              currentCategory === 'All' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => onSelectCategory('Arcade')}
            className={`cursor-pointer transition-colors hover:text-white ${
              currentCategory === 'Arcade' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => onSelectCategory('Retro')}
            className={`cursor-pointer transition-colors hover:text-white ${
              currentCategory === 'Retro' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Retro
          </button>
          <button
            onClick={() => onSelectCategory('Puzzle')}
            className={`cursor-pointer transition-colors hover:text-white ${
              currentCategory === 'Puzzle' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Puzzles
          </button>
          <button
            onClick={onOpenJsonModal}
            className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-sky-400 transition-colors"
          >
            <Code className="w-4 h-4" />
            <span>JSON Database</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Tab Cloaker quick selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowCloakMenu(!showCloakMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Disguise browser tab"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Cloak: {tabCloak}</span>
            </button>
            {showCloakMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 text-xs z-50">
                <button
                  onClick={() => { onSetTabCloak('default'); setShowCloakMenu(false); }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Standard (Apex Arcade)
                </button>
                <button
                  onClick={() => { onSetTabCloak('classroom'); setShowCloakMenu(false); }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Google Classroom
                </button>
                <button
                  onClick={() => { onSetTabCloak('docs'); setShowCloakMenu(false); }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Google Docs
                </button>
                <button
                  onClick={() => { onSetTabCloak('khan'); setShowCloakMenu(false); }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Khan Academy
                </button>
              </div>
            )}
          </div>

          {/* Add Game Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* Panic Button */}
          <button
            onClick={onTriggerPanic}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-rose-700 hover:bg-rose-600 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-rose-900/40"
            title="Press Esc to trigger panic disguise"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Panic [Esc]</span>
          </button>
        </div>

      </div>
    </header>
  );
};
