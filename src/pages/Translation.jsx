// src/pages/Translation.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { Bell, MenuIcon, Play,ThumbsUp,ThumbsDown,Copy,Repeat, ArrowLeftRight } from 'lucide-react';
import Flags from 'country-flag-icons/react/3x2';

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


// Dummy translation data
const dummyText = {
  input: `AI And Data Are Being Increasingly Regulated Around The Globe
As The Impact Of New Technologies And Business Models Has Been
Observed Over The Past Decades, Regulators Began Developing Policy
Solutions To Manage Risks And Enable Positive Innovation. The Push
Towards Regulating AI Is Visible Globally. Some Examples Of Such Laws
Include The EU's AI Act, The Digital Services Act.

The EU AI Act Can Be Challenging To Comply With
The AI Act, Adopted By The EU, Is The World's First Comprehensive
Regulatory Framework For AI. It Has Come Through A Lengthy Legislative
Process And Its Requirements Will Come Into Force In Phases Between The
Years 2024 And 2027.`,
  output: `La IA Y Los Datos Están Cada Vez Más Regulados En Todo El Mundo
A Medida Que Se Observó El Impacto De Las Nuevas Tecnologías Y
Modelos De Negocios Durante Las Últimas Décadas, Los Reguladores
Comenzaron A Desarrollar Soluciones De Políticas Para Gestionar Los
Riesgos Y Permitir La Innovación Positiva. La Tendencia Hacia La
Regulación De La IA Es Visible Globalmente.

Cumplir La Ley De IA De La UE Puede Ser Un Desafío
La Ley De IA, Adoptada Por La UE, Es El Primer Marco Regulatorio Integral
Para La IA Del Mundo. Ha Pasado Por Un Largo Proceso Legislativo Y Sus
Requisitos Entrarán En Vigor Por Fases Entre Los Años 2024 Y 2027.`
};

const Translation = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
  const [targetLanguage, setTargetLanguage] = useState(languages[1]);
  const [inputText, setInputText] = useState(dummyText.input);
  const [outputText, setOutputText] = useState(dummyText.output);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);

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

  const handleSwapLanguages = () => {
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = () => {
    // For now, just show dummy translation
    setOutputText(dummyText.output);
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
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5341] rounded-full"></span>
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
              <LanguageSelector
                selected={sourceLanguage}
                setSelected={setSourceLanguage}
                isOpen={isSourceDropdownOpen}
                setIsOpen={setIsSourceDropdownOpen}
                label="Language"
              />
              
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
                <div className="flex justify-between mt-4">
                  
                  <button
                    onClick={handleTranslate}
                    className="bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
                  >
                    Run
                    <Play className="w-4 h-4 ml-2 fill-current" />
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
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full h-64 p-4 border rounded-lg bg-white"
                  />
                </div>
              </div>
               {/* Action Buttons */}
  <div className="flex justify-end space-x-4 mt-6">
    <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
    <Copy className="w-4 h-4 text-gray-700"/>
    </button>
    <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
    <ThumbsUp className="w-4 h-4 text-gray-700"/>
    </button>
    
    <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
    <ThumbsDown className="w-4 h-4 text-gray-700"/>
    </button>
    <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300">
    <Repeat className="w-4 h-4 text-gray-700"/>
    </button>
  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translation;