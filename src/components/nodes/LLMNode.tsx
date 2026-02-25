import { Handle, Position } from '@xyflow/react';
import { BrainCircuit } from 'lucide-react';

export function LLMNode({ data }: any) {
  return (
    <div className="bg-white border-2 border-indigo-500 rounded-xl shadow-md w-64">
      <div className="bg-indigo-500 text-white px-3 py-2 rounded-t-lg flex items-center gap-2 font-medium">
        <BrainCircuit size={16} />
        LLM Node
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prompt Template</div>
        <textarea 
          className="w-full text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none" 
          rows={3} 
          defaultValue={data.prompt || "Analyze the following text: {{input}}"}
          placeholder="Enter prompt..."
        />
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-indigo-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-indigo-500" />
    </div>
  );
}
