import { Handle, Position } from '@xyflow/react';
import { Database } from 'lucide-react';

export function DatabaseNode({ data }: any) {
  return (
    <div className="bg-white border-2 border-slate-700 rounded-xl shadow-md w-64">
      <div className="bg-slate-700 text-white px-3 py-2 rounded-t-lg flex items-center gap-2 font-medium">
        <Database size={16} />
        Mock Database
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Query / Operation</div>
        <select className="w-full text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-slate-500">
          <option>SELECT</option>
          <option>INSERT</option>
          <option>UPDATE</option>
          <option>DELETE</option>
        </select>
        <textarea 
          className="w-full text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-slate-500 font-mono resize-none" 
          rows={2} 
          defaultValue={data.query || "SELECT * FROM users WHERE id = {{input.userId}}"}
          placeholder="SQL Query..."
        />
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-700" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-slate-700" />
    </div>
  );
}
