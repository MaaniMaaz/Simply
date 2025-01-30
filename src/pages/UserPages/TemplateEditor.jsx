// src/pages/UserPages/TemplateEditor.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { 
    Bell, 
    MenuIcon, 
    ChevronLeft,
    ChevronDown,
    Play,
    Download,
    AlignLeft, 
    AlignCenter, 
    AlignRight, 
    List, 
    ListOrdered,
    X,
    Check 
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
import { templateService } from '../../api/template';
import { documentService } from '../../api/document';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Available languages
const languages = [
    { code: 'en-US', name: 'English (US)', country: 'US' },
    { code: 'es-ES', name: 'Spanish', country: 'ES' },
    { code: 'fr-FR', name: 'French', country: 'FR' },
    { code: 'de-DE', name: 'German', country: 'DE' },
    { code: 'it-IT', name: 'Italian', country: 'IT' },
    { code: 'pt-BR', name: 'Portuguese', country: 'BR' },
    { code: 'nl-NL', name: 'Dutch', country: 'NL' },
    { code: 'pl-PL', name: 'Polish', country: 'PL' },
    { code: 'ru-RU', name: 'Russian', country: 'RU' }
];

// Content length options
const contentLengths = [
    { id: 'S', label: 'Short (300 words)' },
    { id: 'M', label: 'Medium (600 words)' },
    { id: 'L', label: 'Long (1200 words)' }
];

// Language selector component
const LanguageSelector = ({ selectedLanguage, onChange, isOpen, setIsOpen }) => (
    <div className="relative mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
        </label>
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-2 border rounded-lg bg-white"
        >
            <span className="flex items-center">
                {(() => {
                    const FlagComponent = Flags[selectedLanguage.country];
                    return <FlagComponent className="w-5 h-4 mr-2" />;
                })()}
                {selectedLanguage.name}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {languages.map((lang) => {
                    const FlagComponent = Flags[lang.country];
                    return (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                                onChange(lang);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                            <FlagComponent className="w-5 h-4 mr-2" />
                            {lang.name}
                        </button>
                    );
                })}
            </div>
        )}
    </div>
);

// Custom field component
const CustomField = ({ field, value, onChange, error }) => {
    if (field.type === 'free-text') {
        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.question} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    className={`w-full p-2 border rounded-lg ${error ? 'border-red-500' : ''}`}
                    placeholder={`Enter ${field.question.toLowerCase()}...`}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }

    if (field.type === 'dropdown') {
        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.question} {field.required && <span className="text-red-500">*</span>}
                </label>
                <select
                    value={value || ''}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    className={`w-full p-2 border rounded-lg bg-white ${error ? 'border-red-500' : ''}`}
                >
                    <option value="">Select an option</option>
                    {field.options?.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }

    return null;
};

