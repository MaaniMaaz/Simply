import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RegenerationInput = ({ 
    onRegenerate, 
    isRegenerating = false, 
    className = '' 
}) => {
    const [prompt, setPrompt] = useState('');

    const handleRegenerate = async () => {
        if (!prompt.trim()) return;
        
        await onRegenerate(prompt);
        setPrompt(''); // Clear input after regeneration
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center gap-2">
                <div className="flex-1">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter instructions for regeneration (e.g., 'Make it more professional' or 'Add more technical details')"
                        className="w-full p-3 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341] min-h-[100px] resize-none"
                    />
                </div>
                <button
                    onClick={handleRegenerate}
                    disabled={!prompt.trim() || isRegenerating}
                    className={`h-full px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center gap-2 ${
                        (!prompt.trim() || isRegenerating) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                    {isRegenerating ? 'Regenerating...' : 'Regenerate'}
                </button>
            </div>
            <p className="text-xs text-gray-500">
                Provide specific instructions on how you want the content to be modified. 
                The AI will maintain the context while incorporating your requested changes.
            </p>
        </div>
    );
};

export default RegenerationInput;