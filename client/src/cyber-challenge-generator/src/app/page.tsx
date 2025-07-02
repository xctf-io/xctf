'use client';

import { useState } from 'react';

const EXAMPLE_PROMPTS = [
  "Restaurant menu website with flag hidden as white text that appears when highlighted",
  "Photography portfolio with flag revealed when hovering over specific images in sequence",
  "Corporate website with flag accessible through a hidden navigation link triggered by scrolling",
  "News website with flag revealed by clicking buttons in a specific sequence with timing", 
  "Blog site with flag discovered by submitting a contact form with specific keyword values",
  "Travel website with flag hidden in transparent text overlay revealed by double-clicking images",
  "Online store with flag on a hidden product page accessible via breadcrumb navigation",
  "Music streaming site with flag revealed by typing specific song lyrics in the search box",
  "Real estate website with flag discovered through drag-and-drop interaction on property map",
  "Food delivery app with flag unlocked by completing a multi-step ordering process",
  "Gaming website with flag hidden using zero-opacity elements discoverable through developer tools",
  "Educational platform with flag revealed by right-clicking specific course elements in order",
  "Social media platform with flag hidden in a private message conversation between users",
  "Online quiz game website with flag revealed after achieving a perfect score on memory puzzle",
  "Fake 404 error page with flag accessible through a hidden debug panel or report bug feature",
  "Job search website with flag discoverable by filtering results with specific keyword combinations",
  "Mobile app landing page with flag only visible when viewed on phone-sized screen resolution"
];

