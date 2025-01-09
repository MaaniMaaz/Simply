// src/pages/AdminPages/Notifications.jsx
import React, { useState } from 'react';
import { Send, AlertCircle, Check } from 'lucide-react';

const Notifications = () => {
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSendNotification = () => {
    if (!message.trim()) return;

    // Here we'll integrate with backend later to send notifications
    console.log('Sending notification:', message);
    
    // Show success toast
    setShowToast(true);
    setMessage(''); // Clear the input
    setTimeout(() => setShowToast(false), 3000);
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
            disabled={!message.trim()}
            className={`w-full bg-[#FF5341] text-white py-3 rounded-lg flex items-center justify-center space-x-2
              ${!message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF5341]/90'}`}
          >
            <Send className="w-4 h-4" />
            <span>Send Notification</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
          <Check className="w-4 h-4" />
          <span>Notification sent successfully!</span>
        </div>
      )}
    </div>
  );
};

export default Notifications;