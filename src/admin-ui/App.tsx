import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Insights from './pages/Insights';
import MediaLibrary from './pages/MediaLibrary';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import ActivityLog from './pages/ActivityLog';
import Users from './pages/Users';
import CollectionPage from './pages/CollectionPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pageConfig: Record<string, { title: string; breadcrumbs?: { label: string }[] }> = {
    dashboard: { title: 'Dashboard' },
    homepage: { title: 'Homepage', breadcrumbs: [{ label: 'Website Content' }, { label: 'Homepage' }] },
    services: { title: 'Services', breadcrumbs: [{ label: 'Website Content' }, { label: 'Services' }] },
    'case-studies': { title: 'Case Studies', breadcrumbs: [{ label: 'Website Content' }, { label: 'Case Studies' }] },
    insights: { title: 'Insights', breadcrumbs: [{ label: 'Website Content' }, { label: 'Insights' }] },
    team: { title: 'Team', breadcrumbs: [{ label: 'Website Content' }, { label: 'Team' }] },
    partners: { title: 'Partners', breadcrumbs: [{ label: 'Website Content' }, { label: 'Partners' }] },
    'client-perspective': { title: 'Client Perspective', breadcrumbs: [{ label: 'Website Content' }, { label: 'Client Perspective' }] },
    media: { title: 'Media Library' },
    messages: { title: 'Messages' },
    users: { title: 'Users & Roles' },
    activity: { title: 'Activity Log' },
    settings: { title: 'Settings' },
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'homepage':
        return <Homepage />;
      case 'services':
        return <Services />;
      case 'case-studies':
        return <CaseStudies />;
      case 'insights':
        return <Insights />;
      case 'team':
        return <CollectionPage type="team" />;
      case 'partners':
        return <CollectionPage type="partners" />;
      case 'client-perspective':
        return <CollectionPage type="perspectives" />;
      case 'media':
        return <MediaLibrary />;
      case 'messages':
        return <Messages />;
      case 'users':
        return <Users />;
      case 'activity':
        return <ActivityLog />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const config = pageConfig[currentPage] || pageConfig.dashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            setMobileSidebarOpen(false);
          }}
          collapsed={false}
          onToggleCollapse={() => {}}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Header
          title={config.title}
          breadcrumbs={config.breadcrumbs}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main className="p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
