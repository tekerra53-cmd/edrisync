import { useState } from 'react';
import {
  LayoutDashboard,
  Image,
  MessageSquare,
  Users,
  Activity,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react';
import edrisyncLogo from '../../assests/img/edrisync-logo.png';
import { cn } from '../utils/cn';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    id: 'content',
    label: 'Website Content',
    icon: Globe,
    children: [
      { id: 'homepage', label: 'Homepage' },
      { id: 'services', label: 'Services' },
      { id: 'case-studies', label: 'Case Studies' },
      { id: 'insights', label: 'Insights' },
      { id: 'team', label: 'Team' },
      { id: 'partners', label: 'Partners' },
      { id: 'client-perspective', label: 'Client Perspective' },
    ],
  },
  { id: 'media', label: 'Media Library', icon: Image },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'users', label: 'Users & Roles', icon: Users },
  { id: 'activity', label: 'Activity Log', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate, collapsed = false, onToggleCollapse }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['content']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-[#000741] to-[#0d2855] text-white transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <img src={edrisyncLogo} alt="Edrisync" className="h-8 w-8 object-contain" />
            <span className="text-lg font-semibold">EdriSync</span>
          </div>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center mx-auto">
            <img src={edrisyncLogo} alt="Edrisync" className="h-8 w-8 object-contain" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || item.children?.some(child => child.id === currentPage);
            const isExpanded = expandedItems.includes(item.id);

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.children) {
                      if (!collapsed) {
                        toggleExpanded(item.id);
                      }
                    } else {
                      onNavigate(item.id);
                    }
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-blue-500/20 text-white shadow-lg shadow-blue-500/10'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white',
                    collapsed && 'justify-center'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && item.children && (
                    <ChevronRight
                      size={16}
                      className={cn('transition-transform', isExpanded && 'rotate-90')}
                    />
                  )}
                </button>

                {/* Sub-items */}
                {item.children && !collapsed && isExpanded && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <button
                          onClick={() => onNavigate(child.id)}
                          className={cn(
                            'flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all',
                            currentPage === child.id
                              ? 'bg-blue-500/10 text-white font-medium'
                              : 'text-blue-100 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/10 p-4">
        {!collapsed && (
          <div className="mt-3 flex items-center space-x-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Admin</div>
              <div className="text-xs text-blue-200 truncate">admin@edrisync.com</div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="mt-3 flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold">
              AD
            </div>
          </div>
        )}

        <button
          onClick={() => {}}
          className={cn(
            'mt-3 flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
