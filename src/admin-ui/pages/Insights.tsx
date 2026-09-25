import { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  MoreVertical,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
} from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'published' | 'draft';
  publishedDate: string;
  updatedDate: string;
  views?: number;
  excerpt: string;
}

const insights: Insight[] = [
  {
    id: '1',
    title: 'Cybersecurity Strategy for Financial Institutions in 2024',
    category: 'Cybersecurity',
    author: 'Admin',
    status: 'published',
    publishedDate: '2024-01-15',
    updatedDate: '2024-01-15',
    views: 1247,
    excerpt: 'Explore the latest trends and best practices for securing financial services infrastructure.',
  },
  {
    id: '2',
    title: 'The Future of Zero Trust Architecture',
    category: 'Security',
    author: 'Admin',
    status: 'published',
    publishedDate: '2024-01-12',
    updatedDate: '2024-01-14',
    views: 892,
    excerpt: 'Understanding how Zero Trust is reshaping enterprise security models.',
  },
  {
    id: '3',
    title: 'Cloud Security Best Practices for Healthcare',
    category: 'Cloud',
    author: 'Admin',
    status: 'published',
    publishedDate: '2024-01-10',
    updatedDate: '2024-01-10',
    views: 654,
    excerpt: 'HIPAA-compliant cloud strategies for healthcare organizations.',
  },
  {
    id: '4',
    title: 'AI-Powered Threat Detection: What You Need to Know',
    category: 'Technology',
    author: 'Admin',
    status: 'draft',
    publishedDate: '',
    updatedDate: '2024-01-14',
    excerpt: 'How artificial intelligence is transforming cybersecurity operations.',
  },
  {
    id: '5',
    title: 'GRC Frameworks: A Comprehensive Guide',
    category: 'Compliance',
    author: 'Admin',
    status: 'published',
    publishedDate: '2024-01-08',
    updatedDate: '2024-01-08',
    views: 1123,
    excerpt: 'Navigate the complex landscape of governance, risk, and compliance.',
  },
  {
    id: '6',
    title: 'The Rise of Ransomware: Prevention Strategies',
    category: 'Cybersecurity',
    author: 'Admin',
    status: 'published',
    publishedDate: '2024-01-05',
    updatedDate: '2024-01-07',
    views: 2156,
    excerpt: 'Protect your organization from the growing threat of ransomware attacks.',
  },
  {
    id: '7',
    title: 'Digital Transformation in Manufacturing',
    category: 'Digital Transformation',
    author: 'Admin',
    status: 'published',
    publishedDate: '2024-01-03',
    updatedDate: '2024-01-03',
    views: 734,
    excerpt: 'How Industry 4.0 is revolutionizing manufacturing operations.',
  },
  {
    id: '8',
    title: 'Building a Security-First Culture',
    category: 'Culture',
    author: 'Admin',
    status: 'draft',
    publishedDate: '',
    updatedDate: '2024-01-13',
    excerpt: 'Creating organizational awareness and commitment to cybersecurity.',
  },
];

const categories = [
  'All Categories',
  'Cybersecurity',
  'Security',
  'Cloud',
  'Technology',
  'Compliance',
  'Digital Transformation',
  'Culture',
];

export default function Insights() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || insight.status === statusFilter;
    const matchesCategory =
      categoryFilter === 'All Categories' || insight.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Insights</h2>
          <p className="text-gray-600">
            Manage your blog posts, articles, and thought leadership content. Share your expertise
            with your audience.
          </p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
          <Plus size={18} />
          <span>New Insight</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center justify-between space-x-4 flex-wrap gap-4">
        <div className="flex flex-1 min-w-[300px] items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Insights table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInsights.map((insight) => (
                <tr key={insight.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 mb-1">{insight.title}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">{insight.excerpt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                      {insight.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{insight.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        insight.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {insight.status === 'published' ? (
                        <>
                          <CheckCircle2 size={12} className="mr-1" />
                          Published
                        </>
                      ) : (
                        <>
                          <Clock size={12} className="mr-1" />
                          Draft
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {insight.status === 'published' ? insight.publishedDate : '—'}
                  </td>
                  <td className="px-6 py-4">
                    {insight.views ? (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Eye size={14} />
                        <span>{insight.views.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="inline-flex items-center space-x-1 rounded-lg border border-blue-600 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {filteredInsights.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-400 mb-4">
            ✍️
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters, or create a new insight.
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Insights</div>
          <div className="text-3xl font-bold text-gray-900">{insights.length}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Published</div>
          <div className="text-3xl font-bold text-green-600">
            {insights.filter((i) => i.status === 'published').length}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Drafts</div>
          <div className="text-3xl font-bold text-yellow-600">
            {insights.filter((i) => i.status === 'draft').length}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Views</div>
          <div className="text-3xl font-bold text-blue-600">
            {insights
              .filter((i) => i.views)
              .reduce((sum, i) => sum + (i.views || 0), 0)
              .toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
