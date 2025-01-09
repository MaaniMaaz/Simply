// src/pages/AdminPages/Frontend.jsx
import React, { useState } from 'react';
import { 
  Layout, 
  Edit2, 
  X,
  Save,
  AlertTriangle,
  PenTool,
  FileText,
  Target,
  DollarSign,
  HelpCircle
} from 'lucide-react';

// Current content from Home page (in real app, this would come from backend)
const initialContent = {
  hero: {
    title: "Elevate Your Content Creation",
    subtitle: "With AI-Powered Precision",
    description: "Come see why leading businesses chose Simply for better results using artificial intelligence.",
    buttonText: "Start Free Trial"
  },
  whatWeOffer: {
    title: "Learn what Simply Can do foundation",
    subtitle: "All the features you need to take a secure, controlled & impactful approach to AI.",
    buttonText: "Learn More",
    cards: [
      {
        title: "Work with the latest Content Writing",
        description: "Content Writing with latest Models with Simply's multi-model AI Engine"
      },
      {
        title: "Text and images, all in one place",
        description: "Creativity requires text & strategy – Simply's has all"
      },
      {
        title: "Security & privacy of the highest degree",
        description: "We don't allow models to train on your data – period"
      },
      {
        title: "Dedicated Simply resources",
        description: "You get access to a team of AI experts who have your back"
      }
    ]
  },
  useCase: {
    title: "Solutions for All",
    subtitle: "A library of Solutions for all you needs. Custom Solutions on demand",
    buttonText: "Explore the Blog",
    cards: [
      {
        title: "Solution for Product Marketers",
        description: "Uplevel product launches, messaging and enablement, all while empowering your team to achieve 10x results"
      },
      {
        title: "Solution for Product Marketers",
        description: "Uplevel product launches, messaging and enablement, all while empowering your team to achieve 10x results"
      },
      {
        title: "How to Pilot AI at your company",
        description: "Generative AI content program at your company."
      }
    ]
  },
  pricing: {
    title: "Choose the right plan for you",
    subtitle: "Start with our free trial. No credit card needed.",
    plans: [
      {
        name: "Professional",
        price: "$19",
        period: "/ Month",
        features: [
          "25,000 Credits",
          "Team Collaboration tools",
          "Real-Time Document Editing",
          "Version History",
          "Shared & Private Content Libraries"
        ]
      },
      {
        name: "Enterprise",
        price: "$49",
        period: "/ Month",
        features: [
          "50,000 Credits",
          "Multilingual Content Translation",
          "Automated Brand Voice Validation",
          "Integrated With Third-Party Tools",
          "Advanced User Permissions"
        ]
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    questions: [
      {
        question: "How can i join?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis."
      },
      {
        question: "Can i create me own template?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
      },
      {
        question: "Can i create SEO articles?",
        answer: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla."
      }
    ]
  }
};

const SectionCard = ({ title, description, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl p-6 cursor-pointer hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4">
        <div className="bg-[#FF5341] bg-opacity-10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#FF5341]" />
        </div>
        <div>
          <h3 className="font-medium text-lg mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <Edit2 className="w-5 h-5 text-gray-400" />
    </div>
  </div>
);

const EditModal = ({ section, content, isOpen, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState(null);

  // Reset editedContent when section changes
  React.useEffect(() => {
    if (content && isOpen) {
      setEditedContent(content);
    }
    return () => setEditedContent(null); // Cleanup on unmount or section change
  }, [content, section, isOpen]);

  const handleClose = () => {
    setEditedContent(null);
    onClose();
  };

  if (!isOpen || !editedContent) return null;

  const handleSave = () => {
    onSave(section, editedContent);
    handleClose();
  };

  // Add safety check for arrays
  const safeArray = (arr) => Array.isArray(arr) ? arr : [];

  const renderEditableContent = () => {
    if (!editedContent) return null;
    
    switch (section) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Title
              </label>
              <input
                type="text"
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={editedContent.subtitle || ''}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editedContent.description || ''}
                onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={editedContent.buttonText || ''}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        );

      case 'whatWeOffer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={editedContent.title || ''}
                onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={editedContent.subtitle || ''}
                onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={editedContent.buttonText || ''}
                onChange={(e) => setEditedContent({ ...editedContent, buttonText: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Feature Cards
              </label>
              <div className="space-y-4">
                {safeArray(editedContent.cards).map((card, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, title: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg mb-2"
                      placeholder="Card Title"
                    />
                    <textarea
                      value={card.description || ''}
                      onChange={(e) => {
                        const newCards = [...safeArray(editedContent.cards)];
                        newCards[index] = { ...card, description: e.target.value };
                        setEditedContent({ ...editedContent, cards: newCards });
                      }}
                      className="w-full p-2 border rounded-lg"
                      rows={2}
                      placeholder="Card Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

        case 'useCase':
            return (
              <div className=" space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={editedContent.title || ''}
                    onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={editedContent.subtitle || ''}
                    onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Use Case Cards
                  </label>
                  <div className="space-y-4">
                    {safeArray(editedContent.cards).map((card, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => {
                            const newCards = [...safeArray(editedContent.cards)];
                            newCards[index] = { ...card, title: e.target.value };
                            setEditedContent({ ...editedContent, cards: newCards });
                          }}
                          className="w-full p-2 border rounded-lg mb-2"
                          placeholder="Card Title"
                        />
                        <textarea
                          value={card.description || ''}
                          onChange={(e) => {
                            const newCards = [...safeArray(editedContent.cards)];
                            newCards[index] = { ...card, description: e.target.value };
                            setEditedContent({ ...editedContent, cards: newCards });
                          }}
                          className="w-full p-2 border rounded-lg"
                          rows={2}
                          placeholder="Card Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
    
          case 'pricing':
            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={editedContent.title || ''}
                    onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={editedContent.subtitle || ''}
                    onChange={(e) => setEditedContent({ ...editedContent, subtitle: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Pricing Plans
                  </label>
                  <div className="space-y-6">
                    {safeArray(editedContent.plans).map((plan, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <input
                            type="text"
                            value={plan.name || ''}
                            onChange={(e) => {
                              const newPlans = [...safeArray(editedContent.plans)];
                              newPlans[index] = { ...plan, name: e.target.value };
                              setEditedContent({ ...editedContent, plans: newPlans });
                            }}
                            className="flex-1 p-2 border rounded-lg"
                            placeholder="Plan Name"
                          />
                          <input
                            type="text"
                            value={plan.price || ''}
                            onChange={(e) => {
                              const newPlans = [...safeArray(editedContent.plans)];
                              newPlans[index] = { ...plan, price: e.target.value };
                              setEditedContent({ ...editedContent, plans: newPlans });
                            }}
                            className="w-24 p-2 border rounded-lg"
                            placeholder="Price"
                          />
                        </div>
                        <div className="space-y-2">
                          {safeArray(plan.features).map((feature, featureIndex) => (
                            <input
                              key={featureIndex}
                              type="text"
                              value={feature || ''}
                              onChange={(e) => {
                                const newPlans = [...safeArray(editedContent.plans)];
                                newPlans[index].features[featureIndex] = e.target.value;
                                setEditedContent({ ...editedContent, plans: newPlans });
                              }}
                              className="w-full p-2 border rounded-lg"
                              placeholder={`Feature ${featureIndex + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
    
          case 'faq':
            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={editedContent.title || ''}
                    onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    FAQ Items
                  </label>
                  <div className="space-y-4">
                    {safeArray(editedContent.questions).map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <input
                          type="text"
                          value={item.question || ''}
                          onChange={(e) => {
                            const newQuestions = [...safeArray(editedContent.questions)];
                            newQuestions[index] = { ...item, question: e.target.value };
                            setEditedContent({ ...editedContent, questions: newQuestions });
                          }}
                          className="w-full p-2 border rounded-lg mb-2"
                          placeholder="Question"
                        />
                        <textarea
                          value={item.answer || ''}
                          onChange={(e) => {
                            const newQuestions = [...safeArray(editedContent.questions)];
                            newQuestions[index] = { ...item, answer: e.target.value };
                            setEditedContent({ ...editedContent, questions: newQuestions });
                          }}
                          className="w-full p-2 border rounded-lg"
                          rows={2}
                          placeholder="Answer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
    
          default:
            return null;
        }
      };
    
      return (
        <div className=" fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="bg-white rounded-xl w-full max-w-3xl mx-4 my-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold">
                Edit {section.charAt(0).toUpperCase() + section.slice(1)} Section
              </h3>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {renderEditableContent()}
    
              {/* Warning Message */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">
                      Important Note
                    </h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      Changes made here will be reflected on the home page. Please review carefully before saving.
                    </p>
                  </div>
                </div>
              </div>
    
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#FF5341] text-white px-6 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    const Frontend = () => {
      const [content, setContent] = useState(initialContent);
      const [selectedSection, setSelectedSection] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleOpenSection = (section) => {
        // First close any open modal
        setIsModalOpen(false);
        setSelectedSection(null);
        
        // Wait for close animation
        setTimeout(() => {
          setSelectedSection(section);
          setIsModalOpen(true);
        }, 100);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
          setSelectedSection(null);
        }, 100);
      };
    
      const handleSave = (section, newContent) => {
        setContent(prev => ({
          ...prev,
          [section]: newContent
        }));
        handleCloseModal();
      };
    
      return (
        <div className="p-4 md:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Frontend Management</h1>
            <p className="text-gray-600">Manage and update your website's content sections</p>
          </div>
    
          {/* Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard
              title="Hero Section"
              description="Edit main headline and hero content"
              icon={PenTool}
              onClick={() => handleOpenSection('hero')}
            />
    
            <SectionCard
              title="What We Offer"
              description="Update features and capabilities section"
              icon={FileText}
              onClick={() => handleOpenSection('whatWeOffer')}
            />
    
            <SectionCard
              title="Use Case"
              description="Manage use case examples and solutions"
              icon={Target}
              onClick={() => handleOpenSection('useCase')}
            />
    
            <SectionCard
              title="Pricing Section"
              description="Update pricing plans and features"
              icon={DollarSign}
              onClick={() => handleOpenSection('pricing')}
            />
    
            <SectionCard
              title="FAQ Section"
              description="Manage frequently asked questions"
              icon={HelpCircle}
              onClick={() => handleOpenSection('faq')}
            />
          </div>
    
          {/* Edit Modal */}
          {selectedSection && (
            <EditModal
              section={selectedSection}
              content={content[selectedSection]}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSave={handleSave}
            />
          )}
        </div>
      );
    };
    
    export default Frontend;// src/pages/AdminPages/Frontend.jsx