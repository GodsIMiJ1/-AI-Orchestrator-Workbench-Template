import { Handle, Position } from '@xyflow/react';
import { Split } from 'lucide-react';

export function ConditionNode({ data }: any) {
  return (
    <div className="bg-white border-2 border-amber-500 rounded-xl shadow-md w-64">
      <div className="bg-amber-500 text-white px-3 py-2 rounded-t-lg flex items-center gap-2 font-medium">
        <Split size={16} />
        Condition Node
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Expression</div>
        <input 
          type="text"
          className="w-full text-sm border border-gray-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono" 
          defaultValue={data.expression || "input.score > 0.8"}
          placeholder="e.g. input.score > 0.8"
        />
        <div className="flex justify-between mt-2 text-xs font-semibold text-gray-500">
          <span>True</span>
          <span>False</span>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-amber-500" />
      <Handle type="source" position={Position.Right} id="true" style={{ top: '60%' }} className="w-3 h-3 bg-green-500" />
      <Handle type="source" position={Position.Right} id="false" style={{ top: '80%' }} className="w-3 h-3 bg-red-500" />
    </div>
  );
}
