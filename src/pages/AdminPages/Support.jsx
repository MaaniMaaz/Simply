import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const AdminSupport = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <div className="flex h-screen">
      {/* Chat List */}
      <div className="w-1/4 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Support Chats</h2>
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-3 rounded-lg cursor-pointer ${
                  activeChat?.id === chat.id
                    ? 'bg-[#FF5341] text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <h3 className="font-medium">{chat.userName}</h3>
                <p className="text-sm opacity-80">
                  {chat.messages[chat.messages.length - 1]?.text.substring(0, 30)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="p-4 border-b">
              <h3 className="font-bold text-lg">{activeChat.userName}</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'admin' ? 'bg-[#FF5341] text-white' : 'bg-gray-100'
                  }`}>
                    <p>{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2" />
              <p>Select a chat to view conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;