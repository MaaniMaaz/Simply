// src/pages/UserPages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { 
    Bell, 
    MenuIcon,
    Calendar,
    Clock,
    Check,
    X,
    BookOpenCheck
} from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';
import { notificationService } from '../../api/notification';
import { useNavigate } from 'react-router-dom';

const NotificationCard = ({ notification, onMarkAsRead }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all">
        <div className="flex items-start space-x-4">
            <div className="bg-[#FF5341] bg-opacity-10 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-[#FF5341]" />
            </div>
            <div className="flex-1">
                <p className="text-gray-800 mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(notification.sent_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(notification.sent_at).toLocaleTimeString()}
                        </div>
                    </div>
                    {!notification.is_read && (
                        <button
                            onClick={() => onMarkAsRead(notification._id)}
                            className="flex items-center text-[#FF5341] hover:text-[#FF5341]/80 text-sm"
                        >
                            <BookOpenCheck className="w-4 h-4 mr-1" />
                            Mark as read
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const Notifications = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

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

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await notificationService.getNotifications();
            setNotifications(response.data);
        } catch (error) {
            showToastMessage(error.message || 'Error fetching notifications', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationService.markAsRead(notificationId);
            // Update local state
            setNotifications(notifications.map(notif => 
                notif._id === notificationId ? { ...notif, is_read: true } : notif
            ));
            showToastMessage('Notification marked as read');
        } catch (error) {
            showToastMessage(error.message || 'Error marking notification as read', 'error');
        }
    };

    const showToastMessage = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
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
                            <div className="flex items-center space-x-2">
                                <Bell className="w-6 h-6 text-[#FF5341]" />
                                <span className="text-sm font-medium text-gray-600">Notifications</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Notifications</h1>
                        <p className="text-gray-600">Stay updated with the latest announcements and features</p>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5341] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading notifications...</p>
                            </div>
                        ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <NotificationCard 
                                    key={notification._id} 
                                    notification={notification}
                                    onMarkAsRead={handleMarkAsRead}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                                <p className="text-gray-600">
                                    Check back later for updates and announcements
                                </p>
                            </div>
                        )}
                    </div>
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