import { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  MoreVertical,
  Shield,
  FileCheck,
  Cloud,
  Sparkles,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'published' | 'draft';
  lastUpdated: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and infrastructure from evolving threats.',
    icon: 'shield',
    status: 'published',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'GRC & Compliance',
    description: 'Governance, risk, and compliance frameworks tailored to your industry requirements.',
    icon: 'filecheck',
    status: 'published',
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: 'Microsoft & Digital Workplace',
    description: 'Modern workplace solutions powered by Microsoft 365 and Azure technologies.',
    icon: 'cloud',
    status: 'published',
    lastUpdated: '2024-01-13',
  },
  {
    id: '4',
    name: 'Digital Transformation',
    description: 'Strategic consulting to help organizations navigate and accelerate digital change.',
    icon: 'sparkles',
    status: 'published',
    lastUpdated: '2024-01-12',
  },
  {
    id: '5',
    name: 'Cloud Security Assessment',
    description: 'Comprehensive evaluation of your cloud infrastructure security posture and vulnerabilities.',
    icon: 'cloud',
    status: 'draft',
    lastUpdated: '2024-01-10',
  },
  {
    id: '6',
    name: 'Incident Response',
    description: '24/7 rapid response team for security incidents and breach management.',
    icon: 'shield',
    status: 'published',
    lastUpdated: '2024-01-08',
  },
  {
    id: '7',
    name: 'Security Awareness Training',
    description: 'Employee education programs to build a strong security culture.',
    icon: 'shield',
    status: 'published',
    lastUpdated: '2024-01-05',
  },
  {
    id: '8',
    name: 'Penetration Testing',
    description: 'Ethical hacking and security testing to identify vulnerabilities before attackers do.',
    icon: 'shield',
    status: 'draft',
    lastUpdated: '2024-01-03',
  },
];

const iconMap = {
  shield: Shield,
  filecheck: FileCheck,
  cloud: Cloud,
  sparkles: Sparkles,
};

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Services</h2>
          <p className="text-gray-600">
            Manage the services displayed across your website. Add, edit, or remove services to
            keep your offerings up to date.
          </p>
        </div>
        <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
          <Plus size={18} />
          <span>New Service</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex flex-1 items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
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

      {/* Services grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] || Shield;
          return (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    service.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {service.status === 'published' ? (
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
                <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon size={28} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Updated {service.lastUpdated}</span>
              </div>

              {/* Actions */}
              <button className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors">
                <Edit size={16} />
                <span>Edit Service</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-400 mb-4">
            <Shield size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters, or create a new service.
          </p>
          <button className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            <Plus size={18} />
            <span>Create New Service</span>
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Services</div>
          <div className="text-3xl font-bold text-gray-900">{services.length}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Published</div>
          <div className="text-3xl font-bold text-green-600">
            {services.filter((s) => s.status === 'published').length}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Drafts</div>
          <div className="text-3xl font-bold text-yellow-600">
            {services.filter((s) => s.status === 'draft').length}
          </div>
        </div>
      </div>
    </div>
  );
}
