// src/pages/Translation.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { Bell, MenuIcon, Play, ThumbsUp, ThumbsDown, Copy, Repeat, ArrowLeftRight, Check, X, Zap } from 'lucide-react';
import Flags from 'country-flag-icons/react/3x2';
import { useNavigate } from 'react-router-dom';
import { translationService } from '../../api/translation';
import { authService } from '../../api/auth';

const languages = [
  { code: 'en-US', name: 'English (US)', country: 'US' },
  { code: 'es-ES', name: 'Spanish', country: 'ES' },
  { code: 'fr-FR', name: 'French', country: 'FR' },
  { code: 'de-DE', name: 'German', country: 'DE' },
  { code: 'it-IT', name: 'Italian', country: 'IT' },
  { code: 'pt-BR', name: 'Portuguese', country: 'BR' },
  { code: 'nl-NL', name: 'Dutch', country: 'NL' },
  { code: 'pl-PL', name: 'Polish', country: 'PL' },
  { code: 'ru-RU', name: 'Russian', country: 'RU' },
];

const Translation = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
  const [targetLanguage, setTargetLanguage] = useState(languages[1]);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [toneOfVoice, setToneOfVoice] = useState('');
  const [error, setError] = useState(null);
  const [modifiedText, setModifiedText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setUserCredits(user.credits_left || 0);
    }
  }, []);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSwapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      showToastMessage('Please enter text to translate');
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const response = await translationService.translate({
        content: inputText,
        sourceLanguage,
        targetLanguage,
        toneOfVoice: toneOfVoice.trim() || null
      });

      setOutputText(response.data.translatedContent);
      setUserCredits(response.data.credits_left);
      setShowTranslation(true);
      showToastMessage('Translation completed successfully');
    } catch (err) {
      setError(err.message || 'Translation failed');
      showToastMessage(err.message || 'Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleModifyContent = async () => {
    if (!modifiedText.trim()) return;
    
    setIsTranslating(true);
    try {
      const response = await translationService.translate({
        content: modifiedText,
        sourceLanguage,
        targetLanguage,
        toneOfVoice: toneOfVoice.trim() || null
      });

      setOutputText(prevText => `${prevText}\n\nModified Content:\n${response.data.translatedContent}`);
      setUserCredits(response.data.credits_left);
      setModifiedText('');
      showToastMessage('Content modified successfully');
    } catch (err) {
      showToastMessage(err.message || 'Modification failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleRegenerateContent = async () => {
    setShowTranslation(false);
    await handleTranslate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    showToastMessage('Copied to clipboard');
  };

  const LanguageSelector = ({ 
    selected, 
    setSelected, 
    isOpen, 
    setIsOpen, 
    label 
  }) => {
    const FlagComponent = Flags[selected.country];

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2 border rounded-lg bg-white"
        >
          <span className="flex items-center">
            <FlagComponent className="w-5 h-4 mr-2" />
            {selected.name}
          </span>
          <span className="ml-2">▼</span>
        </button>
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
            {languages.map((lang) => {
              const LangFlag = Flags[lang.country];
              return (
                <button
                  key={lang.code}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => {
                    setSelected(lang);
                    setIsOpen(false);
                  }}
                >
                  <LangFlag className="w-5 h-4 mr-2" />
                  {lang.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 w-full ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <button 
                className="md:hidden flex items-center p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="relative ml-auto">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-2 w-2 h-2 bg-[#FF5341] rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {!isSidebarCollapsed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarCollapsed(true)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
              <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl text-gray-700 font-bold mb-2">AI Translator</h1>
            <p className="text-gray-600">
              Effortlessly Translate Your Content Into Multiple Languages With Accuracy And Context. Our AI Translator Ensures That Your Message Resonates Globally, Maintaining Tone And Cultural Nuances.
            </p>
          </div>

          {/* Translation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Card */}
            <div className="bg-[#FFFAF3] rounded-xl p-6">
              <div className="bg-[#FF5341] text-white rounded-lg p-3 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Your Balance Is {userCredits} Credits
              </div>

              <LanguageSelector
                selected={sourceLanguage}
                setSelected={setSourceLanguage}
                isOpen={isSourceDropdownOpen}
                setIsOpen={setIsSourceDropdownOpen}
                label="Language"
              />

              {/* Tone of Voice Option */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone of Voice</label>
                <input
                  type="text"
                  value={toneOfVoice}
                  onChange={(e) => setToneOfVoice(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="E.g., Professional, Friendly, Informative"
                />
              </div>

              <div className="mt-4">
                <div className="relative mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Input Content
                    </label>
                    <span className="text-sm text-gray-500">
                      {inputText.length}/800
                    </span>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-64 p-4 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                    placeholder="Enter text to translate..."
                    maxLength={800}
                  />
                </div>
                {error && (
                  <div className="mt-2 text-red-600 text-sm">{error}</div>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating || !inputText.trim()}
                    className={`bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center ${
                      isTranslating || !inputText.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isTranslating ? (
                      <>
                        Translating...
                        <div className="ml-2 animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      </>
                    ) : (
                      <>
                        Run
                        <Play className="w-4 h-4 ml-2 fill-current" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSwapLanguages}
                    className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Swap
                  </button>
                </div>
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-[#FFFAF3] rounded-xl p-6">
              <LanguageSelector
                selected={targetLanguage}
                setSelected={setTargetLanguage}
                isOpen={isTargetDropdownOpen}
                setIsOpen={setIsTargetDropdownOpen}
                label="Language"
              />
              <div className="mt-4">
                <div className="relative mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Output Content
                    </label>
                  </div>
                  {showTranslation && (
                    <>
                      <textarea
                        value={outputText}
                        readOnly
                        className="w-full h-64 p-4 border rounded-lg bg-white mb-4"
                      />
                      
                      {/* Content Editor Section */}
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Need to modify specific parts?</h3>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={modifiedText}
                            onChange={(e) => setModifiedText(e.target.value)}
                            placeholder="Enter text to modify..."
                            className="flex-1 p-2 border rounded-lg focus:ring-[#FF5341]"
                          />
                          <button 
                            onClick={handleModifyContent}
                            disabled={isTranslating || !modifiedText.trim()}
                            className={`bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 ${
                              isTranslating || !modifiedText.trim() ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {isTranslating ? 'Modifying...' : 'Modify'}
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-4">
                        <button 
                          onClick={handleRegenerateContent}
                          disabled={isTranslating}
                          className={`px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center ${
                            isTranslating ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <Repeat className="w-4 h-4 mr-2" />
                          Regenerate
                        </button>
                        <button 
                          onClick={handleCopy}
                          className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Translation;