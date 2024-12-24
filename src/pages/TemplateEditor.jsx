import React, { useState } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import { Bell, Star, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const languages = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  // Add more languages as needed
];

const aiModels = [
  'OpenAI GPT-4o',
  'GPT-3.5 Turbo',
  // Add more models as needed
];

const TemplateEditor = () => {
  const { templateId } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [resultLength, setResultLength] = useState('M'); // S, M, or L

  const editor = useEditor({
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
  });

  const formatTemplateName = (name) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 h-screen">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-end">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5341] rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Template Settings */}
            <div className="bg-[#FFFAF3] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{formatTemplateName(templateId)}</h2>
                <Star className="w-6 h-6 text-[#FF5341]" />
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Turn A Title & Outline Into A Fully Complete High Quality {formatTemplateName(templateId)} In Seconds
              </p>

              <div className="bg-[#FF5341] text-white rounded-lg p-3 mb-6">
                Your Balance Is 3000 Credits
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Language Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="w-full flex items-center justify-between p-2 border rounded-lg"
                  >
                    <span>{selectedLanguage.flag} {selectedLanguage.name}</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-20">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLanguageDropdownOpen(false);
                          }}
                        >
                          {lang.flag} {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Other form fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Eg. Amazing Cuisine Of Australia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post Focus Idea <span className="text-gray-400">(Coming Required)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Eg. Generative AI, AI, LLM's, RAG"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Eg. AI Enthusiasts, Entrepreneurs"
                  />
                </div>

                {/* AI Model Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">AI Model</label>
                  <button
                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                    className="w-full flex items-center justify-between p-2 border rounded-lg"
                  >
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {isModelDropdownOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-20">
                      {aiModels.map((model) => (
                        <button
                          key={model}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedModel(model);
                            setIsModelDropdownOpen(false);
                          }}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Result Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Result Length</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L'].map((length) => (
                      <button
                        key={length}
                        onClick={() => setResultLength(length)}
                        className={`px-4 py-2 rounded-lg ${
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

                <button className="w-full bg-[#FF5341] text-white py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors mt-6">
                  Run Template ▶
                </button>
              </div>
            </div>

            {/* Right Column - Editor */}
            <div className="bg-[#FFFAF3] rounded-xl p-6">
              <div className="flex items-center gap-2 border-b pb-4 mb-4">
                <select className="border rounded px-2 py-1">
                  <option>Paragraph</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>

                <button
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`px-2 py-1 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                >
                  B
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`px-2 py-1 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                >
                  I
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`px-2 py-1 rounded ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
                >
                  U
                </button>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
                  >
                    ↔
                  </button>
                  <button
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    className={`px-2 py-1 rounded ${editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
                  >
                    →
                  </button>
                </div>
              </div>

              <EditorContent editor={editor} className="prose max-w-none min-h-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;