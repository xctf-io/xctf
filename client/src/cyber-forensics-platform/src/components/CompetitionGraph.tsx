'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ChallengeNode } from './ChallengeNode';
import { ChallengeViewer } from './ChallengeViewer';
import { Plus, Play, Settings } from 'lucide-react';

interface Competition {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface Challenge {
  id: number;
  name: string;
  challenge_type: string;
  difficulty: string;
  flag: string;
  created_at: string;
}

type GraphNode = Node & {
  data: {
    challenge: Challenge;
    isStartNode: boolean;
    isEndNode: boolean;
  };
};

type GraphEdge = Edge & {
  data?: {
    clue_text?: string;
    connection_type?: string;
  };
};

interface CompetitionGraphProps {
  competition: Competition;
  onAddChallenge: () => void;
}

const nodeTypes = {
  challenge: ChallengeNode,
};

export function CompetitionGraph({ competition, onAddChallenge }: CompetitionGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<GraphNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<GraphEdge>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingChallengeId, setViewingChallengeId] = useState<number | null>(null);

  // Load graph data
  useEffect(() => {
    loadGraphData();
  }, [competition.id]);

  const loadGraphData = async () => {
    setIsLoading(true);
    try {
      // Load nodes (challenges)
      const nodesResponse = await fetch(`/api/competitions/${competition.id}/nodes`);
      if (nodesResponse.ok) {
        const nodesData = await nodesResponse.json();
        
        const graphNodes: GraphNode[] = nodesData.map((nodeData: any) => ({
          id: nodeData.id.toString(),
          type: 'challenge',
          position: { x: nodeData.position_x, y: nodeData.position_y },
          data: {
            challenge: {
              id: nodeData.challenge_id,
              name: nodeData.challenge_name,
              challenge_type: nodeData.challenge_type,
              difficulty: nodeData.difficulty || 'medium',
              flag: nodeData.flag || '',
              created_at: nodeData.created_at,
            },
            isStartNode: nodeData.is_start_node,
            isEndNode: nodeData.is_end_node,
          },
          style: {
            width: nodeData.width || 200,
            height: nodeData.height || 100,
          },
        }));

        setNodes(graphNodes);
      }

      // Load edges (connections)
      const edgesResponse = await fetch(`/api/competitions/${competition.id}/edges`);
      if (edgesResponse.ok) {
        const edgesData = await edgesResponse.json();
        
        const graphEdges: GraphEdge[] = edgesData.map((edgeData: any) => ({
          id: edgeData.id.toString(),
          source: edgeData.from_node_id.toString(),
          target: edgeData.to_node_id.toString(),
          type: 'smoothstep',
          animated: edgeData.connection_type === 'sequential',
          label: edgeData.clue_text,
          data: {
            clue_text: edgeData.clue_text,
            connection_type: edgeData.connection_type,
          },
        }));

        setEdges(graphEdges);
      }
    } catch (error) {
      console.error('Error loading graph data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onConnect = useCallback(
    async (params: Edge | Connection) => {
      // Create edge in database
      try {
        const response = await fetch(`/api/competitions/${competition.id}/edges`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from_node_id: parseInt(params.source!),
            to_node_id: parseInt(params.target!),
            connection_type: 'sequential',
            clue_text: 'Continue to next challenge',
          }),
        });

        if (response.ok) {
          const newEdge = await response.json();
          setEdges((eds) => addEdge({
            ...params,
            id: newEdge.id.toString(),
            type: 'smoothstep',
            animated: true,
            label: 'Continue to next challenge',
          }, eds));
        }
      } catch (error) {
        console.error('Error creating edge:', error);
      }
    },
    [competition.id, setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleNodePositionChange = useCallback(async (changes: NodeChange[]) => {
    // Handle position changes
    for (const change of changes) {
      if (change.type === 'position' && change.position) {
        try {
          await fetch(`/api/nodes/${change.id}/position`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              x: change.position.x,
              y: change.position.y,
            }),
          });
        } catch (error) {
          console.error('Error updating node position:', error);
        }
      }
    }
    
    onNodesChange(changes);
  }, [onNodesChange]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-slate-200">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-700 font-medium">Loading competition graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Graph Tools */}
      <div className="absolute top-6 left-6 z-10 flex space-x-3">
        <button
          onClick={onAddChallenge}
          className="bg-white/90 backdrop-blur-md border border-slate-300 rounded-lg px-4 py-3 hover:bg-white hover:shadow-md flex items-center space-x-2 shadow-sm font-medium text-slate-700 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add Challenge</span>
        </button>
        
        {nodes.length > 0 && (
          <>
            <button className="bg-emerald-600 text-white rounded-lg px-4 py-3 hover:bg-emerald-700 flex items-center space-x-2 shadow-sm font-medium transition-all duration-200">
              <Play className="w-5 h-5" />
              <span>Test Flow</span>
            </button>
            
            <button className="bg-slate-600 text-white rounded-lg px-4 py-3 hover:bg-slate-700 flex items-center space-x-2 shadow-sm font-medium transition-all duration-200">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </>
        )}
      </div>

      {/* Competition Info */}
      <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-md border border-slate-300 rounded-lg px-5 py-3 shadow-sm">
        <div className="text-sm font-bold text-slate-900">{competition.name}</div>
        <div className="text-xs text-slate-600 mt-1">{nodes.length} challenges</div>
      </div>

      {/* ReactFlow Graph */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodePositionChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-50"
      >
        <Controls className="!bg-white/90 !border-slate-300 !backdrop-blur-md !shadow-lg" />
        <MiniMap
          className="!bg-white/90 !border-slate-300 !backdrop-blur-md !shadow-lg !rounded-lg"
          nodeColor={(node) => {
            if (node.data.isStartNode) return '#10b981';
            if (node.data.isEndNode) return '#ef4444';
            return '#4f46e5';
          }}
        />
        <Background variant={'dots' as any} gap={20} size={1} color="#cbd5e1" />
      </ReactFlow>

      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-white/80 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-200">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              No Challenges Yet
            </h3>
            <p className="text-slate-600 mb-8 max-w-sm text-lg">
              Start building your cyber forensics competition by adding your first challenge
            </p>
            <button
              onClick={onAddChallenge}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 pointer-events-auto font-semibold text-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create First Challenge
            </button>
          </div>
        </div>
      )}

      {/* Selected Node Details Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 z-10 bg-white border border-gray-300 rounded-lg p-4 shadow-lg w-80">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-gray-900">{selectedNode.data.challenge.name}</h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{selectedNode.data.challenge.challenge_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Difficulty:</span>
              <span className={`font-medium ${
                selectedNode.data.challenge.difficulty === 'easy' ? 'text-green-600' :
                selectedNode.data.challenge.difficulty === 'hard' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {selectedNode.data.challenge.difficulty}
              </span>
            </div>
            {selectedNode.data.isStartNode && (
              <div className="text-green-600 font-medium">🚀 Start Node</div>
            )}
            {selectedNode.data.isEndNode && (
              <div className="text-red-600 font-medium">🏁 End Node</div>
            )}
          </div>
          
          <div className="mt-4 space-y-2">
            <button 
              onClick={() => setViewingChallengeId(selectedNode.data.challenge.id)}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 text-sm font-medium transition-colors"
            >
              View Challenge
            </button>
            <button className="w-full bg-slate-100 text-slate-700 py-2 rounded-md hover:bg-slate-200 text-sm font-medium transition-colors">
              Edit Properties
            </button>
          </div>
        </div>
      )}

      {/* Challenge Viewer Modal */}
      {viewingChallengeId && (
        <ChallengeViewer
          challengeId={viewingChallengeId}
          onClose={() => setViewingChallengeId(null)}
        />
      )}
    </div>
  );
}