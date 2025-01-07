import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { 
  Bell, 
  Star, 
  ChevronDown, 
  Settings, 
  Download, 
  Zap,
  Share2, 
  Link2, 
  Table, 
  Image, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Quote, 
  MenuIcon, 
  ChevronLeft,
  Play,
  Code 
} from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';
import Flags from 'country-flag-icons/react/3x2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  { code: 'ru-RU', name: 'Русский', country: 'RU' },
  // Add more languages as needed
];


const aiModels = [
  'OpenAI GPT-4o',
  'GPT-3.5 Turbo',
];

const toneOptions = [
  'Professional',
  'Casual',
  'Friendly',
  'Formal',
  'Persuasive',
  'Informative'
];

const TemplateEditor = () => {
  const { templateId } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [resultLength, setResultLength] = useState('M');
  const [selectedTone, setSelectedTone] = useState(toneOptions[0]);
  const [isToneDropdownOpen, setIsToneDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
const mediumEditorRef = React.useRef(null);
const shortEditorRef = React.useRef(null);


  // First, set up the editors at the component level
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

const handleRunSEOWriter = () => {
  setIsGenerating(true);
  
  // Simulate API call with setTimeout
  setTimeout(() => {
    // Set content for both editors
    mediumEditor?.commands.setContent(`<h1>6 Essential Tips for Building a Successful Startup</h1>
    <p>In today's competitive business landscape, launching a successful startup requires careful planning and execution. Here are six essential tips that every entrepreneur should consider:</p>
    
    <h2>1. Conduct Thorough Market Research</h2>
    <p>Before diving in, understand your target market inside and out. Analyze competitors, identify market gaps, and validate your business idea through customer feedback.</p>
    
    <h2>2. Build a Strong Team</h2>
    <p>Surround yourself with talented individuals who share your vision and complement your skills. A diverse team brings different perspectives and expertise to the table.</p>
    
    <h2>3. Focus on Financial Planning</h2>
    <p>Develop a solid financial plan, including realistic projections and contingency funds. Monitor cash flow carefully and maintain lean operations in the early stages.</p>`);

    shortEditor?.commands.setContent(`<h1>6 Essential Startup Success Tips</h1>
    <p>Launch your startup successfully with these key strategies:</p>
    
    <h2>1. Market Research</h2>
    <p>Know your target market and validate your business idea.</p>
    
    <h2>2. Team Building</h2>
    <p>Recruit talented individuals who complement your skills.</p>
    
    <h2>3. Financial Planning</h2>
    <p>Create solid financial projections and monitor cash flow.</p>`);

    setIsGenerating(false);
    setShowResults(true);
  }, 2000); // 2 second delay to simulate API call
};


const handleDownload = async (editorRef, title) => {
  if (!editorRef.current) return;
  
  setIsDownloading(true);
  try {
    const canvas = await html2canvas(editorRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    setIsDownloading(false);
  }
};


  const formatTemplateName = (name) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex min-h-screen">
    {/* Fixed Sidebar - Hidden on mobile */}
    <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
    </div>

    {/* Main Content - Full width on mobile */}
    <div className={`flex-1 w-full ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
      {/* Navbar */}
      <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
        {/* Mobile menu button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => navigate('/ai-writer')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span></span>
            </button>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5341] rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Only visible when open */}
   {/* Mobile Sidebar - Only visible when open */}
{!isSidebarCollapsed && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
    onClick={() => setIsSidebarCollapsed(true)}
  >
    <div
      className="fixed inset-y-0 left-0 w-64 bg-white transition-transform duration-300 transform translate-x-0"
      onClick={(e) => e.stopPropagation()}
    >
      <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
    </div>
  </div>
)}

{/* Collapsed Sidebar */}
{isSidebarCollapsed && (
  <div
    className="fixed inset-y-0 left-0 w-64 bg-white transition-transform duration-300 transform -translate-x-full md:hidden"
  >
    <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
  </div>
)}


   {/* Content Grid - Adjusted for mobile */}
   <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column - Full width on mobile, 4 cols on md */}
            <div className="col-span-1 md:col-span-4 bg-[#FFFAF3] rounded-xl p-4 md:p-6">
              {/* Template Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold">{formatTemplateName(templateId)}</h2>
                <button 
                  onClick={() => setIsStarred(!isStarred)}
                  className="transition-colors duration-200"
                >
                  <Star 
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isStarred ? 'fill-[#FF5341] text-[#FF5341]' : 'text-[#FF5341]'
                    }`} 
                  />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Turn A Title & Outline Into A Fully Complete High Quality {formatTemplateName(templateId)} In Seconds
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
      className="w-full flex items-center justify-between p-2 border rounded-lg"
    >
      {selectedLanguage && (
        <span className="flex items-center">
          {/* Dynamic flag component */}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content Description/Brief</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="6 Things An Entrepreneur Should Do"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post Focus Idea <span className="text-gray-400">(Comma Separated)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Eg. Hardwork, Smartwork, Automation"
                  />
                </div>

                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Tone of Voice</label>
  <input
    type="text"
    className="w-full p-2 border rounded-lg"
    placeholder="Eg. Professional, Friendly, Informative"
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

                <button className="w-full bg-[#FF5341] text-white py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors mt-6 flex items-center justify-center"
                onClick={handleRunSEOWriter}>
                Run SEO Writer
                <Play className="w-5 h-5 ml-1 text-white fill-white" />
                </button>   


              </div>
            </div>

          {/* Right Column - Editor and Results */}
    <div className="col-span-1 md:col-span-8 space-y-4 md:space-y-6">
      {!showResults && !isGenerating && (
        <div className="bg-[#FFFAF3] rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-4">
            Click "Run SEO Writer" to generate your content
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="bg-[#FFFAF3] rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5341] mx-auto mb-4"></div>
          <p className="text-gray-600">Generating content...</p>
        </div>
      )}

      {showResults && !isGenerating && (
        <div className="space-y-4 md:space-y-6">
          {[
            { editor: mediumEditor, title: "Medium Length Result" },
            { editor: shortEditor, title: "Short Length Result" }
          ].map((card, idx) => (
                  <div key={idx} className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
                    {/* Card Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-4">
                      <div className="flex items-center">
                        <h3 className="font-medium text-sm md:text-base">{card.title}</h3>
                      </div>
                      {/* Action Buttons - Grid on mobile, flex on desktop */}
                      <div className="grid grid-cols-2 md:flex items-center gap-2">
                      <button 
  onClick={() => handleDownload(idx === 0 ? mediumEditorRef : shortEditorRef, card.title)}
  disabled={isDownloading}
  className={`p-1.5 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition-colors ${
    isDownloading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {isDownloading ? (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
  ) : (
    <Download className="w-4 h-4" />
  )}
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

      <div ref={idx === 0 ? mediumEditorRef : shortEditorRef}>
  <EditorContent 
    editor={card.editor} 
    className="prose max-w-none min-h-[200px] md:min-h-[300px] text-sm md:text-base" 
  />
</div>
    </div>
  ))}
</div>
)}
</div>
</div>
</div>
</div>
</div>

  );
};

export default TemplateEditor;