export default function Home() {
  const [challengeDescription, setChallengeDescription] = useState('');
  const [generatedChallenge, setGeneratedChallenge] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState<{
    challengeType?: string;
    flag?: string;
    flagLocation?: string;
    hidingTechnique?: string;
    interactionRequired?: string;
    visualCues?: string;
    difficultyJustification?: string;
    difficulty?: string;
    generatedImages?: Array<{ url: string; description: string; alt: string }>;
    analysis?: Record<string, unknown>;
    gptRequestData?: Record<string, unknown>;
  } | null>(null);
  const [includeImages, setIncludeImages] = useState(true);
  const [showSourceCode, setShowSourceCode] = useState(false);
  const [showGptRequest, setShowGptRequest] = useState(false);
  const [gptRequestData, setGptRequestData] = useState<{
    analysisRequest?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      prompt?: string;
    };
    htmlRequest?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      prompt?: string;
    };
    imageRequests?: Array<{
      model?: string;
      size?: string;
      prompt?: string;
    }>;
  } | null>(null);

  const generateChallenge = async () => {
    if (!challengeDescription.trim()) return;
    
    setIsGenerating(true);
    
    const requestPayload = { 
      description: challengeDescription,
      includeImages,
      difficulty: 'medium'
    };
    
    console.group('🚀 Challenge Generation Request');
    console.log('📤 Request URL:', '/api/generate-enhanced-challenge');
    console.log('📤 Request Method:', 'POST');
    console.log('📤 Request Headers:', { 'Content-Type': 'application/json' });
    console.log('📤 Request Payload:', requestPayload);
    console.log('⏰ Request Time:', new Date().toISOString());
    console.groupEnd();
    
    try {
      const startTime = performance.now();
      
      const response = await fetch('/api/generate-enhanced-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group('📥 Challenge Generation Response');
      console.log('📥 Response Status:', response.status, response.statusText);
      console.log('📥 Response Headers:', Object.fromEntries(response.headers.entries()));
      console.log('⏱️ Response Time:', `${duration}ms`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response Error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📥 Response Data Structure:', {
        hasHtml: !!data.html,
        htmlLength: data.html?.length || 0,
        challengeType: data.challengeType,
        flag: data.flag,
        flagLocation: data.flagLocation,
        difficulty: data.difficulty,
        generatedImages: data.generatedImages?.length || 0,
        analysis: data.analysis
      });
      console.log('📥 Full Response Data:', data);
      console.groupEnd();
      
      setGeneratedChallenge(data.html);
      setChallengeInfo(data);
      setGptRequestData(data.gptRequestData);
      
      console.log('✅ Challenge generation completed successfully');
      
    } catch (error) {
      console.group('❌ Challenge Generation Error');
      console.error('Error Type:', error instanceof Error ? error.name : 'Unknown');
      console.error('Error Message:', error instanceof Error ? error.message : String(error));
      console.error('Error Stack:', error instanceof Error ? error.stack : 'No stack trace');
      console.error('Full Error Object:', error);
      console.groupEnd();
      
      // Show user-friendly error in UI
      alert(`Failed to generate challenge: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSourceCode = () => {
    if (!generatedChallenge) return;
    
    const blob = new Blob([generatedChallenge], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyber-challenge-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="flex h-screen flex-col lg:flex-row">
        {/* Left Panel - Input */}
        <div className={`w-full lg:w-1/2 p-4 lg:p-8 backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 lg:border-r border-b lg:border-b-0 border-gray-700' 
            : 'bg-white/70 lg:border-r border-b lg:border-b-0 border-indigo-200'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                🛡️ Cyber Challenge Generator
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Create realistic forensics challenges with AI
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Challenge Description
            </label>
            <textarea
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
              placeholder="Describe the cyber forensics challenge you want to create..."
              className={`w-full h-32 lg:h-40 p-4 rounded-xl border-2 transition-all duration-200 resize-none focus:outline-none focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400/20' 
                  : 'bg-white/80 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
          </div>

          {/* Generation Options */}
          <div className="mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                🎨 Generate with DALL-E 3 Images
              </span>
            </label>
          </div>

          {/* Example Prompts */}
          <div className="mb-6">
            <p className={`text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              💡 Try these examples:
            </p>
            <div className="space-y-2">
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setChallengeDescription(prompt)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-600/50' 
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 hover:text-indigo-900 border border-indigo-200'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateChallenge}
            disabled={isGenerating || !challengeDescription.trim()}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 ${
              isGenerating || !challengeDescription.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Generating Challenge...
              </div>
            ) : (
              '🚀 Generate Challenge'
            )}
          </button>
        </div>

        {/* Right Panel - Preview */}
        <div className={`w-full lg:w-1/2 p-4 lg:p-8 ${
          isDarkMode ? 'bg-gray-900/50' : 'bg-white/30'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🔍 Preview
            </h2>
            {generatedChallenge && (
              <div className="flex items-center space-x-2">
                {challengeInfo && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-50 text-green-600'
                  }`}>
                    {challengeInfo.challengeType?.replace('_', ' ').toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => setShowSourceCode(!showSourceCode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {showSourceCode ? 'Preview' : 'Source'}
                </button>
                <button
                  onClick={() => setShowGptRequest(!showGptRequest)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {showGptRequest ? 'Hide' : 'GPT Request'}
                </button>
                <button
                  onClick={downloadSourceCode}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30' 
                      : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  Download
                </button>
                <button
                  onClick={() => {
                    setGeneratedChallenge('');
                    setChallengeInfo(null);
                    setGptRequestData(null);
                    setShowSourceCode(false);
                    setShowGptRequest(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          
          {/* Challenge Info Panel */}
          {challengeInfo && (
            <div className={`mb-4 p-4 rounded-xl border ${
              isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-blue-50/50 border-blue-200'
            }`}>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Flag:
                  </span>
                  <code className={`ml-2 px-2 py-1 rounded text-xs ${
                    isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-green-600'
                  }`}>
                    {challengeInfo.flag}
                  </code>
                </div>
                <div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Location:
                  </span>
                  <span className={`ml-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {challengeInfo.flagLocation}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div className={`rounded-2xl h-64 lg:h-full overflow-hidden shadow-2xl ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            {generatedChallenge ? (
              showGptRequest ? (
                <div className="h-full overflow-auto p-4">
                  <div className={`space-y-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {gptRequestData && (
                      <>
                        <div>
                          <h3 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            🔍 Analysis Request
                          </h3>
                          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="mb-2">
                              <strong>Model:</strong> {gptRequestData.analysisRequest?.model}
                              <span className="ml-4"><strong>Temperature:</strong> {gptRequestData.analysisRequest?.temperature}</span>
                              <span className="ml-4"><strong>Max Tokens:</strong> {gptRequestData.analysisRequest?.maxTokens}</span>
                            </div>
                            <div>
                              <strong>Prompt:</strong>
                              <pre className={`mt-2 p-2 rounded text-xs font-mono whitespace-pre-wrap ${
                                isDarkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-gray-800'
                              }`}>
                                {gptRequestData.analysisRequest?.prompt}
                              </pre>
                            </div>
                          </div>
                        </div>

                        {gptRequestData.imageRequests && gptRequestData.imageRequests.length > 0 && (
                          <div>
                            <h3 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              🎨 Image Generation Requests
                            </h3>
                            {gptRequestData.imageRequests.map((req, i: number) => (
                              <div key={i} className={`p-3 rounded-lg mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <div className="mb-2">
                                  <strong>Image {i + 1} - Model:</strong> {req.model}
                                  <span className="ml-4"><strong>Size:</strong> {req.size}</span>
                                </div>
                                <div>
                                  <strong>Prompt:</strong>
                                  <pre className={`mt-2 p-2 rounded text-xs font-mono whitespace-pre-wrap ${
                                    isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-white text-gray-800'
                                  }`}>
                                    {req.prompt}
                                  </pre>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div>
                          <h3 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            🌐 HTML Generation Request
                          </h3>
                          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="mb-2">
                              <strong>Model:</strong> {gptRequestData.htmlRequest?.model}
                              <span className="ml-4"><strong>Temperature:</strong> {gptRequestData.htmlRequest?.temperature}</span>
                              <span className="ml-4"><strong>Max Tokens:</strong> {gptRequestData.htmlRequest?.maxTokens}</span>
                            </div>
                            <div>
                              <strong>Prompt:</strong>
                              <pre className={`mt-2 p-2 rounded text-xs font-mono whitespace-pre-wrap ${
                                isDarkMode ? 'bg-gray-800 text-purple-400' : 'bg-white text-gray-800'
                              }`}>
                                {gptRequestData.htmlRequest?.prompt}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : showSourceCode ? (
                <div className="h-full overflow-auto">
                  <pre className={`p-4 text-xs font-mono whitespace-pre-wrap ${
                    isDarkMode ? 'text-green-400 bg-gray-900' : 'text-gray-800 bg-gray-50'
                  }`}>
                    <code>{generatedChallenge}</code>
                  </pre>
                </div>
              ) : (
                <iframe
                  srcDoc={generatedChallenge}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  title="Challenge Preview"
                />
              )
            ) : (
              <div className={`flex flex-col items-center justify-center h-full ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-lg font-medium mb-2">Ready to Generate</p>
                <p className="text-sm text-center max-w-sm">
                  Your cyber forensics challenge will appear here once generated
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
