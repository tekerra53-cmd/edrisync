import { useState } from 'react';
import {
  Upload,
  Search,
  Grid3x3,
  List,
  Filter,
  MoreVertical,
  Download,
  Trash2,
  Image as ImageIcon,
  File,
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'document';
  size: string;
  dimensions?: string;
  uploadDate: string;
  url: string;
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'hero-background.jpg',
    type: 'image',
    size: '2.4 MB',
    dimensions: '1920 × 1080',
    uploadDate: '2024-01-15',
    url: '#',
  },
  {
    id: '2',
    name: 'cybersecurity-illustration.png',
    type: 'image',
    size: '856 KB',
    dimensions: '1200 × 800',
    uploadDate: '2024-01-14',
    url: '#',
  },
  {
    id: '3',
    name: 'case-study-finance.jpg',
    type: 'image',
    size: '1.8 MB',
    dimensions: '1600 × 900',
    uploadDate: '2024-01-13',
    url: '#',
  },
  {
    id: '4',
    name: 'service-icon-grc.svg',
    type: 'image',
    size: '24 KB',
    dimensions: '512 × 512',
    uploadDate: '2024-01-12',
    url: '#',
  },
  {
    id: '5',
    name: 'client-logo-bank.png',
    type: 'image',
    size: '128 KB',
    dimensions: '400 × 200',
    uploadDate: '2024-01-11',
    url: '#',
  },
  {
    id: '6',
    name: 'insight-thumbnail-1.jpg',
    type: 'image',
    size: '945 KB',
    dimensions: '1200 × 630',
    uploadDate: '2024-01-10',
    url: '#',
  },
  {
    id: '7',
    name: 'company-brochure.pdf',
    type: 'document',
    size: '3.2 MB',
    uploadDate: '2024-01-09',
    url: '#',
  },
  {
    id: '8',
    name: 'team-photo.jpg',
    type: 'image',
    size: '2.1 MB',
    dimensions: '2400 × 1600',
    uploadDate: '2024-01-08',
    url: '#',
  },
  {
    id: '9',
    name: 'industry-healthcare.jpg',
    type: 'image',
    size: '1.5 MB',
    dimensions: '1600 × 900',
    uploadDate: '2024-01-07',
    url: '#',
  },
  {
    id: '10',
    name: 'award-badge.png',
    type: 'image',
    size: '256 KB',
    dimensions: '800 × 800',
    uploadDate: '2024-01-06',
    url: '#',
  },
  {
    id: '11',
    name: 'pattern-background.svg',
    type: 'image',
    size: '18 KB',
    dimensions: '1920 × 1080',
    uploadDate: '2024-01-05',
    url: '#',
  },
  {
    id: '12',
    name: 'whitepaper-zerotrust.pdf',
    type: 'document',
    size: '4.5 MB',
    uploadDate: '2024-01-04',
    url: '#',
  },
];

export default function MediaLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'document'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Media Library</h2>
          <p className="text-gray-600">
            Upload and manage images, documents, and other media files used across your website.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
        >
          <Upload size={18} />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center justify-between space-x-4 flex-wrap gap-4">
        <div className="flex flex-1 min-w-[300px] items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'image' | 'document')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
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

      {/* Media grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {item.type === 'image' ? (
                  <ImageIcon size={48} className="text-gray-400" />
                ) : (
                  <File size={48} className="text-gray-400" />
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-2">
                    <button className="rounded-lg bg-white p-2 text-gray-700 hover:bg-gray-100 transition-colors">
                      <Download size={18} />
                    </button>
                    <button className="rounded-lg bg-white p-2 text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate flex-1 pr-2">
                    {item.name}
                  </h3>
                  <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="space-y-1 text-xs text-gray-500">
                  {item.dimensions && <div>{item.dimensions}</div>}
                  <div>{item.size}</div>
                  <div>{item.uploadDate}</div>
                </div>
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
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                          {item.type === 'image' ? (
                            <ImageIcon size={20} className="text-gray-600" />
                          ) : (
                            <File size={20} className="text-gray-600" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 capitalize">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.dimensions || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.uploadDate}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Download size={16} />
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
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-2xl w-full rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Media</h3>
            
            {/* Drop zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Upload size={32} />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </h4>
                <p className="text-sm text-gray-600">
                  Supports: JPG, PNG, SVG, GIF, PDF (Max 10MB)
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Files</div>
          <div className="text-3xl font-bold text-gray-900">{mediaItems.length}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Images</div>
          <div className="text-3xl font-bold text-blue-600">
            {mediaItems.filter((i) => i.type === 'image').length}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-600 mb-1">Documents</div>
          <div className="text-3xl font-bold text-purple-600">
            {mediaItems.filter((i) => i.type === 'document').length}
          </div>
        </div>
      </div>
    </div>
  );
}
