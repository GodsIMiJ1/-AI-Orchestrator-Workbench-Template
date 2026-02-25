import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ExecutionPanel } from './components/ExecutionPanel';
import { LLMNode } from './components/nodes/LLMNode';
import { APINode } from './components/nodes/APINode';
import { ConditionNode } from './components/nodes/ConditionNode';
import { DatabaseNode } from './components/nodes/DatabaseNode';

const nodeTypes = {
  llm: LLMNode,
  api: APINode,
  condition: ConditionNode,
  database: DatabaseNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'api',
    position: { x: 250, y: 150 },
    data: { url: 'https://api.example.com/users' },
  },
  {
    id: '2',
    type: 'llm',
    position: { x: 600, y: 150 },
    data: { prompt: 'Summarize the user data: {{input}}' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } } as Edge, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const addLog = (level: string, message: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: uuidv4(),
        timestamp: new Date().toISOString().split('T')[1].slice(0, 12),
        level,
        message,
      },
    ]);
  };

  const simulateExecution = () => {
    setIsRunning(true);
    setIsPanelOpen(true);
    setLogs([]);
    
    addLog('info', 'Starting workflow simulation...');
    
    let delay = 1000;
    
    nodes.forEach((node, index) => {
      setTimeout(() => {
        addLog('info', `Executing node [${node.type}] (ID: ${node.id})`);
        
        if (node.type === 'api') {
          addLog('success', `Fetched mock data from API endpoint`);
        } else if (node.type === 'llm') {
          addLog('info', `Sending prompt to LLM...`);
          setTimeout(() => {
            addLog('success', `Received response from LLM (Mocked)`);
          }, 800);
        } else if (node.type === 'condition') {
          addLog('warn', `Evaluating condition: true`);
        } else if (node.type === 'database') {
          addLog('success', `Executed mock query successfully`);
        }
      }, delay);
      delay += 1500;
    });

    setTimeout(() => {
      addLog('info', 'Workflow simulation completed.');
      setIsRunning(false);
    }, delay + 500);
  };

  const exportJSON = () => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flow, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "workflow_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden">
      <TopBar onExport={exportJSON} onRun={simulateExecution} isRunning={isRunning} />
      
      <div className="flex flex-1 relative overflow-hidden">
        <ReactFlowProvider>
          <Sidebar />
          
          <div className="flex-1 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              className="bg-slate-50"
            >
              <Background color="#cbd5e1" gap={16} size={1} />
              <Controls className="bg-white border-slate-200 shadow-md rounded-lg" />
            </ReactFlow>
            
            <ExecutionPanel 
              logs={logs} 
              isOpen={isPanelOpen} 
              onClose={() => setIsPanelOpen(false)} 
            />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
