import { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  MoreVertical,
  CheckCircle2,
  Clock,
  Filter,
  Grid3x3,
  List,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  image: string;
  status: 'published' | 'draft';
  publishedDate: string;
  updatedDate: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Digital Transformation Journey - Fortune 500 Bank',
    client: 'Global Financial Services Corp',
    industry: 'Financial Services',
    description: 'Complete digital transformation enabling secure remote work for 50,000+ employees.',
    image: 'finance',
    status: 'published',
    publishedDate: '2024-01-10',
    updatedDate: '2024-01-14',
  },
  {
    id: '2',
    title: 'Healthcare Data Security Overhaul',
    client: 'Metropolitan Hospital Network',
    industry: 'Healthcare',
    description: 'HIPAA-compliant security framework protecting 2M+ patient records.',
    image: 'healthcare',
    status: 'published',
    publishedDate: '2024-01-05',
    updatedDate: '2024-01-12',
  },
  {
    id: '3',
    title: 'Manufacturing IoT Security Implementation',
    client: 'Advanced Manufacturing Solutions',
    industry: 'Manufacturing',
    description: 'Securing industrial IoT infrastructure across 15 production facilities.',
    image: 'manufacturing',
    status: 'published',
    publishedDate: '2023-12-20',
    updatedDate: '2024-01-08',
  },
  {
    id: '4',
    title: 'Retail Chain Cloud Migration',
    client: 'National Retail Group',
    industry: 'Retail',
    description: 'Migrating legacy systems to Azure cloud with zero downtime.',
    image: 'retail',
    status: 'draft',
    publishedDate: '',
    updatedDate: '2024-01-15',
  },
  {
    id: '5',
    title: 'Energy Sector Compliance Framework',
    client: 'Renewable Energy Partners',
    industry: 'Energy',
    description: 'Comprehensive GRC framework for critical infrastructure protection.',
    image: 'energy',
    status: 'published',
    publishedDate: '2023-12-15',
    updatedDate: '2024-01-05',
  },
  {
    id: '6',
    title: 'Education Platform Security Assessment',
    client: 'University Learning Systems',
    industry: 'Education',
    description: 'Security audit and remediation for online learning platform serving 100K+ students.',
    image: 'education',
    status: 'published',
    publishedDate: '2023-12-10',
    updatedDate: '2024-01-03',
  },
];

const industries = ['All Industries', 'Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Energy', 'Education'];

export default function CaseStudies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [industryFilter, setIndustryFilter] = useState('All Industries');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
    const matchesIndustry = industryFilter === 'All Industries' || study.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Case Studies</h2>
          <p className="text-gray-600">
            Showcase your client success stories and demonstrate your expertise across different
            industries.
          </p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
          <Plus size={18} />
          <span>New Case Study</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center justify-between space-x-4 flex-wrap gap-4">
        <div className="flex flex-1 min-w-[300px] items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
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
          
          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-gray-300 bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-l-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-r-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Case studies grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-blue-300 opacity-20">
                  {study.image.substring(0, 2).toUpperCase()}
                </div>
                
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
                      study.status === 'published'
                        ? 'bg-green-500/90 text-white'
                        : 'bg-yellow-500/90 text-white'
                    }`}
                  >
                    {study.status === 'published' ? (
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
                </div>

                {/* More menu */}
                <button className="absolute top-4 left-4 rounded-lg p-1.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2 flex items-center space-x-2 text-xs">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-700">
                    {study.industry}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {study.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1 font-medium">{study.client}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{study.description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  {study.status === 'published' ? (
                    <span>Published {study.publishedDate}</span>
                  ) : (
                    <span>Updated {study.updatedDate}</span>
                  )}
                </div>

                {/* Actions */}
                <button className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                  <Edit size={16} />
                  <span>Edit Case Study</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Case Study
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCaseStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{study.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{study.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{study.client}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {study.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          study.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {study.status === 'published' ? (
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
                    <td className="px-6 py-4 text-sm text-gray-600">{study.updatedDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center space-x-1 rounded-lg border border-blue-600 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredCaseStudies.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-400 mb-4">
            📚
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No case studies found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters, or create a new case study.
          </p>
        </div>
      )}
    </div>
  );
}
