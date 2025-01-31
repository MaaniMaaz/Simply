import React, { useState, useEffect, useRef } from 'react';
import { 
    MessageSquare, 
    Send, 
    Search,
    Clock,
    Circle,
    ChevronDown,
    MenuIcon,
    Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/admin';

const AdminSupport = () => {
    const [tickets, setTickets] = useState([]);
    const [activeTicket, setActiveTicket] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const pollTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const POLL_INTERVAL = 3000;

    useEffect(() => {
        fetchTickets();
        return () => {
            if (pollTimeoutRef.current) {
                clearTimeout(pollTimeoutRef.current);
            }
        };
    }, []);

    const startPolling = () => {
        if (pollTimeoutRef.current) {
            clearTimeout(pollTimeoutRef.current);
        }
        pollTimeoutRef.current = setTimeout(pollForUpdates, POLL_INTERVAL);
    };

    const pollForUpdates = async () => {
        try {
            const response = await adminService.getAllTickets();
            const newTickets = response.data;
                
            // Update active ticket if it exists
            if (activeTicket) {
                const updatedActiveTicket = newTickets.find(
                    ticket => ticket._id === activeTicket._id
                );
                // Important: Update active ticket regardless of string comparison
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
            const response = await adminService.getAllTickets();
            setTickets(response.data);
            startPolling();
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
            const response = await adminService.sendTicketMessage(
                activeTicket._id,
                newMessage
            );

            const updatedTicket = response.data;
            setActiveTicket(updatedTicket);
            setTickets(tickets.map(ticket => 
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
            await adminService.markTicketAsRead(ticket._id);
            fetchTickets();
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    };

    const handleUpdateStatus = async (ticketId, status) => {
        try {
            const response = await adminService.updateTicketStatus(ticketId, status);
            setActiveTicket(response.data);
            setTickets(tickets.map(ticket => 
                ticket._id === ticketId ? response.data : ticket
            ));
        } catch (error) {
            setError(error.message);
        }
    };
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = 
            ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.user_id.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });
    // Rest of your existing JSX...
    return (
        <div className="flex min-h-screen">
            <div className={`flex-1 transition-all duration-300`}>
           

                {/* Support Interface */}
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="flex h-[calc(100vh-8rem)]">
                            {/* Tickets List */}
                            <div className="w-96 border-r flex flex-col max-h-full"> {/* Added flex flex-col max-h-full */}
                                <div className="p-4 flex flex-col h-full"> {/* Added flex flex-col h-full */}
                                    {/* Search and Filter - Keep these fixed */}
                                    <div className="flex-shrink-0"> {/* Added flex-shrink-0 to prevent shrinking */}
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Search tickets..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                                className="w-full p-2 border rounded-lg"
                                            >
                                                <option value="all">All Status</option>
                                                <option value="open">Open</option>
                                                <option value="pending">Pending</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2 overflow-y-auto flex-1">
                                        {filteredTickets.map((ticket) => (
                                            <div
                                                key={ticket._id}
                                                onClick={() => handleTicketSelect(ticket)}
                                                className={`p-4 rounded-xl cursor-pointer transition-colors ${
                                                    activeTicket?._id === ticket._id
                                                        ? 'bg-[#FF5341] text-white'
                                                        : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium">{ticket.user_id.name}</h3>
                                                        <p className="text-sm opacity-80">{ticket.subject}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                                                        ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {ticket.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs mt-2">
                                                    {new Date(ticket.last_message).toLocaleString()}
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
                                                    <h3 className="font-bold text-lg">
                                                        {activeTicket.user_id.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Ticket #{activeTicket._id.substring(0, 8)}
                                                    </p>
                                                </div>
                                                <select
                                                    value={activeTicket.status}
                                                    onChange={(e) => handleUpdateStatus(activeTicket._id, e.target.value)}
                                                    className={`px-3 py-1 rounded-lg text-sm ${
                                                        activeTicket.status === 'open' ? 'bg-green-100 text-green-800' :
                                                        activeTicket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    <option value="open">Open</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                            {activeTicket.messages.map((msg) => (
                                                <div
                                                    key={msg._id}
                                                    className={`flex ${msg.sender_type === 'Admin' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-[70%] rounded-xl p-3 ${
                                                        msg.sender_type === 'Admin' 
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
                                                    className="flex-1 p-2 border rounded-lg"
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
                                            <p>Select a ticket to view conversation</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Toast */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    {error}
                </div>
            )}
        </div>
    );
};

export default AdminSupport;