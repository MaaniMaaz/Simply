// src/pages/AdminPages/Notifications.jsx
import React, { useState } from 'react';
import { 
  Send, 
  AlertCircle,
  Check,
  X
} from 'lucide-react';
import { adminNotificationService } from '../../api/adminNotification';

const Notifications = () => {
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSendNotification = async () => {
    if (!message.trim()) {
      showToastMessage('Please enter a notification message', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await adminNotificationService.sendNotification(message.trim());
      showToastMessage('Notification sent successfully');
      setMessage(''); // Clear the input
    } catch (error) {
      showToastMessage(error.message || 'Error sending notification', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Send Notification</h1>
        <p className="text-gray-600">Write and send notifications to all users</p>
      </div>

      {/* Notification Form */}
      <div className="bg-[#FFFAF3] rounded-xl p-6">
        <div className="space-y-6">
          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 h-40 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341] resize-none"
              placeholder="Type your notification message here..."
            />
          </div>

          {/* Warning Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                This notification will be sent to all users. Please review your message carefully before sending.
              </p>
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendNotification}
            disabled={isSubmitting || !message.trim()}
            className={`w-full bg-[#FF5341] text-white py-3 rounded-lg flex items-center justify-center space-x-2
              ${!message.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF5341]/90'}`}
          >
            {isSubmitting ? (
              <>
                <span>Sending...</span>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Notification</span>
              </>
            )}
          </button>
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

export default Notifications;