// src/pages/SEOWriter.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { 
  Bell, 
  ChevronDown, 
  Download, 
  Share2, 
  Link2, 
  Table, 
  Image, 
  AlignLeft, 
  Zap,
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  MenuIcon,
  Code,
  Play,
  Tag
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Flags from 'country-flag-icons/react/3x2';

const getSuggestedKeywords = (input) => {
    const dummyKeywordMap = {
      'best ai writers': [
        'top AI content generators',
        'AI writing software comparison',
        'best AI writing tools 2024',
        'AI content writing platforms',
        'automated writing assistants',
        'AI copywriting software'
      ],
      'digital marketing': [
        'SEO optimization techniques',
        'content marketing strategy',
        'digital marketing tools',
        'online marketing trends',
        'social media marketing',
        'marketing automation'
      ],
      'seo optimization': [
        'keyword research tools',
        'on-page SEO techniques',
        'SEO best practices',
        'search engine ranking',
        'meta tag optimization',
        'SEO content writing'
      ]
    };

    const lowerInput = input.toLowerCase();
    let suggestions = [];
    
    Object.entries(dummyKeywordMap).forEach(([key, values]) => {
      if (lowerInput.includes(key) || key.includes(lowerInput)) {
        suggestions = [...suggestions, ...values];
      }
    });

    if (suggestions.length === 0) {
      suggestions = [
        'content optimization',
        'keyword research',
        'SEO strategies',
        'content writing',
        'digital marketing',
        'target audience'
      ];
    }

    return suggestions.slice(0, 6);
};

const languages = [
    { code: 'en-US', name: 'English (US)', country: 'US' },
    { code: 'en-GB', name: 'English (UK)', country: 'GB' },
    { code: 'es-ES', name: 'Español', country: 'ES' },
    { code: 'fr-FR', name: 'Français', country: 'FR' },
    { code: 'de-DE', name: 'Deutsch', country: 'DE' },
    { code: 'it-IT', name: 'Italiano', country: 'IT' },
    { code: 'pt-BR', name: 'Português', country: 'BR' },
    { code: 'nl-NL', name: 'Nederlands', country: 'NL' },
    { code: 'pl-PL', name: 'Polski', country: 'PL' },
    { code: 'ru-RU', name: 'Русский', country: 'RU' }
];

const aiModels = [
  'OpenAI GPT-4o',
  'GPT-3.5 Turbo',
];


