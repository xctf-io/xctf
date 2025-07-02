import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Shield, Flag, Clock } from 'lucide-react';

interface Challenge {
  id: number;
  name: string;
  challenge_type: string;
  difficulty: string;
  flag: string;
  created_at: string;
}

interface ChallengeNodeData {
  challenge: Challenge;
  isStartNode: boolean;
  isEndNode: boolean;
}

export function ChallengeNode({ data, selected }: NodeProps<ChallengeNodeData>) {
  const { challenge, isStartNode, isEndNode } = data;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('social')) return '👥';
    if (type.includes('interactive')) return '🎮';
    if (type.includes('visual')) return '👁️';
    if (type.includes('source')) return '💻';
    if (type.includes('steganography')) return '🔍';
    if (type.includes('multipage')) return '📄';
    if (type.includes('puzzle')) return '🧩';
    if (type.includes('error')) return '⚠️';
    if (type.includes('search')) return '🔎';
    if (type.includes('mobile')) return '📱';
    return '🛡️';
  };

  const nodeClasses = `
    bg-white border-2 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl
    ${selected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-indigo-400'}
    ${isStartNode ? 'border-green-500' : ''}
    ${isEndNode ? 'border-red-500' : ''}
  `;

  return (
    <div className={nodeClasses}>
      {/* Input Handle */}
      {!isStartNode && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-indigo-500 border-2 border-white"
        />
      )}

      {/* Node Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getTypeIcon(challenge.challenge_type)}</span>
          {isStartNode && <span className="text-green-500">🚀</span>}
          {isEndNode && <span className="text-red-500">🏁</span>}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </div>
      </div>

      {/* Challenge Name */}
      <div className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
        {challenge.name}
      </div>

      {/* Challenge Type */}
      <div className="text-xs text-gray-600 mb-2">
        {challenge.challenge_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </div>

      {/* Footer Icons */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Flag className="w-3 h-3" />
          <span>CTF</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{new Date(challenge.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Output Handle */}
      {!isEndNode && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-indigo-500 border-2 border-white"
        />
      )}
    </div>
  );
}