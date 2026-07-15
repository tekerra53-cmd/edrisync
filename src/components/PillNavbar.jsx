import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import edrisyncLogo from '../assests/img/edrisync-logo.png';

export default function PillNavbar({ refs }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Both bars are always visible (fixed), so the navbar sits a fixed offset
  // below the announcement bar regardless of scroll.
  const navTop = '64px';
  // Dropdown sits just below the navbar pill (navbar top + ~56px pill height)
  // and above the announcement bar in z-index.
  const dropdownTop = '128px';

  const navItems = [
    { label: 'Home', ref: refs?.home },
    { label: 'About', ref: refs?.about },
    { label: 'Services', ref: refs?.services },
    { label: 'Projects', ref: refs?.portfolio },
    { label: 'Blog', action: refs?.goBlog },
  ];

  const handleNav = (item) => {
    if (item.action) {
      item.action();
    } else if (item.ref) {
      refs?.goSection?.(item.ref);
    }
    setMobileOpen(false);
  };

  const isActive = (item) => (item.label === 'Blog' ? refs?.view === 'blog' : false);

  return (
    <>
      {/* Floating Pill Navbar — light theme so the blue logo stays visible */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="nav-fixed fixed z-50 left-4 right-4 mx-auto w-fit max-w-[920px] flex items-center gap-2 lg:gap-6 px-4 lg:px-5 py-2.5 rounded-full transition-all duration-400"
        style={{
          top: navTop,
          backgroundColor: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          boxShadow: '0 8px 30px rgba(16,83,243,0.22), 0 0 18px rgba(16,83,243,0.14), inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 1px rgba(16,83,243,0.08)',
        }}
      >
        {/* Logo mark */}
        <button
          onClick={() => refs?.goHome?.()}
          className="flex items-center gap-2.5 shrink-0 pr-2"
          style={{ borderRight: '1px solid rgba(6,17,83,0.10)' }}
        >
          <img
            src={edrisyncLogo}
            alt="EdriSync"
            className="h-7 w-auto"
            draggable={false}
          />
          <span className="text-[#061153] font-extrabold text-lg tracking-tight">EdriSync</span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="text-[#061153] hover:text-[#1053F3] text-[13px] px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap hover:bg-[#061153]/5"
              style={isActive(item) ? { background: 'rgba(16,83,243,0.10)', color: '#1053F3', fontWeight: 600 } : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 pl-2"
          style={{ borderLeft: '1px solid rgba(6,17,83,0.10)' }}>
          <button
            onClick={() => refs?.goSection?.(refs?.cta)}
            className="text-white text-[13px] px-5 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
            style={{ backgroundColor: '#061153' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1053F3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#061153')}
          >
            Contact us
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-3 ml-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#061153] p-1.5 rounded-lg hover:bg-[#061153]/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

       {/* Mobile dropdown */}
       <AnimatePresence>
         {mobileOpen && (
           <motion.div
             initial={{ opacity: 0, y: -8, scale: 0.97 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -8, scale: 0.97 }}
             transition={{ duration: 0.18, ease: 'easeOut' }}
             className="dropdown-fixed fixed z-[70] rounded-2xl overflow-hidden"
             style={{
               top: dropdownTop,
               left: '1rem',
               right: '1rem',
               maxHeight: 'calc(100vh - 8rem)',
               overflowY: 'auto',
               backgroundColor: 'rgba(255,255,255,0.98)',
               backdropFilter: 'blur(24px)',
               WebkitBackdropFilter: 'blur(24px)',
               boxShadow: '0 16px 48px rgba(6,17,83,0.20)',
               border: '1px solid rgba(6,17,83,0.08)',
             }}
           >
             <div className="p-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className="text-[#061153] hover:text-[#1053F3] text-sm text-left px-4 py-3 rounded-xl hover:bg-[#061153]/5 transition-all duration-150 min-h-[48px] flex items-center"
                  style={isActive(item) ? { background: 'rgba(16,83,243,0.10)', color: '#1053F3', fontWeight: 600 } : undefined}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t mt-1 pt-2" style={{ borderColor: 'rgba(6,17,83,0.08)' }}>
                <button
                  onClick={() => refs?.goSection?.(refs?.cta)}
                  className="text-white text-sm w-full px-4 py-3 rounded-xl font-medium mt-1 min-h-[48px] transition-all duration-200"
                  style={{ backgroundColor: '#061153' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1053F3')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#061153')}
                >
                  Contact us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
