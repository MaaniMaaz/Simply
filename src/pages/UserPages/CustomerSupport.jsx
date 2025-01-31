import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, MenuIcon, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../../api/ticket';
import Sidebar from '../../components/Shared/Sidebar';

const CustomerSupport = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [activeTicket, setActiveTicket] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [newTicket, setNewTicket] = useState({ subject: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [error, setError] = useState(null);
    const pollTimeoutRef = useRef(null);
    const POLL_INTERVAL = 3000;
    const navigate = useNavigate();

    useEffect(() => {
        fetchTickets();
        return () => {
            if (pollTimeoutRef.current) {
                clearTimeout(pollTimeoutRef.current);
            }
        };
    }, []);

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

    const startPolling = () => {
      if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
      }
      pollTimeoutRef.current = setTimeout(pollForUpdates, POLL_INTERVAL);
  };

  const pollForUpdates = async () => {
      try {
          const response = await ticketService.getUserTickets();
          const newTickets = response.data;
          
          if (activeTicket) {
              const updatedActiveTicket = newTickets.find(
                  ticket => ticket._id === activeTicket._id
              );
              if (updatedActiveTicket) {
                  setActiveTicket(updatedActiveTicket);
              }
          }
          
          setTickets(newTickets);
      } catch (error) {
          console.error('Polling error:', error);
      } finally {
          startPolling();
      }
  };
    const fetchTickets = async () => {
        try {
            setIsLoading(true);
            const response = await ticketService.getUserTickets();
            setTickets(response.data);
            startPolling();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await ticketService.createTicket(
                newTicket.subject,
                newTicket.message
            );
            setTickets([response.data, ...tickets]);
            setActiveTicket(response.data);
            setShowNewTicketForm(false);
            setNewTicket({ subject: '', message: '' });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
      if (!newMessage.trim() || !activeTicket) return;

      try {
          setIsLoading(true);
          const response = await ticketService.sendMessage(
              activeTicket._id,
              newMessage
          );

          const updatedTicket = response.data;
          setActiveTicket(updatedTicket);
          setTickets(prevTickets => prevTickets.map(ticket => 
              ticket._id === activeTicket._id ? updatedTicket : ticket
          ));
          setNewMessage('');
      } catch (error) {
          setError(error.message);
      } finally {
          setIsLoading(false);
      }
  };

    const handleTicketSelect = async (ticket) => {
        setActiveTicket(ticket);
        try {
            await ticketService.markAsRead(ticket._id);
            fetchTickets();
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
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

        {/* Chat Interface */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex h-[calc(100vh-16rem)]">
              {/* Tickets List */}
              <div className="w-full md:w-80 border-r">
                <div className="p-4">
                  <button
                    onClick={() => setShowNewTicketForm(true)}
                    className="w-full bg-[#FF5341] text-white px-4 py-2 rounded-lg mb-4 hover:bg-[#FF5341]/90"
                  >
                    New Ticket
                  </button>

                  {/* Tickets List */}
                  <div className="space-y-2 overflow-y-auto">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket._id}
                        onClick={() => handleTicketSelect(ticket)}
                        className={`p-4 rounded-xl cursor-pointer transition-colors ${
                          activeTicket?._id === ticket._id
                            ? 'bg-[#FF5341] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <h3 className="font-medium mb-1">{ticket.subject}</h3>
                        <p className={`text-sm ${
                          activeTicket?._id === ticket._id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {ticket.messages[ticket.messages.length - 1]?.message.substring(0, 30)}...
                        </p>
                        <div className="text-xs mt-2">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {activeTicket ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b">
                      <h3 className="font-bold text-lg">{activeTicket.subject}</h3>
                      <p className="text-sm text-gray-500">
                        Ticket #{activeTicket._id.substring(0, 8)}
                      </p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {activeTicket.messages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`flex ${msg.sender_type === 'User' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] rounded-xl p-3 ${
                            msg.sender_type === 'User' 
                              ? 'bg-[#FF5341] text-white' 
                              : 'bg-gray-100'
                          }`}>
                            <p>{msg.message}</p>
                            <div className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex space-x-2">
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
                          disabled={!newMessage.trim() || isLoading}
                          className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 disabled:opacity-50"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                      <p>Select a ticket to view the conversation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Ticket</h3>
            <form onSubmit={handleCreateTicket}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    className="w-full p-2 border rounded-lg h-32"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTicketForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;