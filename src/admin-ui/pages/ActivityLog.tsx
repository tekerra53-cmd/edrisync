import { useState } from 'react';
import { Search, Filter, Calendar, FileText, Download } from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  date: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'publish';
}

const activities: Activity[] = [
  {
    id: '1',
    user: 'Admin',
    action: 'Published',
    resource: 'Insight',
    details: 'Cybersecurity Strategy for Financial Institutions in 2024',
    date: '2024-01-15',
    time: '10:30 AM',
    type: 'publish',
  },
  {
    id: '2',
    user: 'Admin',
    action: 'Updated',
    resource: 'Homepage',
    details: 'Modified hero section content',
    date: '2024-01-15',
    time: '09:15 AM',
    type: 'update',
  },
  {
    id: '3',
    user: 'Admin',
    action: 'Created',
    resource: 'Service',
    details: 'Cloud Security Assessment',
    date: '2024-01-14',
    time: '04:45 PM',
    type: 'create',
  },
  {
    id: '4',
    user: 'Admin',
    action: 'Uploaded',
    resource: 'Media',
    details: '4 images to media library',
    date: '2024-01-14',
    time: '02:30 PM',
    type: 'create',
  },
  {
    id: '5',
    user: 'Admin',
    action: 'Published',
    resource: 'Case Study',
    details: 'Digital Transformation Journey - Fortune 500 Bank',
    date: '2024-01-13',
    time: '11:20 AM',
    type: 'publish',
  },
  {
    id: '6',
    user: 'Admin',
    action: 'Updated',
    resource: 'Settings',
    details: 'Modified SEO meta tags',
    date: '2024-01-13',
    time: '09:00 AM',
    type: 'update',
  },
  {
    id: '7',
    user: 'Admin',
    action: 'Deleted',
    resource: 'Media',
    details: 'Removed outdated service icon',
    date: '2024-01-12',
    time: '03:15 PM',
    type: 'delete',
  },
  {
    id: '8',
    user: 'Admin',
    action: 'Created',
    resource: 'Insight',
    details: 'The Future of Zero Trust Architecture',
    date: '2024-01-12',
    time: '10:45 AM',
    type: 'create',
  },
];

const actionColors = {
  create: 'bg-green-100 text-green-700',
  update: 'bg-blue-100 text-blue-700',
  delete: 'bg-red-100 text-red-700',
  publish: 'bg-purple-100 text-purple-700',
};

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || activity.type === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Activity Log</h2>
          <p className="text-gray-600">
            Track all actions and changes made to your website content and settings.
          </p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Download size={16} />
          <span>Export Log</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between space-x-4 flex-wrap gap-4">
        <div className="flex flex-1 min-w-[300px] items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="all">All Actions</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="delete">Deleted</option>
            <option value="publish">Published</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Activity table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        AD
                      </div>
                      <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        actionColors[activity.type]
                      }`}
                    >
                      {activity.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-900">{activity.resource}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{activity.details}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      <span>{activity.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{activity.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredActivities.length}</span> of{' '}
          <span className="font-medium">{activities.length}</span> activities
        </div>
        <div className="flex items-center space-x-2">
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">
            1
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