const SEOWriter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [resultLength, setResultLength] = useState('M');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [contentDescription, setContentDescription] = useState('');
  const [focusIdeas, setFocusIdeas] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState('');

  const handleKeywordSearch = (e) => {
    const value = e.target.value;
    setKeywordSearch(value);
    
    if (value.trim()) {
      const suggestions = getSuggestedKeywords(value);
      setSuggestedKeywords(suggestions);
    } else {
      setSuggestedKeywords([]);
    }
  };

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

  // Set up editors with empty content
  const [mediumEditor, shortEditor] = [
    useEditor({
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: '',
    }),
    useEditor({
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: '',
    }),
  ];

  const toggleKeyword = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar - Hidden on mobile */}
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
              <div className="ml-auto relative">
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

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column */}
            <div className="col-span-1 md:col-span-4 bg-[#FFFAF3] rounded-xl p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">SEO Writer</h2>
              <p className="text-sm text-gray-600 mb-4">
                Turn A Title & Outline Into A Fully Complete High Quality SEO Content In Seconds
              </p>

              <div className="bg-[#FF5341] text-white rounded-lg p-3 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Your Balance Is 3000 Credits
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                 {/* Language Dropdown */}
                 <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="w-full flex items-center justify-between p-2 border rounded-lg bg-white"
                  >
                    {selectedLanguage && (
                      <span className="flex items-center">
                        {(() => {
                          const FlagComponent = Flags[selectedLanguage.country];
                          return <FlagComponent className="w-5 h-4 mr-2" />;
                        })()}
                        {selectedLanguage.name}
                      </span>
                    )}
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                      {languages.map((lang) => {
                        const FlagComponent = Flags[lang.country];
                        return (
                          <button
                            key={lang.code}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                            onClick={() => {
                              setSelectedLanguage(lang);
                              setIsLanguageDropdownOpen(false);
                            }}
                          >
                            <FlagComponent className="w-5 h-4 mr-2" />
                            {lang.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Content Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content Description/Brief
                  </label>
                  <input
                    type="text"
                    value={contentDescription}
                    onChange={(e) => setContentDescription(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter your content description"
                  />
                </div>

                {/* Keyword Search - New Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Keywords <span className="text-gray-400">(Get keyword suggestions)</span>
                  </label>
                  <input
                    type="text"
                    value={keywordSearch}
                    onChange={handleKeywordSearch}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Search keywords (e.g., SEO optimization)"
                  />
                </div>

                {/* Post Focus Idea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post Focus Idea <span className="text-gray-400">(Comma Separated)</span>
                  </label>
                  <input
                    type="text"
                    value={focusIdeas}
                    onChange={(e) => setFocusIdeas(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Eg. Hardwork, Smartwork, Automation"
                  />
                </div>

                {/* Suggested Keywords */}
                {suggestedKeywords.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Suggested Keywords
                      <span className="text-xs text-gray-500">(Click to select)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedKeywords.map((keyword, index) => (
                        <button
                          key={index}
                          onClick={() => toggleKeyword(keyword)}
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors ${
                            selectedKeywords.includes(keyword)
                              ? 'bg-[#FF5341] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Keywords */}
                {selectedKeywords.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Keywords
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#FF5341] text-white"
                        >
                          {keyword}
                          <button
                            onClick={() => toggleKeyword(keyword)}
                            className="ml-2 hover:opacity-80"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Result Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Result Length</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L'].map((length) => (
                      <button
                        key={length}
                        onClick={() => setResultLength(length)}
                        className={`px-4 py-2 rounded-lg flex-1 ${
                          resultLength === length
                            ? 'bg-[#FF5341] text-white'
                            : 'bg-white border hover:bg-gray-50'
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#FF5341] text-white py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors mt-6 flex items-center justify-center">
                  Run SEO Writer
                  <Play className="w-5 h-5 ml-1 text-white fill-white" />
                </button>
              </div>
            </div>

            {/* Right Column - Editor Cards */}
            <div className="col-span-1 md:col-span-8 space-y-4 md:space-y-6">
              {/* Results Cards */}
              <div className="space-y-4 md:space-y-6">
                              {[
                                { editor: mediumEditor, title: "Medium Length Result" },
                                { editor: shortEditor, title: "Long Length Result" }
                              ].map((card, idx) => (
                                <div key={idx} className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
                                  {/* Card Header */}
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-4">
                                    <div className="flex items-center">
                                      <h3 className="font-medium text-sm md:text-base">{card.title}</h3>
                                    </div>
                                    {/* Action Buttons - Grid on mobile, flex on desktop */}
                                    <div className="grid grid-cols-2 md:flex items-center gap-2">
                                     
                        <button className="p-1.5 rounded-lg text-sm bg-red-500 text-white">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
              
                    <div className="overflow-x-auto">
                    <div className="flex items-center gap-2 border-b pb-4 mb-4 min-w-max md:min-w-0">
                      <select 
                        className="border rounded px-2 py-1 text-sm"
                        onChange={e => {
                          if (e.target.value === 'Heading 1') {
                            card.editor?.chain().focus().toggleHeading({ level: 1 }).run()
                          } else if (e.target.value === 'Heading 2') {
                            card.editor?.chain().focus().toggleHeading({ level: 2 }).run()
                          } else {
                            card.editor?.chain().focus().setParagraph().run()
                          }
                        }}
                      >
                        <option>Paragraph</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                      </select>
              
                      <div className="flex items-center border-l pl-2">
                        <button
                          onClick={() => card.editor?.chain().focus().toggleBold().run()}
                          className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                            card.editor?.isActive('bold') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          onClick={() => card.editor?.chain().focus().toggleItalic().run()}
                          className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                            card.editor?.isActive('italic') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <em>I</em>
                        </button>
                        <button
                          onClick={() => card.editor?.chain().focus().toggleUnderline().run()}
                          className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                            card.editor?.isActive('underline') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <u>U</u>
                        </button>
                      </div>
              
                      <div className="flex items-center border-l pl-2">
                        <button
                          onClick={() => card.editor?.chain().focus().setTextAlign('left').run()}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                          }`}
                        >
                          <AlignLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => card.editor?.chain().focus().setTextAlign('center').run()}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                          }`}
                        >
                          <AlignCenter className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => card.editor?.chain().focus().setTextAlign('right').run()}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                          }`}
                        >
                          <AlignRight className="w-4 h-4" />
                        </button>
                      </div>
              
                      <div className="flex items-center border-l pl-2">
                        <button
                          onClick={() => card.editor?.chain().focus().toggleBulletList().run()}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive('bulletList') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => card.editor?.chain().focus().toggleOrderedList().run()}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive('orderedList') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <ListOrdered className="w-4 h-4" />
                        </button>
                      </div>
              
                      <div className="flex items-center border-l pl-2">
                        <button
                          onClick={() => {
                            const url = window.prompt('Enter the URL:')
                            if (url) {
                              card.editor?.chain().focus().setLink({ href: url }).run()
                            }
                          }}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive('link') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <Link2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const url = window.prompt('Enter the image URL:')
                            if (url) {
                              card.editor?.chain().focus().setImage({ src: url }).run()
                            }
                          }}
                          className="p-1.5 rounded hover:bg-gray-100"
                        >
                          <Image className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            // Simple 2x2 table insert
                            card.editor?.chain().focus().insertTable({ rows: 2, cols: 2 }).run()
                          }}
                          className="p-1.5 rounded hover:bg-gray-100"
                        >
                          <Table className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => card.editor?.chain().focus().toggleCodeBlock().run()}
                          className={`p-1.5 rounded hover:bg-gray-100 ${
                            card.editor?.isActive('codeBlock') ? 'bg-gray-200' : ''
                          }`}
                        >
                          <Code className="w-4 h-4" />
                        </button>
                      </div>
              
                      <div className="flex-1"></div>
              
                      <div className="flex items-center">
                        <button className="p-1.5 rounded hover:bg-gray-100">
                          <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-600">
                            <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    </div>
              
                    <EditorContent 
                      editor={card.editor} 
                      className="prose max-w-none min-h-[200px] md:min-h-[300px] text-sm md:text-base" 
                     />
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOWriter;