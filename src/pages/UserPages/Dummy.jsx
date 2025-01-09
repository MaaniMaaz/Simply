// Admin Support Component (src/pages/AdminPages/Support.jsx)
import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/Shared/AdminSidebar';
import { 
  
  MenuIcon, 
  Search, 
  MessageSquare, 
  Clock,
  Circle,
  Send,
  Check,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSupport = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Dummy ticket data
  useEffect(() => {
    setTickets([
      {
        id: 'TICKET-001',
        userId: 'USER123',
        userName: 'John Doe',
        subject: 'AI Writer Issue',
        status: 'open',
        priority: 'high',
        created_at: '2024-01-15',
        messages: [
          { 
            id: 1,
            sender: 'user', 
            message: 'The AI Writer feature is not working properly', 
            timestamp: '10:30 AM',
            is_admin: false
          },
          { 
            id: 2,
            sender: 'admin', 
            message: 'Could you please provide more details about the issue?', 
            timestamp: '10:35 AM',
            is_admin: true
          }
        ]
      },
      {
        id: 'TICKET-002',
        userId: 'USER124',
        userName: 'Jane Smith',
        subject: 'Billing Question',
        status: 'pending',
        priority: 'medium',
        created_at: '2024-01-14',
        messages: []
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;

    const newMsg = {
      id: Date.now(),
      sender: 'admin',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      is_admin: true
    };

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicket.id) {
        return {
          ...ticket,
          messages: [...ticket.messages, newMsg]
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setActiveTicket(updatedTickets.find(t => t.id === activeTicket.id));
    setNewMessage('');
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    if (activeTicket?.id === ticketId) {
      setActiveTicket({ ...activeTicket, status: newStatus });
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className=" flex min-h-screen">
      

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <button 
                className="md:hidden"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="relative">
                
                
              </div>
            </div>
          </div>
        </div>

        {/* Support Interface */}
        <div className="flex h-[calc(100vh-64px)]">
          {/* Tickets List */}
          <div className=" border-r">
            <div className="p-4">
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold">Support Tickets</h2>
              </div>

              {/* Search and Filter */}
              <div className="mb-4 space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-[#FF5341]"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="flex space-x-2">
                  {['all', 'open', 'pending', 'closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-lg text-sm capitalize ${
                        filterStatus === status
                          ? 'bg-[#FF5341] text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tickets List */}
              <div className="space-y-2">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setActiveTicket(ticket)}
                    className={`p-3 rounded-lg cursor-pointer ${
                      activeTicket?.id === ticket.id
                        ? 'bg-[#FF5341] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <p className="text-sm opacity-80">
                          {ticket.userName} • {ticket.id}
                        </p>
                        <p className="text-sm opacity-80">
                          {ticket.created_at}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Circle 
                          className={`w-3 h-3 ${getPriorityColor(ticket.priority)}`} 
                          fill="currentColor" 
                        />
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{activeTicket.subject}</h3>
                      <p className="text-sm text-gray-500">
                        {activeTicket.userName} • Ticket #{activeTicket.id}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={activeTicket.status}
                        onChange={(e) => updateTicketStatus(activeTicket.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(activeTicket.status)} border-none focus:ring-0`}
                      >
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="closed">Closed</option>
                      </select>
                      <Circle 
                        className={`w-3 h-3 ${getPriorityColor(activeTicket.priority)}`} 
                        fill="currentColor" 
                      />
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        msg.is_admin 
                          ? 'bg-[#FF5341] text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <p>{msg.message}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs opacity-70">
                          <Clock className="w-3 h-3" />
                          <span>{msg.timestamp}</span>
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
                      disabled={!newMessage.trim()}
                      className={`bg-[#FF5341] text-white px-4 py-2 rounded-lg transition-colors flex items-center ${
                        !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF5341]/90'
                      }`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
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
  );
};

export default AdminSupport;









import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import { 
  Bell, 
  MenuIcon, 
  Plus, 
  Search, 
  MessageSquare, 
  Clock,
  Circle,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTicketData, setNewTicketData] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  // Dummy ticket data
  useEffect(() => {
    setTickets([
      {
        id: 'TICKET-001',
        subject: 'AI Writer Issue',
        status: 'open',
        priority: 'high',
        created_at: '2024-01-15',
        messages: [
          { 
            id: 1,
            sender: 'user', 
            message: 'The AI Writer feature is not working properly', 
            timestamp: '10:30 AM',
            is_admin: false
          },
          { 
            id: 2,
            sender: 'admin', 
            message: 'Could you please provide more details about the issue?', 
            timestamp: '10:35 AM',
            is_admin: true
          }
        ]
      },
      {
        id: 'TICKET-002',
        subject: 'Billing Question',
        status: 'closed',
        priority: 'medium',
        created_at: '2024-01-14',
        messages: []
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      is_admin: false
    };

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicket.id) {
        return {
          ...ticket,
          messages: [...ticket.messages, newMsg]
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setActiveTicket(updatedTickets.find(t => t.id === activeTicket.id));
    setNewMessage('');
  };

  const createNewTicket = () => {
    if (!newTicketData.subject || !newTicketData.description) return;

    const newTicket = {
      id: `TICKET-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicketData.subject,
      status: 'open',
      priority: newTicketData.priority,
      created_at: new Date().toISOString().split('T')[0],
      messages: [{
        id: Date.now(),
        sender: 'user',
        message: newTicketData.description,
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        is_admin: false
      }]
    };

    setTickets([newTicket, ...tickets]);
    setIsNewTicketModalOpen(false);
    setNewTicketData({ subject: '', description: '', priority: 'medium' });
    setActiveTicket(newTicket);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block md:fixed md:left-0 md:h-screen z-50">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="sticky top-0 w-full bg-[#FDF8F6] py-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center">
              <button 
                className="md:hidden"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="relative">
              
              
              </div>
            </div>
          </div>
        </div>

        {/* Support Interface */}
        <div className="flex h-[calc(100vh-64px)]">
          {/* Tickets List */}
          <div className="w-1/3 border-r">
            <div className="p-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Support Tickets</h2>
                <button
                  onClick={() => setIsNewTicketModalOpen(true)}
                  className="bg-[#FF5341] text-white p-2 rounded-lg hover:bg-[#FF5341]/90"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Search and Filter */}
              <div className="mb-4 space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-[#FF5341]"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="flex space-x-2">
                  {['all', 'open', 'closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-lg text-sm capitalize ${
                        filterStatus === status
                          ? 'bg-[#FF5341] text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tickets List */}
              <div className="space-y-2">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setActiveTicket(ticket)}
                    className={`p-3 rounded-lg cursor-pointer ${
                      activeTicket?.id === ticket.id
                        ? 'bg-[#FF5341] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <p className="text-sm opacity-80">
                          {ticket.id} • {ticket.created_at}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Circle 
                          className={`w-3 h-3 ${getPriorityColor(ticket.priority)}`} 
                          fill="currentColor" 
                        />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ticket.status === 'open' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{activeTicket.subject}</h3>
                      <p className="text-sm text-gray-500">Ticket #{activeTicket.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        activeTicket.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activeTicket.status}
                      </span>
                      <Circle 
                        className={`w-3 h-3 ${getPriorityColor(activeTicket.priority)}`} 
                        fill="currentColor" 
                      />
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-[#FF5341] text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <p>{msg.message}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs opacity-70">
                          <Clock className="w-3 h-3" />
                          <span>{msg.timestamp}</span>
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
                      disabled={!newMessage.trim()}
                      className={`bg-[#FF5341] text-white px-4 py-2 rounded-lg transition-colors flex items-center ${
                        !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF5341]/90'
                      }`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
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

      {/* New Ticket Modal */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Create New Ticket</h3>
            
            {/* Subject Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={newTicketData.subject}
                onChange={(e) => setNewTicketData({ ...newTicketData, subject: e.target.value })}
                placeholder="Enter ticket subject..."
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newTicketData.description}
                onChange={(e) => setNewTicketData({ ...newTicketData, description: e.target.value })}
                placeholder="Describe your issue..."
                rows={4}
                className="w-full p-2 border rounded-lg resize-none"
              />
            </div>

            {/* Priority Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newTicketData.priority}
                onChange={(e) => setNewTicketData({ ...newTicketData, priority: e.target.value })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsNewTicketModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createNewTicket}
                disabled={!newTicketData.subject || !newTicketData.description}
                className={`px-4 py-2 bg-[#FF5341] text-white rounded-lg transition-colors ${
                  !newTicketData.subject || !newTicketData.description
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#FF5341]/90'
                }`}
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;