const TemplateEditor = () => {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [template, setTemplate] = useState(null);
    const [fieldValues, setFieldValues] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [selectedLength, setSelectedLength] = useState('M');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [currentDocumentId, setCurrentDocumentId] = useState(null);
    const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

    // Editor configuration
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
        onUpdate: ({ editor }) => {
            if (!currentDocumentId) return;

            if (autoSaveTimeout) {
                clearTimeout(autoSaveTimeout);
            }

            const timeoutId = setTimeout(() => {
                autoSaveChanges(editor.getHTML());
            }, 5000);

            setAutoSaveTimeout(timeoutId);
        }
    });

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (autoSaveTimeout) {
                clearTimeout(autoSaveTimeout);
            }
        };
    }, [autoSaveTimeout]);

    // Handle resize effect
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

    // Fetch template effect
    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await templateService.getTemplateById(templateId);
                setTemplate(response.data);
                
                // Initialize field values
                if (response.data.fields) {
                    const initialValues = Object.fromEntries(
                        response.data.fields.map(field => [field.id, ''])
                    );
                    setFieldValues(initialValues);
                }
            } catch (error) {
                showToastMessage(error.message || 'Error fetching template', 'error');
            }
        };

        if (templateId) {
            fetchTemplate();
        }
    }, [templateId]);

    const validateFields = () => {
        if (!template?.fields) return true;

        const errors = {};
        let hasErrors = false;

        template.fields.forEach(field => {
            if (field.required && (!fieldValues[field.id] || !fieldValues[field.id].trim())) {
                errors[field.id] = 'This field is required';
                hasErrors = true;
            }
        });

        setFieldErrors(errors);
        return !hasErrors;
    };

    const handleFieldChange = (fieldId, value) => {
        setFieldValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
        
        // Clear error when field is filled
        if (fieldErrors[fieldId]) {
            setFieldErrors(prev => ({
                ...prev,
                [fieldId]: undefined
            }));
        }
    };

    const handleRunTemplate = async () => {
        if (!validateFields()) {
            showToastMessage('Please fill in all required fields', 'error');
            return;
        }

        setIsGenerating(true);

        try {
            const response = await templateService.runTemplate(templateId, {
                fields: {
                    ...fieldValues,
                    language: selectedLanguage
                },
                resultLength: selectedLength
            });

            if (response.success) {
                editor?.commands.setContent(response.data.content);
                setShowResults(true);
                await saveInitialDocument(response.data.content);
                showToastMessage('Content generated successfully');
            }
        } catch (error) {
            showToastMessage(error.message || 'Error generating content', 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const saveInitialDocument = async (content) => {
        try {
            const response = await documentService.saveDocument({
                name: template?.name || 'AI Generated Content',
                type: 'AI Writer',
                content: content
            });

            if (response.success) {
                setCurrentDocumentId(response.data._id);
                showToastMessage('Document saved successfully');
            }
        } catch (error) {
            showToastMessage(error.message || 'Error saving document', 'error');
        }
    };

    const autoSaveChanges = async (content) => {
        if (!currentDocumentId) return;

        try {
            await documentService.updateDocument(currentDocumentId, content);
        } catch (error) {
            console.error('Auto-save error:', error);
        }
    };

    const handleDownload = async () => {
        if (!editor?.getHTML()) return;

        try {
            const element = document.querySelector('.ProseMirror');
            if (!element) return;

            const canvas = await html2canvas(element);
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save(`ai-content-${Date.now()}.pdf`);
            
            showToastMessage('Content downloaded successfully');
        } catch (error) {
            showToastMessage('Error downloading content', 'error');
        }
    };

    const showToastMessage = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
                <Sidebar 
                    isCollapsed={isSidebarCollapsed} 
                    setIsCollapsed={setIsSidebarCollapsed} 
                />
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
                            
                            <button 
                                onClick={() => navigate('/ai-writer')}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                <span>Back to AI Writer</span>
                            </button>
                            <div className="relative">
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

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Left Column */}
                        <div className="col-span-1 md:col-span-4 bg-[#FFFAF3] rounded-xl p-4 md:p-6">
                            {template && (
                                <>
                                    <h2 className="text-lg md:text-xl font-semibold mb-4">{template.name}</h2>
                                    <p className="text-sm text-gray-600 mb-6">{template.description}</p>

                                    {/* Language Selector */}
                                    <LanguageSelector
                                        selectedLanguage={selectedLanguage}
                                        onChange={setSelectedLanguage}
                                        isOpen={isLanguageDropdownOpen}
                                        setIsOpen={setIsLanguageDropdownOpen}
                                    />

                                   

                                    {/* Template Fields */}
                                    {template.fields && template.fields.length > 0 && (
                                        <div className="space-y-4">
                                            {template.fields.map((field) => (
                                                <CustomField
                                                    key={field.id}
                                                    field={field}
                                                    value={fieldValues[field.id]}
                                                    onChange={handleFieldChange}
                                                    error={fieldErrors[field.id]}
                                                />
                                            ))}
                                        </div>
                                    )}
                                     {/* Content Length Selection */}
                                     <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Content Length
                                        </label>
                                        <div className="flex gap-2">
                                            {contentLengths.map(length => (
                                                <button
                                                    key={length.id}
                                                    onClick={() => setSelectedLength(length.id)}
                                                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                                                        selectedLength === length.id
                                                            ? 'bg-[#FF5341] text-white'
                                                            : 'bg-white border hover:bg-gray-50'
                                                    }`}
                                                    title={length.label}
                                                >
                                                    {length.id}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {contentLengths.find(l => l.id === selectedLength)?.label}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleRunTemplate}
                                        disabled={isGenerating}
                                        className={`w-full bg-[#FF5341] text-white py-3 rounded-lg hover:bg-[#FF5341]/90 transition-colors mt-6 flex items-center justify-center ${
                                            isGenerating ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isGenerating ? (
                                            <>
                                                Generating...
                                                <div className="ml-2 animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                            </>
                                        ) : (
                                            <>
                                                Run AI Writer
                                                <Play className="w-4 h-4 ml-2 fill-current" />
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Right Column - Editor Card */}
                        <div className="col-span-1 md:col-span-8 space-y-4">
                            {!showResults && !isGenerating && (
                                <div className="bg-[#FFFAF3] rounded-xl p-8 text-center">
                                    <p className="text-gray-600 mb-4">
                                        Fill in the fields and click "Run AI Writer" to generate your content
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
                                <div className="bg-[#FFFAF3] rounded-xl p-4 md:p-6">
                                    {/* Editor Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-4">
                                        <div className="flex items-center">
                                            <h3 className="font-medium text-sm md:text-base">Generated Content</h3>
                                        </div>
                                        <div className="grid grid-cols-2 md:flex items-center gap-2">
                                            <button
                                                onClick={handleDownload}
                                                className="p-1.5 rounded-lg text-sm bg-[#FF5341] text-white hover:bg-[#FF5341]/90"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Editor Toolbar */}
                                    <div className="overflow-x-auto">
                                        <div className="flex items-center gap-2 border-b pb-4 mb-4 min-w-max md:min-w-0">
                                            <select
                                                className="border rounded px-2 py-1 text-sm"
                                                onChange={e => {
                                                    if (e.target.value === 'Heading 1') {
                                                        editor?.chain().focus().toggleHeading({ level: 1 }).run();
                                                    } else if (e.target.value === 'Heading 2') {
                                                        editor?.chain().focus().toggleHeading({ level: 2 }).run();
                                                    } else {
                                                        editor?.chain().focus().setParagraph().run();
                                                    }
                                                }}
                                            >
                                                <option>Paragraph</option>
                                                <option>Heading 1</option>
                                                <option>Heading 2</option>
                                            </select>

                                            <div className="flex items-center border-l pl-2">
                                                <button
                                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                                                        editor?.isActive('bold') ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <strong>B</strong>
                                                </button>
                                                <button
                                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                                                        editor?.isActive('italic') ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <em>I</em>
                                                </button>
                                                <button
                                                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 min-w-[28px] flex justify-center ${
                                                        editor?.isActive('underline') ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <u>U</u>
                                                </button>
                                            </div>

                                            <div className="flex items-center border-l pl-2">
                                                <button
                                                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 ${
                                                        editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <AlignLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 ${
                                                        editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <AlignCenter className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 ${
                                                        editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <AlignRight className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center border-l pl-2">
                                                <button
                                                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 ${
                                                        editor?.isActive('bulletList') ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <List className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                                    className={`p-1.5 rounded hover:bg-gray-100 ${
                                                        editor?.isActive('orderedList') ? 'bg-gray-200' : ''
                                                    }`}
                                                >
                                                    <ListOrdered className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Editor Content */}
                                    <EditorContent
                                        editor={editor}
                                        className="prose max-w-none min-h-[300px] text-sm md:text-base"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed bottom-4 right-4 ${
                    toastType === 'success' ? 'bg-gray-800' : 'bg-red-500'
                } text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up z-50`}>
                    {toastType === 'success' ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <X className="w-4 h-4" />
                    )}
                    <span>{toastMessage}</span>
                </div>
            )}
        </div>
    );
};

export default TemplateEditor;