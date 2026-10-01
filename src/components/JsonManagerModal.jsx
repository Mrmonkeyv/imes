import React, { useState } from 'react';
import { X, Copy, Check, Download, RotateCcw } from 'lucide-react';

export const JsonManagerModal = ({
  isOpen,
  onClose,
  games,
  onResetToDefault,
  onImportJson
}) => {
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(games, null, 2));
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const currentJsonString = JSON.stringify(games, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveEdit = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('JSON root must be an array of games.');
      }
      onImportJson(parsed);
      setEditMode(false);
      setErrorMsg(null);
    } catch (e) {
      setErrorMsg(e.message || 'Invalid JSON syntax');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              games.json Database Viewer
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Every game is registered as an iframe config object inside this JSON catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono">
              Total entries: <strong className="text-amber-400">{games.length}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">Location: /public/games.json</span>
          </div>

          <div className="flex items-center gap-2">
            {editMode ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1.5 font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md cursor-pointer transition-colors"
                >
                  Save JSON
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setJsonText(currentJsonString);
                    setErrorMsg(null);
                  }}
                  className="px-3 py-1.5 font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setJsonText(currentJsonString);
                    setEditMode(true);
                  }}
                  className="px-3 py-1.5 font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer transition-colors"
                >
                  Edit JSON
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-sky-400 bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/60 rounded-md cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json</span>
                </button>
                <button
                  onClick={onResetToDefault}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Reset to factory defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="px-6 py-2 bg-rose-950/60 border-b border-rose-800 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Content Viewer / Editor */}
        <div className="p-6 flex-1 overflow-auto bg-slate-950">
          {editMode ? (
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full h-96 p-4 font-mono text-xs text-slate-200 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400"
              spellCheck={false}
            />
          ) : (
            <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
              {currentJsonString}
            </pre>
          )}
        </div>

      </div>
    </div>
  );
};
