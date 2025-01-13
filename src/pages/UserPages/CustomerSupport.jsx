import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { MessageSquare, Send, MenuIcon, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerSupport = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-[#FFFAF3]">
      {/* Sidebar - Hidden on mobile */}
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
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-xl font-semibold">Support Chat</h1>
                <p className="text-sm text-gray-600">Get help from our support team</p>
              </div>
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

        {/* Mobile Sidebar */}
        {!isSidebarCollapsed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarCollapsed(true)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white" onClick={e => e.stopPropagation()}>
              <Sidebar isCollapsed={false} setIsCollapsed={setIsSidebarCollapsed} />
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex flex-col h-[calc(100vh-12rem)]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MessageSquare className="w-12 h-12 mb-2" />
                    <p>Send a message to start the conversation</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] md:max-w-[70%] rounded-xl p-3 ${
                        message.sender === 'user' 
                          ? 'bg-[#FF5341] text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <p className="break-words">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;