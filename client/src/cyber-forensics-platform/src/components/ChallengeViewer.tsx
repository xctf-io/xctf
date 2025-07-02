'use client';

import { useState, useEffect } from 'react';
import { X, Eye, Code, Info, Download, ExternalLink } from 'lucide-react';

interface Challenge {
  id: number;
  name: string;
  description: string;
  challenge_type: string;
  difficulty: string;
  flag: string;
  flag_location: string;
  hiding_technique: string;
  interaction_required: string;
  visual_cues: string;
  html_content: string;
  analysis_data: any;
  created_at: string;
}

interface ChallengeViewerProps {
  challengeId: number;
  onClose: () => void;
}

export function ChallengeViewer({ challengeId, onClose }: ChallengeViewerProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'source' | 'info'>('preview');
  const [iframeKey, setIframeKey] = useState(0);

  // Fetch challenge data
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/challenges/${challengeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch challenge');
        }
        const challengeData = await response.json();
        setChallenge(challengeData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // Refresh iframe when switching to preview tab
  useEffect(() => {
    if (activeTab === 'preview') {
      setIframeKey(prev => prev + 1);
    }
  }, [activeTab]);

  const downloadSource = () => {
    if (!challenge) return;
    const blob = new Blob([challenge.html_content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${challenge.name.replace(/[^a-zA-Z0-9]/g, '_')}_challenge.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInNewTab = () => {
    if (!challenge) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(challenge.html_content);
      newWindow.document.close();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="text-gray-900">Loading challenge...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !challenge) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Challenge</h3>
            <p className="text-gray-600 mb-6">{error || 'Challenge not found'}</p>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl h-[90vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{challenge.name}</h2>
            <div className="flex items-center space-x-4 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                challenge.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {challenge.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {challenge.challenge_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadSource}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Download Source"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={openInNewTab}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Open in New Tab"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'preview'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('source')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'source'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Source Code
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'info'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Info className="w-4 h-4 inline mr-2" />
            Challenge Info
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'preview' && (
            <div className="h-full bg-gray-100">
              <iframe
                key={iframeKey}
                srcDoc={challenge.html_content}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                title="Challenge Preview"
                onLoad={(e) => {
                  // Additional safety: prevent any external navigation in the iframe
                  try {
                    const iframeDoc = (e.target as HTMLIFrameElement).contentDocument;
                    if (iframeDoc) {
                      // Override any window.open or location changes
                      const iframeWindow = (e.target as HTMLIFrameElement).contentWindow;
                      if (iframeWindow) {
                        iframeWindow.open = () => null;
                        // Prevent location changes
                        Object.defineProperty(iframeWindow, 'location', {
                          get: () => ({ href: '#' }),
                          set: () => {},
                        });
                      }
                    }
                  } catch (error) {
                    // Ignore cross-origin errors
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'source' && (
            <div className="h-full overflow-auto bg-gray-900 text-gray-100">
              <pre className="p-6 text-sm font-mono whitespace-pre-wrap">
                <code>{challenge.html_content}</code>
              </pre>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="h-full overflow-auto p-6">
              <div className="max-w-4xl space-y-6">
                {/* Flag Information */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">🚩 Flag Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-red-800">Flag:</span>
                      <code className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded">
                        {challenge.flag}
                      </code>
                    </div>
                    <div>
                      <span className="font-medium text-red-800">Location:</span>
                      <span className="ml-2 text-red-700">{challenge.flag_location}</span>
                    </div>
                    <div>
                      <span className="font-medium text-red-800">Hiding Technique:</span>
                      <span className="ml-2 text-red-700">{challenge.hiding_technique}</span>
                    </div>
                    <div>
                      <span className="font-medium text-red-800">Required Interaction:</span>
                      <span className="ml-2 text-red-700">{challenge.interaction_required}</span>
                    </div>
                  </div>
                </div>

                {/* Challenge Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">📋 Challenge Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">Description:</span>
                      <p className="ml-2 text-blue-700 mt-1">{challenge.description}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Visual Cues:</span>
                      <span className="ml-2 text-blue-700">{challenge.visual_cues}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">Created:</span>
                      <span className="ml-2 text-blue-700">
                        {new Date(challenge.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis Data */}
                {challenge.analysis_data && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">🔍 AI Analysis</h3>
                    <div className="text-sm">
                      <pre className="text-green-700 whitespace-pre-wrap font-mono text-xs overflow-auto max-h-64">
                        {JSON.stringify(challenge.analysis_data, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">💡 Solving Instructions</h3>
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p>To solve this challenge:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Examine the website in the Preview tab</li>
                      <li>Look for: {challenge.visual_cues}</li>
                      <li>Try: {challenge.interaction_required}</li>
                      <li>Find the flag at: {challenge.flag_location}</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}