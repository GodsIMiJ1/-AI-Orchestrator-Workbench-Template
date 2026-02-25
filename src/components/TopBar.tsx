import { Play, Download, Settings } from 'lucide-react';

interface TopBarProps {
  onExport: () => void;
  onRun: () => void;
  isRunning: boolean;
}

export function TopBar({ onExport, onRun, isRunning }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 relative">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          G
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">AI Orchestrator Workbench</h1>
          <p className="text-xs text-slate-500 font-medium">GodsIMiJ AI Solutions</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Download size={16} />
          Export JSON
        </button>
        
        <button 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Settings size={16} />
          Settings
        </button>

        <button 
          onClick={onRun}
          disabled={isRunning}
          className={`flex items-center gap-2 px-6 py-2 text-sm font-bold text-white rounded-lg transition-colors shadow-sm ${
            isRunning 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Play size={16} className={isRunning ? 'animate-pulse' : ''} />
          {isRunning ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>
    </header>
  );
}
