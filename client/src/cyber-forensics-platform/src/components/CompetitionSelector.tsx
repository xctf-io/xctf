'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Competition {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface CompetitionSelectorProps {
  competitions: Competition[];
  selectedCompetition: Competition | null;
  onSelectCompetition: (competition: Competition) => void;
}

export function CompetitionSelector({
  competitions,
  selectedCompetition,
  onSelectCompetition,
}: CompetitionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (competitions.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No competitions available
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="text-sm font-medium">
          {selectedCompetition ? selectedCompetition.name : 'Select Competition'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {competitions.map((competition) => (
                <button
                  key={competition.id}
                  onClick={() => {
                    onSelectCompetition(competition);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                    selectedCompetition?.id === competition.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900'
                  }`}
                >
                  <div className="font-medium text-sm">{competition.name}</div>
                  {competition.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {competition.description}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    Created {new Date(competition.created_at).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}