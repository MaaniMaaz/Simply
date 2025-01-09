//src/pages/UserPages/CustomerSupport.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { MessageSquare, Send } from 'lucide-react';

const CustomerSupport = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate admin response
    setTimeout(() => {
      const adminResponse = {
        id: Date.now() + 1,
        text: 'Thank you for your message. An admin will respond shortly.',
        sender: 'admin',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, adminResponse]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      <div className={`flex-1 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        <div className="flex flex-col h-screen p-4">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user' ? 'bg-[#FF5341] text-white' : 'bg-white border'
                }`}>
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:ring-[#FF5341]"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;