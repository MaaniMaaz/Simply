import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Search, ChevronLeft } from 'lucide-react';

const AdminSupport = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    // Handle chat list visibility on resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowChatList(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Dummy data
    setChats([
      {
        id: 1,
        userName: 'John Doe',
        messages: [
          { id: 1, text: 'Hi, I need help with my account', sender: 'user', timestamp: '10:30 AM' },
          { id: 2, text: 'Sure, how can I help?', sender: 'admin', timestamp: '10:31 AM' }
        ]
      },
      {
        id: 2,
        userName: 'Jane Smith',
        messages: [
          { id: 1, text: 'Is there anyone available?', sender: 'user', timestamp: '11:20 AM' }
        ]
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'admin',
      timestamp: new Date().toLocaleTimeString()
    };

    setChats(chats.map(chat => 
      chat.id === activeChat.id 
        ? { ...chat, messages: [...chat.messages, newMsg] }
        : chat
    ));
    
    setActiveChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    
    setNewMessage('');
  };

  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    if (window.innerWidth < 768) {
      setShowChatList(false);
    }
  };

  

return (
  <div className="p-4 md:p-8 space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Support Tickets</h1>
      <p className="text-gray-600">Manage support conversations with users</p>
    </div>

    {/* Chat Interface */}
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="flex h-[calc(100vh-16rem)]">
        {/* Chat List */}
        {(showChatList || window.innerWidth >= 768) && (
          <div className="w-full md:w-80 border-r">
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 rounded-xl cursor-pointer transition-colors ${
                      activeChat?.id === chat.id
                        ? 'bg-[#FF5341] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium mb-1">{chat.userName}</h3>
                    <p className={`text-sm ${
                      activeChat?.id === chat.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {chat.messages[chat.messages.length - 1]?.text.substring(0, 30)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!showChatList || window.innerWidth >= 768 ? 'block' : 'hidden'}`}>
          {activeChat ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center">
                  {window.innerWidth < 768 && (
                    <button
                      onClick={() => setShowChatList(true)}
                      className="mr-3 p-1 hover:bg-gray-100 rounded-lg md:hidden"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{activeChat.userName}</h3>
                    <p className="text-sm text-gray-500">Active Now</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[70%] rounded-xl p-3 ${
                      msg.sender === 'admin' 
                        ? 'bg-[#FF5341] text-white' 
                        : 'bg-white'
                    }`}>
                      <p className="break-words">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t bg-white">
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                <p>Select a chat to view conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default AdminSupport;