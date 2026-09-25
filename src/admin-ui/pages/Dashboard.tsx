import {
  FileText,
  FileEdit,
  Briefcase,
  FileCheck,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  Edit,
  Upload,
  Mail,
  Home,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

const stats = [
  { label: 'Published Pages', value: '12', icon: FileText, trend: '+2', color: 'blue' },
  { label: 'Drafts', value: '5', icon: FileEdit, trend: '-1', color: 'yellow' },
  { label: 'Services', value: '8', icon: Briefcase, color: 'indigo' },
  { label: 'Case Studies', value: '24', icon: FileCheck, trend: '+3', color: 'green' },
  { label: 'Insights', value: '47', icon: Lightbulb, trend: '+5', color: 'purple' },
  { label: 'New Messages', value: '12', icon: MessageSquare, trend: '+4', color: 'red' },
];

const quickActions = [
  { label: 'Edit Homepage', icon: Home, color: 'blue' },
  { label: 'Add Service', icon: Briefcase, color: 'indigo' },
  { label: 'Add Case Study', icon: FileCheck, color: 'green' },
  { label: 'Write Insight', icon: Lightbulb, color: 'purple' },
  { label: 'Upload Media', icon: Upload, color: 'pink' },
  { label: 'View Messages', icon: Mail, color: 'red' },
];

const recentActivity = [
  {
    user: 'Admin',
    action: 'updated',
    content: 'Homepage',
    time: '2 hours ago',
    status: 'published',
  },
  {
    user: 'Admin',
    action: 'published',
    content: 'Cybersecurity Strategy for Financial Institutions',
    time: '5 hours ago',
    status: 'published',
  },
  {
    user: 'Admin',
    action: 'uploaded',
    content: '4 images',
    time: 'Yesterday',
    status: 'completed',
  },
  {
    user: 'Admin',
    action: 'created',
    content: 'New service: Cloud Security Assessment',
    time: 'Yesterday',
    status: 'draft',
  },
  {
    user: 'Admin',
    action: 'updated',
    content: 'About page',
    time: '2 days ago',
    status: 'published',
  },
];

const recentContent = [
  {
    title: 'Cybersecurity Strategy for Financial Institutions',
    type: 'Insight',
    status: 'Published',
    updated: '2024-01-15',
    author: 'Admin',
  },
  {
    title: 'Digital Transformation Journey - Fortune 500 Bank',
    type: 'Case Study',
    status: 'Published',
    updated: '2024-01-14',
    author: 'Admin',
  },
  {
    title: 'Cloud Security Assessment',
    type: 'Service',
    status: 'Draft',
    updated: '2024-01-13',
    author: 'Admin',
  },
  {
    title: 'GRC Compliance in Healthcare',
    type: 'Insight',
    status: 'Published',
    updated: '2024-01-12',
    author: 'Admin',
  },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600',
  pink: 'bg-pink-50 text-pink-600',
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Good morning, Admin</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Manage and update your EdriSync website from one place. Keep your content fresh and
              engaging for your clients.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors shadow-lg"
            >
              <span>View Website</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`rounded-lg p-2.5 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon size={20} />
                </div>
                {stat.trend && (
                  <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                    <TrendingUp size={14} />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="group flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className={`rounded-lg p-3 mb-3 ${colorClasses[action.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Content Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 hover:bg-gray-50 transition-colors">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.content}</span>
                  </p>
                  <div className="mt-1 flex items-center space-x-3">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </span>
                    {activity.status === 'published' && (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                        <CheckCircle2 size={12} className="mr-1" />
                        Published
                      </span>
                    )}
                    {activity.status === 'draft' && (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 px-6 py-3">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all activity →
            </button>
          </div>
        </div>

        {/* Content Overview */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Content</h3>
          </div>
          <div className="p-6">
            <div className="mb-4 flex space-x-2">
              <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                All
              </button>
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Published
              </button>
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Drafts
              </button>
            </div>
            <div className="space-y-3">
              {recentContent.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                      {content.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{content.type}</span>
                      <span>•</span>
                      <span>{content.updated}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        content.status === 'Published'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {content.status}
                    </span>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-white hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 px-6 py-3">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all content →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
