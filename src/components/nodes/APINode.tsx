import { Handle, Position } from '@xyflow/react';
import { Globe } from 'lucide-react';

export function APINode({ data }: any) {
  return (
    <div className="bg-white border-2 border-emerald-500 rounded-xl shadow-md w-64">
      <div className="bg-emerald-500 text-white px-3 py-2 rounded-t-lg flex items-center gap-2 font-medium">
        <Globe size={16} />
        API Node
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Endpoint URL</div>
        <input 
          type="text"
          className="w-full text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
          defaultValue={data.url || "https://api.example.com/data"}
          placeholder="https://..."
        />
        <div className="flex gap-2 mt-1">
          <select className="text-xs border border-gray-200 rounded p-1 focus:outline-none">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
          </select>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-emerald-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-500" />
    </div>
  );
}
