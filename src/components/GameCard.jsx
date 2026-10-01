import React from 'react';
import { Play, Heart, Star } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onSelectGame
}) => {
  return (
    <div
      onClick={() => onSelectGame(game)}
      className="group relative flex flex-col bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      {/* Visual Thumbnail Area */}
      <div
        className="relative w-full aspect-16/10 flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 120%, ${game.color || '#334155'}44 0%, #0f172a 100%)`
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* Thematic Visual Icon / Display Title */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl shadow-lg border border-white/10 mb-2 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: game.color || '#475569',
              color: '#ffffff'
            }}
          >
            {game.title.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
            {game.category}
          </span>
        </div>

        {/* Hover Quick-Play Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="w-4 h-4 fill-current" />
            <span>PLAY NOW</span>
          </div>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isFavorite
              ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
              : 'bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-950/70'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
          <span>{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-0.5 text-amber-400 font-mono">
            <Star className="w-3 h-3 fill-current inline" />
            {Number(game.rating).toFixed(1)}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono tabular-nums">{Number(game.plays).toLocaleString()} plays</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
          {game.title}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
    </div>
  );
};
