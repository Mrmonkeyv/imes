import React from 'react';
import { BookOpen, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PanicScreen = ({ onExit }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 sm:p-12 overflow-y-auto">
      {/* Discreet Exit Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-slate-200 mb-8 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-800">AP World History: Unit 5 Study Companion</span>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors cursor-pointer"
          title="Return to application"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Resume [Esc]</span>
        </button>
      </div>

      <main className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-blue-600 font-bold mb-1">
            Section 5.3 · Industrialization & Global Integration
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            The Transformation of Energy Systems (1750–1900)
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            The development of machines, including steam engines and the internal combustion engine,
            made it possible to take advantage of vast new resources of energy stored in fossil fuels,
            specifically coal and oil. The fossil fuels revolution greatly increased the energy available
            to human societies.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <h2 className="text-base font-bold text-slate-800 mb-2">Key Discussion Topics</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Shift from agrarian economies to mechanized manufacturing.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Demographic changes and urbanization in northwestern Europe and North America.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>New social classes: the industrial working class and the industrial middle class.</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-serif font-bold text-slate-900 mb-3">
            Primary Source Excerpt: Leeds Woollen Workers Petition (1786)
          </h2>
          <blockquote className="border-l-4 border-blue-500 pl-4 py-1 italic text-slate-700 text-sm leading-relaxed mb-4">
            &ldquo;We, the Woollen Cloth Workers in the Southwest of Yorkshire, humbly submit to the consideration
            of the public the great hardships which we suffer from the introduction of Scribbling Machines,
            which have reduced thousands of honest and industrious families to distress.&rdquo;
          </blockquote>
          <p className="text-slate-600 text-sm leading-relaxed">
            Students are expected to analyze how technological innovations altered the organization of
            labor and affected traditional artisanal production during the late eighteenth century.
          </p>
        </div>
      </main>
    </div>
  );
};
