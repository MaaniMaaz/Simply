import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2,
  Check,
  X,
  Users as UsersIcon
} from 'lucide-react';

// Initial dummy data
const initialUsers = [
  {
    id: 1,
    name: 'Hamza Shahid',
    email: 'hamza@example.com',
    phone: '+92 (333) 123-4567',
    credits: 1500,
    creditsUsed: 500,
    subscriptionPlan: 'Professional',
    documents: 15,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Mir Mujeeb',
    email: 'mujeeb@example.com',
    phone: '+92 (333) 234-5678',
    credits: 2500,
    creditsUsed: 1200,
    subscriptionPlan: 'Enterprise',
    documents: 25,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Muhammad Maaz',
    email: 'maaz@example.com',
    phone: '+92 (333) 345-6789',
    credits: 1000,
    creditsUsed: 800,
    subscriptionPlan: 'Enterprise',
    documents: 8,
    status: 'Inactive',
  },
];

const UserModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl w-full max-w-2xl my-8"> {/* Added my-8 for vertical spacing */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto"> {/* Added max-height and overflow */}
            {children}
          </div>
        </div>
      </div>
    );
  };

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    credits: 1000,
    subscriptionPlan: 'Professional',
  });
  const [editUser, setEditUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedUser && !event.target.closest('.user-menu')) {
        setSelectedUser(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedUser]);


  const handleCreateUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      creditsUsed: 0,
      documents: 0,
      status: 'Active',
    };
    setUsers([user, ...users]);
    setIsCreateModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      credits: 1000,
      subscriptionPlan: 'Professional',
    });
    showToastMessage('User created successfully');
  };

  const handleEditUser = () => {
    setUsers(users.map(user => 
      user.id === editUser.id ? editUser : user
    ));
    setIsEditModalOpen(false);
    showToastMessage('User updated successfully');
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    showToastMessage('User deleted successfully');
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Users</h1>
          <p className="text-gray-600">Manage your Simply users</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create User
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Users List */}
      <div className="bg-[#FFFAF3] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-[#FF5341] bg-opacity-10 p-2 rounded-lg mr-3">
                        <UsersIcon className="w-5 h-5 text-[#FF5341]" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.subscriptionPlan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                      user.subscriptionPlan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.credits} credits</div>
                    <div className="text-xs text-gray-500">{user.creditsUsed} used</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative inline-block text-left">
                    <button
                         onClick={(e) => {
                        e.stopPropagation();  // Prevent immediate closure
                        setSelectedUser(selectedUser?.id === user.id ? null : user);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg user-menu"  // Added user-menu class
                        >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    {selectedUser?.id === user.id && (
                     <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 user-menu"> {/* Added user-menu class */}
                          <div className="py-1">
                            <button
                              onClick={() => {
                                setIsViewModalOpen(true);
                                setSelectedUser(user);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Eye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                setIsEditModalOpen(true);
                                setEditUser(user);
                                setSelectedUser(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Edit2 className="w-4 h-4 mr-3" />
                              Edit User
                            </button>
                            <button
                              onClick={() => {
                                setIsDeleteModalOpen(true);
                                setSelectedUser(user);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <UserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Credits
            </label>
            <input
              type="number"
              value={newUser.credits}
              onChange={(e) => setNewUser({ ...newUser, credits: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subscription Plan
            </label>
            <select
             value={newUser.subscriptionPlan}
            onChange={(e) => setNewUser({ ...newUser, subscriptionPlan: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
            >
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateUser}
              className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
            >
              Create User
            </button>
          </div>
        </div>
      </UserModal>

      {/* View User Modal */}
      <UserModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedUser(null);
        }}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="mt-1 text-gray-900">{selectedUser.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-gray-900">{selectedUser.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="mt-1 text-gray-900">{selectedUser.phone}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Subscription Plan</label>
                <p className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedUser.subscriptionPlan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                    selectedUser.subscriptionPlan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedUser.subscriptionPlan}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Total Credits</label>
                <p className="mt-1 text-gray-900">{selectedUser.credits}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Credits Used</label>
                <p className="mt-1 text-gray-900">{selectedUser.creditsUsed}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Documents</label>
                <p className="mt-1 text-gray-900">{selectedUser.documents}</p>
              </div>
            </div>
          </div>
        )}
      </UserModal>

      {/* Edit User Modal */}
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditUser(null);
        }}
        title="Edit User"
      >
        {editUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <input
                type="number"
                value={editUser.credits}
                onChange={(e) => setEditUser({ ...editUser, credits: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subscription Plan
              </label>
              <select
                value={editUser.subscriptionPlan}
                onChange={(e) => setEditUser({ ...editUser, subscriptionPlan: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              >
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={editUser.status}
                onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditUser(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </UserModal>

      {/* Delete User Modal */}
      <UserModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title="Delete User"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Delete User
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </UserModal>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Users;