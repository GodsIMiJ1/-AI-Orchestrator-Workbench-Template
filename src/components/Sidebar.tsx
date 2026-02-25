import React from 'react';
import { BrainCircuit, Globe, Split, Database } from 'lucide-react';

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-4 h-full">
      <div className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-2">
        Nodes
      </div>
      
      <div 
        className="bg-white border border-indigo-200 p-3 rounded-lg shadow-sm cursor-grab hover:shadow-md transition-shadow flex items-center gap-3 text-indigo-700 font-medium"
        onDragStart={(event) => onDragStart(event, 'llm')}
        draggable
      >
        <BrainCircuit size={20} />
        LLM Node
      </div>

      <div 
        className="bg-white border border-emerald-200 p-3 rounded-lg shadow-sm cursor-grab hover:shadow-md transition-shadow flex items-center gap-3 text-emerald-700 font-medium"
        onDragStart={(event) => onDragStart(event, 'api')}
        draggable
      >
        <Globe size={20} />
        API Node
      </div>

      <div 
        className="bg-white border border-amber-200 p-3 rounded-lg shadow-sm cursor-grab hover:shadow-md transition-shadow flex items-center gap-3 text-amber-700 font-medium"
        onDragStart={(event) => onDragStart(event, 'condition')}
        draggable
      >
        <Split size={20} />
        Condition Node
      </div>

      <div 
        className="bg-white border border-slate-300 p-3 rounded-lg shadow-sm cursor-grab hover:shadow-md transition-shadow flex items-center gap-3 text-slate-700 font-medium"
        onDragStart={(event) => onDragStart(event, 'database')}
        draggable
      >
        <Database size={20} />
        Mock Database
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 leading-relaxed">
          Drag and drop nodes onto the canvas to build your AI workflow. This is a visual demo interface.
        </p>
      </div>
    </aside>
  );
}
