'use client';

import { useState, useEffect } from 'react';
import { CompetitionGraph } from '@/components/CompetitionGraph';
import { CompetitionSelector } from '@/components/CompetitionSelector';
import { ChallengeGenerator } from '@/components/ChallengeGenerator';
import { Plus } from 'lucide-react';

interface Competition {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export default function Home() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [showNewCompetitionModal, setShowNewCompetitionModal] = useState(false);
  const [showChallengeGenerator, setShowChallengeGenerator] = useState(false);
  const [newCompetitionName, setNewCompetitionName] = useState('');
  const [newCompetitionDescription, setNewCompetitionDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [graphKey, setGraphKey] = useState(0);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions');
      if (response.ok) {
        const data = await response.json();
        setCompetitions(data);
        
        // Auto-select the first competition if available
        if (data.length > 0 && !selectedCompetition) {
          setSelectedCompetition(data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading competitions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCompetition = async () => {
    if (!newCompetitionName.trim()) return;

    try {
      const response = await fetch('/api/competitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCompetitionName,
          description: newCompetitionDescription,
        }),
      });

      if (response.ok) {
        const newComp = await response.json();
        setCompetitions([newComp, ...competitions]);
        setSelectedCompetition(newComp);
        setShowNewCompetitionModal(false);
        setNewCompetitionName('');
        setNewCompetitionDescription('');
      }
    } catch (error) {
      console.error('Error creating competition:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                🛡️ Cyber Forensics Platform
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <CompetitionSelector
                competitions={competitions}
                selectedCompetition={selectedCompetition}
                onSelectCompetition={setSelectedCompetition}
              />
              
              <button
                onClick={() => setShowNewCompetitionModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>New Competition</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {selectedCompetition ? (
          <div className="h-[calc(100vh-4rem)]">
            <CompetitionGraph
              key={graphKey}
              competition={selectedCompetition}
              onAddChallenge={() => setShowChallengeGenerator(true)}
            />
          </div>
        ) : (
          <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="text-center bg-white/80 backdrop-blur-md p-12 rounded-2xl shadow-lg border border-slate-200">
              <div className="text-6xl mb-6">🏗️</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                No Competition Selected
              </h2>
              <p className="text-slate-600 mb-8 text-lg max-w-md">
                Create a new competition to start building your cyber forensics challenges
              </p>
              <button
                onClick={() => setShowNewCompetitionModal(true)}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-md"
              >
                Create First Competition
              </button>
            </div>
          </div>
        )}
      </main>

      {/* New Competition Modal */}
      {showNewCompetitionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Create New Competition</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Competition Name
                </label>
                <input
                  type="text"
                  value={newCompetitionName}
                  onChange={(e) => setNewCompetitionName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-slate-900"
                  placeholder="e.g., Spring 2024 CTF"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newCompetitionDescription}
                  onChange={(e) => setNewCompetitionDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none transition-colors text-slate-900"
                  placeholder="Competition description..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={() => setShowNewCompetitionModal(false)}
                className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createCompetition}
                disabled={!newCompetitionName.trim()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Generator Modal */}
      {showChallengeGenerator && selectedCompetition && (
        <ChallengeGenerator
          competition={selectedCompetition}
          onClose={() => setShowChallengeGenerator(false)}
          onChallengeCreated={() => {
            setShowChallengeGenerator(false);
            setGraphKey(prev => prev + 1); // Force graph refresh
          }}
        />
      )}
    </div>
  );
}