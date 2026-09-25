import { Search, Bell, ExternalLink, Menu, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  onMenuClick?: () => void;
}

export default function Header({ title, breadcrumbs, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden -ml-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-0.5">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {index > 0 && <ChevronRight size={14} />}
                    <span
                      className={cn(
                        index === breadcrumbs.length - 1
                          ? 'text-gray-900 font-medium'
                          : 'hover:text-gray-700 cursor-pointer'
                      )}
                    >
                      {crumb.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 w-64">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* View Website */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <span>View Website</span>
            <ExternalLink size={16} />
          </a>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* User menu */}
          <div className="hidden sm:flex items-center space-x-3 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-semibold text-white">
              AD
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium text-gray-900">Admin</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
