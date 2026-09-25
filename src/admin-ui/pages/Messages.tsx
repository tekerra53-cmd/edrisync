import { useState } from 'react';
import {
  Search,
  Mail,
  MailOpen,
  Star,
  Trash2,
  Reply,
  CheckCircle,
  Building2,
  Phone,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  service?: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  status: 'new' | 'replied' | 'resolved';
}

const messages: Message[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sjohnson@globalbank.com',
    company: 'Global Bank Corp',
    phone: '+1 (555) 123-4567',
    subject: 'Enterprise Security Assessment',
    service: 'Cybersecurity',
    message:
      "We're interested in conducting a comprehensive security assessment for our organization. We have approximately 5,000 employees across 12 locations and need to evaluate our current security posture. Could we schedule a consultation to discuss our specific requirements?",
    date: '2024-01-15',
    time: '10:30 AM',
    read: false,
    status: 'new',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@healthsystems.com',
    company: 'Health Systems Inc',
    phone: '+1 (555) 234-5678',
    subject: 'HIPAA Compliance Consulting',
    service: 'GRC & Compliance',
    message:
      'Our healthcare network is expanding and we need to ensure HIPAA compliance across all our facilities. We would like to discuss your GRC services and how you can help us maintain compliance while scaling our operations.',
    date: '2024-01-14',
    time: '2:15 PM',
    read: true,
    status: 'replied',
  },
  {
    id: '3',
    name: 'Jennifer Williams',
    email: 'jwilliams@manufactureco.com',
    company: 'Manufacturing Co',
    phone: '+1 (555) 345-6789',
    subject: 'IoT Security for Production Facilities',
    service: 'Cybersecurity',
    message:
      "We're implementing IoT sensors across our production facilities and need guidance on securing our industrial control systems. Can you provide information about your IoT security services?",
    date: '2024-01-13',
    time: '4:45 PM',
    read: true,
    status: 'resolved',
  },
  {
    id: '4',
    name: 'David Martinez',
    email: 'dmartinez@retailgroup.com',
    company: 'National Retail Group',
    phone: '+1 (555) 456-7890',
    subject: 'Cloud Migration Support',
    service: 'Microsoft & Digital Workplace',
    message:
      'We are planning to migrate our legacy systems to Microsoft Azure. We need expertise in ensuring a secure migration with minimal disruption to our operations. Please share details about your cloud migration services.',
    date: '2024-01-12',
    time: '11:20 AM',
    read: false,
    status: 'new',
  },
  {
    id: '5',
    name: 'Emily Anderson',
    email: 'eanderson@energypartners.com',
    company: 'Energy Partners LLC',
    subject: 'Critical Infrastructure Protection',
    service: 'GRC & Compliance',
    message:
      'As an energy provider, we need to enhance our critical infrastructure protection. We would like to schedule a meeting to discuss your approach to securing energy sector operations.',
    date: '2024-01-11',
    time: '9:00 AM',
    read: true,
    status: 'replied',
  },
  {
    id: '6',
    name: 'Robert Taylor',
    email: 'rtaylor@university.edu',
    company: 'State University',
    phone: '+1 (555) 567-8901',
    subject: 'Educational Platform Security',
    service: 'Cybersecurity',
    message:
      'Our online learning platform serves over 50,000 students. We need a security audit and recommendations for protecting student data and ensuring platform availability.',
    date: '2024-01-10',
    time: '3:30 PM',
    read: true,
    status: 'resolved',
  },
];

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(messages[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'replied' | 'resolved'>('all');

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Messages</h2>
          <p className="text-gray-600">
            Manage contact form submissions and client inquiries from your website.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-700">
            {messages.filter((m) => m.status === 'new').length} New
          </span>
        </div>
      </div>

      {/* Messages inbox */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message list */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Search and filter */}
            <div className="border-b border-gray-200 p-4 space-y-3">
              <div className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as 'all' | 'new' | 'replied' | 'resolved')
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="all">All Messages</option>
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Message list */}
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto scrollbar-thin">
              {filteredMessages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={cn(
                    'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                    selectedMessage?.id === message.id && 'bg-blue-50 hover:bg-blue-50',
                    !message.read && 'bg-blue-50/30'
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                          message.read
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-blue-600 text-white'
                        )}
                      >
                        {message.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      {!message.read ? (
                        <Mail size={16} className="text-blue-600" />
                      ) : (
                        <MailOpen size={16} className="text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <h4
                    className={cn(
                      'text-sm mb-1',
                      message.read ? 'font-medium text-gray-900' : 'font-semibold text-gray-900'
                    )}
                  >
                    {message.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 truncate">{message.subject}</p>
                  <div className="flex items-center justify-between">
                    {message.company && (
                      <span className="text-xs text-gray-500 truncate">{message.company}</span>
                    )}
                    <span
                      className={cn(
                        'ml-auto rounded-full px-2 py-0.5 text-xs font-medium',
                        message.status === 'new' && 'bg-red-100 text-red-700',
                        message.status === 'replied' && 'bg-blue-100 text-blue-700',
                        message.status === 'resolved' && 'bg-green-100 text-green-700'
                      )}
                    >
                      {message.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{selectedMessage.date}</span>
                      <span>•</span>
                      <span>{selectedMessage.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                      <Star size={18} />
                    </button>
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Sender info */}
                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                    {selectedMessage.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {selectedMessage.name}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail size={14} />
                        <a href={`mailto:${selectedMessage.email}`} className="hover:text-blue-600">
                          {selectedMessage.email}
                        </a>
                      </div>
                      {selectedMessage.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone size={14} />
                          <a href={`tel:${selectedMessage.phone}`} className="hover:text-blue-600">
                            {selectedMessage.phone}
                          </a>
                        </div>
                      )}
                      {selectedMessage.company && (
                        <div className="flex items-center space-x-2">
                          <Building2 size={14} />
                          <span>{selectedMessage.company}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedMessage.service && (
                  <div className="mt-4">
                    <span className="text-xs font-medium text-gray-600">Service Interested:</span>
                    <span className="ml-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {selectedMessage.service}
                    </span>
                  </div>
                )}
              </div>

              {/* Message body */}
              <div className="p-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedMessage.status}
                      onChange={() => {}}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="new">New</option>
                      <option value="replied">Replied</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <CheckCircle size={16} />
                      <span>Mark as Resolved</span>
                    </button>
                    <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                      <Reply size={16} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
              <Mail size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a message to view
              </h3>
              <p className="text-gray-600">
                Choose a message from the list to see its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
