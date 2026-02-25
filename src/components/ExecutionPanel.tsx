import { Terminal, X } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

interface ExecutionPanelProps {
  logs: Log[];
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutionPanel({ logs, isOpen, onClose }: ExecutionPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-slate-900 border-t border-slate-700 flex flex-col z-20 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
          <Terminal size={16} />
          Execution Logs (Simulation Mode)
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs flex flex-col gap-1">
        {logs.length === 0 ? (
          <div className="text-slate-500 italic">Waiting for execution...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-3 leading-relaxed">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span className={`
                ${log.level === 'info' ? 'text-blue-400' : ''}
                ${log.level === 'warn' ? 'text-amber-400' : ''}
                ${log.level === 'error' ? 'text-red-400' : ''}
                ${log.level === 'success' ? 'text-emerald-400' : ''}
                font-semibold shrink-0 uppercase w-16
              `}>
                {log.level}
              </span>
              <span className="text-slate-300 break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
