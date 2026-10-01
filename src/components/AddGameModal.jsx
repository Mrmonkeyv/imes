import React, { useState } from 'react';
import { X, Plus, Gamepad2 } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [embedInput, setEmbedInput] = useState('');
  const [controlsInput, setControlsInput] = useState('Arrow Keys: Move, Space: Action');
  const [color, setColor] = useState('#0284c7');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Game title is required.');
      return;
    }
    if (!embedInput.trim()) {
      setError('Iframe URL or embed snippet is required.');
      return;
    }

    let src = embedInput.trim();
    let code = embedInput.trim();

    // If user provided a raw URL rather than an iframe tag:
    if (!embedInput.includes('<iframe')) {
      src = embedInput.trim();
      code = `<iframe src="${src}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
    } else {
      // Extract src attribute
      const match = embedInput.match(/src=["']([^"']+)["']/);
      if (match && match[1]) {
        src = match[1];
      }
    }

    const newGame = {
      id: title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36),
      title: title.trim(),
      category: category,
      description: description.trim() || 'Custom community unblocked game.',
      iframeSrc: src,
      iframeCode: code,
      controls: controlsInput.split('\n').map(s => s.trim()).filter(Boolean),
      rating: 5.0,
      plays: 1,
      badge: 'New',
      tags: [category, 'Custom', 'Unblocked'],
      color: color
    };

    onAddGame(newGame);
    onClose();
    // Reset form
    setTitle('');
    setDescription('');
    setEmbedInput('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Add Game via Iframe</h2>
              <p className="text-xs text-slate-400">Stores directly into your JSON game collection.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Game Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Crossy Road, Retro Bowl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Casual">Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Accent Theme
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-9 p-0.5 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400">{color}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Embed Code or URL *
            </label>
            <textarea
              required
              rows={2}
              placeholder='<iframe src="https://..." ...></iframe> or https://game-url.com'
              value={embedInput}
              onChange={(e) => setEmbedInput(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Paste an HTML &lt;iframe&gt; embed or direct URL. It will be stored in JSON.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary of gameplay..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Controls (One per line)
            </label>
            <textarea
              rows={2}
              placeholder="Arrow Keys: Move&#10;Spacebar: Action"
              value={controlsInput}
              onChange={(e) => setControlsInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add to games.json</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
