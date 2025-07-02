'use client';

import { useState, useEffect } from 'react';
import { X, Wand2, Link, Plus } from 'lucide-react';

interface Competition {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface ChallengeGeneratorProps {
  competition: Competition;
  onClose: () => void;
  onChallengeCreated: () => void;
}

interface ExistingChallenge {
  id: number;
  name: string;
  challenge_type: string;
  flag: string;
}

const EXAMPLE_PROMPTS = [
  "Sally and John are talking on a social media site, John sends a link in the last message.",
  "A corporate website with a hidden admin panel accessible through a secret URL pattern",
  "A photography portfolio where hovering over images in a specific sequence reveals the flag",
  "A fake error page with a debug mode that exposes sensitive information",
  "A restaurant menu website with white text that becomes visible when highlighted",
  "An e-commerce site where filtering products by a specific category reveals the flag",
  "A news website with a hidden article accessible only through breadcrumb navigation",
  "A gaming website with a mini-game that rewards the flag upon completion"
];

export function ChallengeGenerator({ competition, onClose, onChallengeCreated }: ChallengeGeneratorProps) {
  const [challengeDescription, setChallengeDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeImages, setIncludeImages] = useState(true);
  const [linkToPrevious, setLinkToPrevious] = useState(false);
  const [selectedPreviousChallenge, setSelectedPreviousChallenge] = useState<number | null>(null);
  const [existingChallenges, setExistingChallenges] = useState<ExistingChallenge[]>([]);
  const [isFirstChallenge, setIsFirstChallenge] = useState(false);

  useEffect(() => {
    loadExistingChallenges();
  }, [competition.id]);

  const loadExistingChallenges = async () => {
    try {
      const response = await fetch(`/api/competitions/${competition.id}/challenges`);
      if (response.ok) {
        const challenges = await response.json();
        setExistingChallenges(challenges);
        setIsFirstChallenge(challenges.length === 0);
      }
    } catch (error) {
      console.error('Error loading existing challenges:', error);
    }
  };

  const generateChallenge = async () => {
    if (!challengeDescription.trim()) return;

    setIsGenerating(true);

    try {
      // Prepare context for linked challenge generation
      let contextData = null;
      if (linkToPrevious && selectedPreviousChallenge) {
        const previousChallenge = existingChallenges.find(c => c.id === selectedPreviousChallenge);
        if (previousChallenge) {
          contextData = {
            previous_challenge: {
              id: previousChallenge.id,
              name: previousChallenge.name,
              type: previousChallenge.challenge_type,
              flag: previousChallenge.flag
            }
          };
        }
      }

      const requestPayload = {
        competition_id: competition.id,
        description: challengeDescription,
        includeImages,
        difficulty: 'medium',
        context: contextData,
        isFirstChallenge: isFirstChallenge && !linkToPrevious,
        linkToPrevious: linkToPrevious && selectedPreviousChallenge
      };

      const response = await fetch('/api/challenges/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      // Challenge created successfully
      onChallengeCreated();
      
    } catch (error) {
      console.error('Error generating challenge:', error);
      alert(`Failed to generate challenge: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const useExamplePrompt = (prompt: string) => {
    setChallengeDescription(prompt);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Generate New Challenge</h2>
            <p className="text-sm text-gray-600">
              Create a cyber forensics challenge for {competition.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Challenge Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenge Description
              </label>
              <textarea
                value={challengeDescription}
                onChange={(e) => setChallengeDescription(e.target.value)}
                placeholder="Describe the cyber forensics challenge you want to create..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Generation Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Generation Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={includeImages}
                      onChange={(e) => setIncludeImages(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">🎨 Generate with DALL-E 3 Images</span>
                  </label>

                  {!isFirstChallenge && (
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={linkToPrevious}
                        onChange={(e) => setLinkToPrevious(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">🔗 Link to Previous Challenge</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Previous Challenge Selection */}
              {linkToPrevious && existingChallenges.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Previous Challenge</h3>
                  <select
                    value={selectedPreviousChallenge || ''}
                    onChange={(e) => setSelectedPreviousChallenge(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a challenge to link from...</option>
                    {existingChallenges.map((challenge) => (
                      <option key={challenge.id} value={challenge.id}>
                        {challenge.name} ({challenge.challenge_type})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Example Prompts */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">💡 Example Prompts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => useExamplePrompt(prompt)}
                    className="text-left p-3 rounded-lg text-sm border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {isFirstChallenge ? (
              <span className="flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>This will be the first challenge</span>
              </span>
            ) : (
              <span>{existingChallenges.length} existing challenges</span>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={generateChallenge}
              disabled={isGenerating || !challengeDescription.trim() || (linkToPrevious && !selectedPreviousChallenge)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Challenge...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Generate Challenge</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}