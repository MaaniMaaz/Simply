// src/pages/UserPages/AIWriter.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { useNavigate } from 'react-router-dom';
import { 
    Bell, 
    Star, 
    Search, 
    ArrowRight, 
    MenuIcon,
    Check,
    X
} from 'lucide-react';
import { templateService } from '../../api/template';

const TemplateCard = ({ template, isFavorite, onToggleFavorite, onClick }) => {
    return (
        <div 
            className="bg-[#FF5341] rounded-xl p-4 text-white cursor-pointer hover:bg-[#FF5341]/90 transition-all relative"
            onClick={onClick}
        >
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/20">
                <h3 className="text-base md:text-lg font-medium">{template.name}</h3>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(template._id);
                        }}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Star 
                            className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} 
                        />
                    </button>
                    <button className="text-white">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <p className="text-xs md:text-sm text-white/90">{template.description}</p>
        </div>
    );
};

const AIWriter = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [templates, setTemplates] = useState([]);
    const [favoriteTemplates, setFavoriteTemplates] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

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
        fetchTemplatesAndFavorites();
    }, []);

    const fetchTemplatesAndFavorites = async () => {
        try {
            const templatesResponse = await templateService.getTemplates();
            const favoritesResponse = await templateService.getFavorites();
            
            setTemplates(templatesResponse.data);
            // Extract just the ids from the favorite templates
            const favoriteIds = favoritesResponse.data.map(template => template._id);
            setFavoriteTemplates(favoriteIds);
        } catch (error) {
            showToastMessage(error.message || 'Error fetching templates', 'error');
        }
    };

    const handleToggleFavorite = async (templateId) => {
        try {
            const response = await templateService.toggleFavorite(templateId);
            
            if (response.success) {
                setFavoriteTemplates(prev => {
                    if (prev.includes(templateId)) {
                        return prev.filter(id => id !== templateId);
                    }
                    return [...prev, templateId];
                });
                
                showToastMessage(response.message);
            }
        } catch (error) {
            showToastMessage(error.message || 'Error updating favorite', 'error');
            // Refresh templates and favorites on error to ensure sync
            fetchTemplatesAndFavorites();
        }
    };

    const showToastMessage = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (selectedCategory === 'Favorites') {
            return matchesSearch && favoriteTemplates.includes(template._id);
        }
        
        if (selectedCategory === 'All') {
            return matchesSearch;
        }

        return matchesSearch && template.category === selectedCategory;
    });

    // Rest of your component (return statement) remains exactly the same
    return (
        <div className="flex min-h-screen">
            {/* Your existing JSX */}
            <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
                <Sidebar 
                    isCollapsed={isSidebarCollapsed} 
                    setIsCollapsed={setIsSidebarCollapsed} 
                />
            </div>

            <div className={`flex-1 w-full ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">AI Writer</h2>
                        <p className="text-gray-600">Select a template to start creating content</p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {['All', 'Favorites', ...templates.reduce((categories, template) => {
                                if (!categories.includes(template.category)) {
                                    categories.push(template.category);
                                }
                                return categories;
                            }, [])].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        selectedCategory === category
                                            ? 'bg-[#FF5341] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                        {filteredTemplates.length > 0 ? (
                            filteredTemplates.map((template) => (
                                <TemplateCard 
                                    key={template._id}
                                    template={template}
                                    isFavorite={favoriteTemplates.includes(template._id)}
                                    onToggleFavorite={handleToggleFavorite}
                                    onClick={() => navigate(`/ai-writer/template/${template._id}`)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No templates found matching your criteria
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showToast && (
                <div className={`fixed bottom-4 right-4 ${
                    toastType === 'success' ? 'bg-gray-800' : 'bg-red-500'
                } text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up`}>
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

export default AIWriter;