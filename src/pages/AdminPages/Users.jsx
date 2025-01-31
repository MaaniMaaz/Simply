import React, { useState, useEffect } from 'react';
import { adminUserService } from '../../api/adminUser';
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-center">
        <nav className="relative z-0 inline-flex -space-x-px rounded-md">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium
              ${currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium
                ${currentPage === i + 1
                  ? 'bg-[#FF5341] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium
              ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-500 hover:bg-gray-50'}`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

const UserModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ 
    page: 1, 
    limit: 10, 
    total: 0,
    totalPages: 1 
  });
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [modalState, setModalState] = useState({
    create: false,
    edit: false,
    view: false,
    delete: false
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    credits_left: 0,
    plan_id: '',
    status: 'Active'
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchUsers();
    fetchPlans();
  }, [searchQuery, pagination.page]);

  useEffect(() => {
    if (selectedUser && modalState.edit) {
      setFormData({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        phone_number: selectedUser.phone_number || '',
        credits_left: selectedUser.credits_left || 0,
        plan_id: selectedUser.plan_id?._id || '',
        status: selectedUser.status || 'Active'
      });
    }
  }, [selectedUser, modalState.edit]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminUserService.getAllUsers(
        searchQuery,
        '',
        '',
        pagination.page,
        pagination.limit
      );

      if (response.success) {
        const { users, pagination: paginationData } = response.data;
        setUsers(users);
        setPagination(prev => ({
          ...prev,
          total: paginationData.total,
          totalPages: Math.ceil(paginationData.total / pagination.limit)
        }));
      }
    } catch (err) {
      setError(err.message || 'Error fetching users');
      showToast('Error fetching users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await adminUserService.getAllPlans();
      if (response.success) {
        setPlans(response.data || []);
      }
    } catch (err) {
      showToast('Error fetching plans', 'error');
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await adminUserService.createUser({
        ...formData,
        plan_id: formData.plan_id || null
      });
      
      if (response.success) {
        setUsers([response.data.user, ...users]);
        closeModal('create');
        resetForm();
        showToast('User created successfully', 'success');
        fetchUsers();
      }
    } catch (err) {
      showToast(err.message || 'Error creating user', 'error');
    }
  };

  const handleEditUser = async () => {
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        credits_left: parseInt(formData.credits_left),
        plan_id: formData.plan_id || null,
        status: formData.status
      };

      const response = await adminUserService.updateUser(selectedUser._id, updateData);
      
      if (response.success) {
        setUsers(users.map(user => {
          if (user._id === selectedUser._id) {
            return {
              ...user,
              ...updateData,
              plan_id: formData.plan_id ? {
                _id: formData.plan_id,
                name: plans.find(p => p._id === formData.plan_id)?.name
              } : null
            };
          }
          return user;
        }));
        
        closeModal('edit');
        resetForm();
        showToast('User updated successfully', 'success');
        fetchUsers();
      }
    } catch (err) {
      showToast(err.message || 'Error updating user', 'error');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await adminUserService.deleteUser(selectedUser._id);
      if (response.success) {
        setUsers(users.filter(user => user._id !== selectedUser._id));
        closeModal('delete');
        showToast('User deleted successfully', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Error deleting user', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const openModal = (type, user = null) => {
    setSelectedUser(user);
    setModalState({ ...modalState, [type]: true });
    setSelectedDropdown(null);
  };

  const closeModal = type => {
    setModalState({ ...modalState, [type]: false });
    if (type !== 'view') {
      resetForm();
    }
    if (type === 'delete') {
      setSelectedUser(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone_number: '',
      credits_left: 0,
      plan_id: '',
      status: 'Active'
    });
    setSelectedUser(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'credits_left' ? parseInt(value) : value
    }));
  };

  const renderUserForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
        <input
          type="number"
          name="credits_left"
          value={formData.credits_left}
          onChange={handleInputChange}
          min="0"
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
        <select
          name="plan_id"
          value={formData.plan_id}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
        >
          <option value="">Select a plan</option>
          {plans.map(plan => (
            <option key={plan._id} value={plan._id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg focus:ring-[#FF5341] focus:border-[#FF5341]"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
    </div>
  );

  const getPlanBadgeColor = (planName) => {
    switch(planName) {
      case 'Professional':
        return 'bg-blue-100 text-blue-800';
      case 'Enterprise':
        return 'bg-green-100 text-green-800';
      case 'Free':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-50 text-red-800';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Users</h1>
          <p className="text-gray-600">Manage your application users</p>
        </div>
        <button
          onClick={() => openModal('create')}
          className="bg-[#FF5341] text-white px-4 py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create User
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full md:w-96 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5341]"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      <div className="bg-[#FFFAF3] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Words Generated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
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
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanBadgeColor(user.plan_id?.name)}`}>
                          {user.plan_id?.name || 'No Plan'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.credits_left || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.total_words_generated || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : user.status === 'Suspended'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedDropdown(prev => (prev === user._id ? null : user._id));
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                          {selectedDropdown === user._id && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => openModal('view', user)}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                  <Eye className="w-4 h-4 mr-3" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => openModal('edit', user)}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                  <Edit2 className="w-4 h-4 mr-3" />
                                  Edit User
                                </button>
                                <button
                                  onClick={() => openModal('delete', user)}
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
            <Pagination 
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <UserModal
        isOpen={modalState.create || modalState.edit}
        onClose={() => closeModal(modalState.create ? 'create' : 'edit')}
        title={modalState.create ? 'Create New User' : 'Edit User'}
      >
        {renderUserForm()}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => closeModal(modalState.create ? 'create' : 'edit')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={modalState.create ? handleCreateUser : handleEditUser}
            className="px-4 py-2 bg-[#FF5341] text-white rounded-lg hover:bg-[#FF5341]/90"
          >
            {modalState.create ? 'Create User' : 'Save Changes'}
          </button>
        </div>
      </UserModal>

      <UserModal
        isOpen={modalState.view}
        onClose={() => closeModal('view')}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedUser.phone_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subscription Plan</p>
                <div className={`p-2 rounded ${!selectedUser.plan_id ? 'bg-red-50' : ''}`}>
                  <p className="font-medium">{selectedUser.plan_id?.name || 'No Plan'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Credits Left</p>
                <p className="font-medium">{selectedUser.credits_left || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Words Generated</p>
                <p className="font-medium">{selectedUser.total_words_generated || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedUser.status}</p>
              </div>
              {selectedUser.created_at && (
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">
                    {new Date(selectedUser.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </UserModal>

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => closeModal('delete')}
        onConfirm={handleDeleteUser}
      />

      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          {toast.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Users;