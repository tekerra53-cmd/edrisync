import {
  GripVertical,
  Edit,
  Eye,
  EyeOff,
  Save,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

interface Section {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  lastUpdated: string;
}

const initialSections: Section[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Main banner with headline, subheadline, and call-to-action',
    enabled: true,
    lastUpdated: '2 hours ago',
  },
  {
    id: 'trust',
    name: 'Trust & Clients',
    description: 'Client logos and trust indicators',
    enabled: true,
    lastUpdated: '3 days ago',
  },
  {
    id: 'services',
    name: 'Services Overview',
    description: 'Featured services grid with icons and descriptions',
    enabled: true,
    lastUpdated: '1 week ago',
  },
  {
    id: 'industries',
    name: 'Industries Served',
    description: 'Industry sectors and expertise areas',
    enabled: true,
    lastUpdated: '1 week ago',
  },
  {
    id: 'case-studies',
    name: 'Case Studies Showcase',
    description: 'Featured client success stories',
    enabled: true,
    lastUpdated: '5 days ago',
  },
  {
    id: 'insights',
    name: 'Latest Insights',
    description: 'Recent blog posts and thought leadership',
    enabled: true,
    lastUpdated: '2 days ago',
  },
  {
    id: 'cta',
    name: 'Call-to-Action',
    description: 'Contact and consultation CTA section',
    enabled: true,
    lastUpdated: '1 month ago',
  },
  {
    id: 'footer',
    name: 'Footer',
    description: 'Footer navigation, social links, and company info',
    enabled: true,
    lastUpdated: '2 weeks ago',
  },
];

export default function Homepage() {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    // Mock save
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Homepage Management</h2>
          <p className="text-gray-600">
            Manage the sections and content of your homepage. Drag to reorder, toggle to
            enable/disable, and edit to customize each section.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            <span>Preview Website</span>
            <ExternalLink size={14} />
          </a>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center space-x-2 rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`group relative rounded-xl border-2 bg-white p-6 shadow-sm transition-all hover:shadow-md ${
              section.enabled ? 'border-gray-200' : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Drag handle */}
              <button className="mt-1 cursor-grab p-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing">
                <GripVertical size={20} />
              </button>

              {/* Section number */}
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                  section.enabled
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>

              {/* Section info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{section.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <span className="mr-2 font-medium">Status:</span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 font-medium ${
                        section.enabled
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {section.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </span>
                  <span>Last updated: {section.lastUpdated}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {}}
                  className="flex items-center space-x-2 rounded-lg border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                    section.enabled
                      ? 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                      : 'border-green-600 bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                  title={section.enabled ? 'Disable section' : 'Enable section'}
                >
                  {section.enabled ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Preview thumbnail - placeholder */}
            {section.enabled && (
              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs text-gray-500 mb-2">Preview:</div>
                <div className="h-24 rounded border border-dashed border-gray-300 bg-white flex items-center justify-center text-sm text-gray-400">
                  Section preview
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Drag sections to reorder them on your homepage</li>
          <li>• Toggle the eye icon to enable or disable sections without deleting them</li>
          <li>• Click "Edit" to customize the content and settings of each section</li>
          <li>• Don't forget to save your changes before leaving this page</li>
        </ul>
      </div>
    </div>
  );
}
