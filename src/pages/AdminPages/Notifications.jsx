import React, { useState, useEffect } from 'react';
import { adminNotificationService } from '../../api/adminNotification';
import { 
    Bell, 
    Edit2,
    Save,
    Check,
    X,
    AlertTriangle,
    ChevronDown
} from 'lucide-react';

const NotificationTemplateCard = ({ template, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    // Update state when template prop changes
    const [message, setMessage] = useState(template?.message_template || '');
    const [isActive, setIsActive] = useState(template?.is_active || false);

    // Add useEffect to update state when template changes
    useEffect(() => {
        setMessage(template?.message_template || '');
        setIsActive(template?.is_active || false);
    }, [template]); // Dependency on template prop

    const handleSave = async () => {
        await onSave({
            trigger_type: template.trigger_type,
            message_template: message,
            is_active: isActive
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-medium text-lg capitalize mb-1">
                        {template.trigger_type} Notification
                    </h3>
                    <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="text-sm text-gray-600">
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <Edit2 className="w-5 h-5 text-gray-600" />
                    </button>
                ) : (
                    <button
                        onClick={handleSave}
                        className="p-2 hover:bg-gray-100 rounded-lg text-[#FF5341]"
                    >
                        <Save className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 border rounded-lg resize-none focus:ring-[#FF5341] focus:border-[#FF5341]"
                        rows={3}
                    />
                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-[#FF5341] rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">Active</span>
                        </label>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700">{message}</p>
            )}

            {isEditing && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-700">
                        <p className="font-medium mb-1">Available Variables:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>{'{{username}}'} - User's name</li>
                          <li>{'{{planName}}'} - Subscription plan name</li>
                          <li>{'{{expiryDate}}'} - Plan expiry date</li>
                          <li>{'{{creditsLeft}}'} - Remaining credits</li>
                          <li>{'{{templateName}}'} - Template name</li>
                      </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const Notifications = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    useEffect(() => {
        if (templates.length > 0 && !selectedTemplate) {
            setSelectedTemplate(templates[0]);
        }
    }, [templates]);

    const fetchTemplates = async () => {
        try {
            const response = await adminNotificationService.getTemplates();
            setTemplates(response.data);
        } catch (error) {
            showToastMessage(error.message || 'Error fetching templates', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTemplate = async (templateData) => {
        try {
            await adminNotificationService.updateTemplate(templateData);
            await fetchTemplates();
            showToastMessage('Template updated successfully');
        } catch (error) {
            showToastMessage(error.message || 'Error updating template', 'error');
        }
    };

    const showToastMessage = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Notification Templates</h1>
                <p className="text-gray-600">Manage system notification messages and settings</p>
            </div>

            {/* Template Selection and Editor */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5341]"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Template Selector Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Notification Template
                        </label>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full md:w-96 flex items-center justify-between p-2 border rounded-lg bg-white hover:bg-gray-50"
                        >
                            <span className="capitalize">
                                {selectedTemplate?.trigger_type || 'Select a template'}
                            </span>
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute w-full md:w-96 mt-1 bg-white border rounded-lg shadow-lg z-20">
                                {templates.map((template) => (
                                    <button
                                        key={template.trigger_type}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                                        onClick={() => {
                                            setSelectedTemplate(template);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {template.trigger_type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected Template Card */}
                    {selectedTemplate && (
                        <NotificationTemplateCard
                            template={selectedTemplate}
                            onSave={handleSaveTemplate}
                        />
                    )}
                </div>
            )}

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

export default Notifications;