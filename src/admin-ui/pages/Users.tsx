import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Shield, CheckCircle2, XCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastActive: string;
  avatar: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@edrisync.com',
    role: 'admin',
    status: 'active',
    lastActive: '2 minutes ago',
    avatar: 'AD',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'jsmith@edrisync.com',
    role: 'editor',
    status: 'active',
    lastActive: '1 hour ago',
    avatar: 'JS',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sjohnson@edrisync.com',
    role: 'editor',
    status: 'active',
    lastActive: '3 hours ago',
    avatar: 'SJ',
  },
  {
    id: '4',
    name: 'Mike Wilson',
    email: 'mwilson@edrisync.com',
    role: 'viewer',
    status: 'inactive',
    lastActive: '2 days ago',
    avatar: 'MW',
  },
];

const roleColors = {
  admin: 'bg-purple-100 text-purple-700',
  editor: 'bg-blue-100 text-blue-700',
  viewer: 'bg-gray-100 text-gray-700',
};

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Users & Roles</h2>
          <p className="text-gray-600">
            Manage user accounts and permissions for your EdriSync dashboard.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
        >
          <Plus size={18} />
          <span>Add User</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Users table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-semibold text-white">
                        {user.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Shield size={14} className="text-gray-400" />
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          roleColors[user.role]
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                        <CheckCircle2 size={12} className="mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                        <XCircle size={12} className="mr-1" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-lg w-full rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Add New User</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="email@edrisync.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  <strong>Admin:</strong> Full access. <strong>Editor:</strong> Can edit content.{' '}
                  <strong>Viewer:</strong> Read-only access.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role descriptions */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
              <Shield size={20} />
            </div>
            <h3 className="text-lg font-semibold text-purple-900">Admin</h3>
          </div>
          <p className="text-sm text-purple-800">
            Full access to all features, settings, and user management. Can create, edit, publish,
            and delete all content.
          </p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Edit size={20} />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Editor</h3>
          </div>
          <p className="text-sm text-blue-800">
            Can create, edit, and publish content. Cannot access settings or user management
            features.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600 text-white">
              👁️
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Viewer</h3>
          </div>
          <p className="text-sm text-gray-700">
            Read-only access to view content and reports. Cannot make any changes to the website.
          </p>
        </div>
      </div>
    </div>
  );
}
