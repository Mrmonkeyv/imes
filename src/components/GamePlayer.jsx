import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCw,
  Heart,
  ExternalLink,
  Code,
  Copy,
  Check,
  Keyboard
} from 'lucide-react';

export const GamePlayer = ({
  game,
  isFavorite,
  onToggleFavorite,
  onBack
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [showJsonSnippet, setShowJsonSnippet] = useState(false);
  const containerRef = useRef(null);

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleAboutBlankCloak = () => {
    // Standard unblocked games feature: open about:blank and write iframe into document
    const win = window.open('about:blank', '_blank');
    if (win) {
      const doc = win.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Google Classroom</title>
          <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png">
          <style>
            html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
            iframe { border: none; width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <iframe src="${window.location.origin}${game.iframeSrc}" allowfullscreen></iframe>
        </body>
        </html>
      `);
      doc.close();
    }
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(
      game.iframeCode || `<iframe src="${game.iframeSrc}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`
    );
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Reload Iframe */}
          <button
            onClick={handleReload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Reload game frame"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload</span>
          </button>

          {/* Theater Mode */}
          <button
            onClick={() => setIsTheater(!isTheater)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Toggle theater view"
          >
            {isTheater ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isTheater ? 'Normal' : 'Theater'}</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Fullscreen mode"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>

          {/* About:Blank Cloaker */}
          <button
            onClick={handleAboutBlankCloak}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
            title="Open in disguised about:blank window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Cloaked</span>
          </button>

          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(game.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title={isFavorite ? 'Saved to favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Game Player Frame Container */}
      <div
        ref={containerRef}
        className={`relative w-full mx-auto transition-all duration-300 bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl ${
          isTheater ? 'max-w-full' : 'max-w-5xl'
        }`}
        style={{ minHeight: '520px', height: '72vh' }}
      >
        <iframe
          key={iframeKey}
          src={game.iframeSrc}
          title={game.title}
          className="w-full h-full border-0 block"
          allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
        />
      </div>

      {/* Game Details Section */}
      <div className={`mx-auto mt-6 transition-all duration-300 ${isTheater ? 'max-w-full' : 'max-w-5xl'}`}>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              {/* Unboxed Metadata Line */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                <span>{game.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-amber-400 font-mono font-bold">★ {Number(game.rating).toFixed(1)}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="font-mono tabular-nums">{Number(game.plays).toLocaleString()} plays</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>JSON Stored Iframe</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {game.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmbed}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmbed ? 'Copied Iframe!' : 'Copy Embed Code'}</span>
              </button>

              <button
                onClick={() => setShowJsonSnippet(!showJsonSnippet)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-400 bg-sky-950/40 hover:bg-sky-950/80 border border-sky-800/60 rounded-lg transition-colors cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showJsonSnippet ? 'Hide JSON' : 'View JSON Record'}</span>
              </button>
            </div>
          </div>

          {/* JSON Record Viewer (Expandable) */}
          {showJsonSnippet && (
            <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
              <div className="flex justify-between items-center mb-2 text-slate-500 font-sans">
                <span>Record stored in games.json</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(game, null, 2));
                  }}
                  className="hover:text-white cursor-pointer"
                >
                  Copy entry
                </button>
              </div>
              <pre>{JSON.stringify(game, null, 2)}</pre>
            </div>
          )}

          {/* Description & Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">About this game</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>

              {/* Tags unboxed text */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-slate-400">Tags:</span>
                {game.tags && game.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className="text-slate-400 hover:text-slate-200">{tag}</span>
                    {idx < game.tags.length - 1 && <span aria-hidden="true" className="text-slate-700">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Controls Guide */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                <Keyboard className="w-4 h-4 text-amber-400" />
                <span>Controls Guide</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {game.controls && game.controls.map((ctrl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400/80 font-mono">•</span>
                    <span>{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
