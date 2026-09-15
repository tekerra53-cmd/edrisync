import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import edrisyncLogo from '../assests/img/edrisync-logo.png';

export default function PillNavbar({ refs, announcementVisible = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const closeTimer = useRef(null);

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    window.clearTimeout(closeTimer.current);
    // The small delay lets the pointer travel naturally from the trigger to
    // the dropdown without making the menu disappear mid-move.
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Both bars are fixed, so the navbar sits a fixed offset below the
  // announcement bar regardless of scroll. When the announcement is
  // dismissed, the navbar moves up to the top.
  const navTop = announcementVisible ? '64px' : '12px';
  // Dropdown sits just below the navbar pill (navbar top + ~56px pill height)
  // and above the announcement bar in z-index.
  const dropdownTop = announcementVisible ? '128px' : '76px';

  const navItems = [
    { label: 'Home', action: refs?.goHome },
    { label: 'About', action: refs?.goAbout },
    { label: 'Services', action: refs?.goServices, dropdown: true },
    { label: 'Industries', ref: refs?.industries },
    { label: 'Case Studies', ref: refs?.portfolio },
    { label: 'Insights', action: refs?.goInsights },
  ];

  const serviceItems = [
    'Cybersecurity',
    'GRC & Compliance',
    'Microsoft & Digital Workplace',
    'Digital Transformation',
  ];

  const handleNav = (item) => {
    if (item.dropdown) {
      window.clearTimeout(closeTimer.current);
      setServicesOpen((open) => !open);
      return;
    }
    if (item.action) {
      item.action();
    } else if (item.ref) {
      refs?.goSection?.(item.ref);
    }
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const isActive = (item) => {
    if (item.label === 'Home') return refs?.view === 'home';
    if (item.label === 'Insights') return refs?.view === 'insights';
    if (item.label === 'Services') return refs?.view === 'services' || refs?.view === 'serviceDetail';
    if (item.label === 'About') return refs?.view === 'about';
    if (item.label === 'Case Studies') return refs?.view === 'caseStudies';
    return false;
  };

  const isActiveService = (service) => refs?.view === 'serviceDetail' && refs?.selectedService === service;

  return (
    <>
      {/* Wide navigation shell with the lavender sweep from the brand reference. */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="nav-fixed fixed z-50 left-2 right-2 sm:left-3 sm:right-3 flex items-center min-h-[72px] overflow-hidden rounded-[24px] px-4 sm:px-6 lg:px-7 transition-all duration-400"
        style={{
          top: navTop,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.84) 0%, rgba(213,230,249,0.56) 100%)',
          backdropFilter: 'blur(18px) saturate(165%)',
          WebkitBackdropFilter: 'blur(18px) saturate(165%)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.82), 0 16px 36px rgba(4,7,32,0.24), inset 0 0 22px rgba(255,255,255,0.78), inset 0 -1px 8px rgba(4,7,32,0.10)',
          border: '1px solid rgba(255,255,255,0.92)',
        }}
        onMouseLeave={() => {
          setHoveredNavItem(null);
          closeServices();
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-8 -top-12 z-0 hidden h-36 w-[285px] -skew-x-[24deg] rounded-[46%] lg:block" style={{ background: '#040720', boxShadow: '28px 0 0 #040720, 0 0 26px rgba(177,182,206,0.48), inset 0 1px 0 rgba(255,255,255,0.28)', border: '1px solid rgba(255,255,255,0.18)' }} />
        {/* Logo mark */}
        <button
          onClick={() => refs?.goHome?.()}
          className="relative z-10 flex shrink-0 items-center gap-2.5 text-left"
        >
          <img
            src={edrisyncLogo}
            alt="EdriSync"
            className="h-11 w-12 object-contain"
            draggable={false}
          />
          <span className="hidden leading-none sm:block">
            <span className="edrisync-deconstructed block text-[18px] font-extrabold tracking-[-0.04em]" aria-label="EdriSync">
              <span aria-hidden="true">EdriSync</span>
              <span aria-hidden="true">EdriSync</span>
              <span aria-hidden="true">EdriSync</span>
              <span aria-hidden="true">EdriSync</span>
            </span>
            <span className="mt-1 block text-[8px] font-medium tracking-[0.01em] text-[#B1B6CE]">we Build. Create. & Innovate.</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="absolute left-1/2 z-20 hidden max-w-[min(50vw,620px)] -translate-x-1/2 items-center gap-0.5 rounded-full bg-white px-3 py-2 shadow-[0_5px_18px_rgba(44,39,92,0.06)] lg:left-[54%] xl:left-1/2 lg:flex" style={{ border: '1px solid rgba(4,7,32,0.08)' }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              onMouseEnter={() => {
                setHoveredNavItem(item.label);
                item.dropdown ? openServices() : closeServices();
              }}
              className="flex items-center gap-1 rounded-full px-4 py-2 text-[11px] font-bold text-[#040720] transition-all duration-200 whitespace-nowrap"
              style={isActive(item)
                ? { background: 'var(--edri-nav-blue)', color: '#ffffff', boxShadow: '0 6px 14px rgba(4,7,32,0.24)' }
                : hoveredNavItem === item.label
                  ? { background: '#B1B6CE', color: '#040720', boxShadow: '0 4px 10px rgba(4,7,32,0.1)' }
                  : undefined}
            >
              {item.label}
              {item.dropdown && <ChevronDown className={`h-3 w-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} strokeWidth={1.8} />}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-4 lg:flex">
          <button
            onClick={() => refs?.goSection?.(refs?.cta)}
            className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[11px] font-medium text-white shadow-[0_8px_16px_rgba(4,7,32,0.25)] transition-all duration-200"
            style={{ backgroundColor: 'var(--edri-nav-blue)', color: '#ffffff' }}
            >
              Contact Us <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </button>
          </div>

        {/* Mobile hamburger */}
        <div className="relative z-10 ml-auto flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#040720] p-1.5 rounded-lg hover:bg-[#040720]/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Desktop Services dropdown */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed left-1/2 z-[70] hidden w-[280px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[#040720]/10 bg-white/98 p-2 shadow-[0_16px_48px_rgba(4,7,32,0.18)] backdrop-blur-xl lg:block"
            style={{ top: dropdownTop }}
            onMouseEnter={openServices}
            onMouseLeave={closeServices}
          >
              {serviceItems.map((service) => (
                <button
                  key={service}
                  onClick={() => handleNav({ action: () => refs?.goServiceDetail?.(service) })}
                  onMouseEnter={() => setHoveredService(service)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="flex min-h-[42px] w-full items-center rounded-xl px-4 py-2 text-left text-[12px] font-medium transition-all duration-200"
                  style={isActiveService(service)
                    ? { backgroundColor: '#040720', color: '#ffffff', boxShadow: '0 6px 14px rgba(4,7,32,0.18)' }
                    : hoveredService === service
                      ? { backgroundColor: '#B1B6CE', color: '#040720' }
                      : { color: '#040720' }}
                >
                {service}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
               boxShadow: '0 16px 48px rgba(4,7,32,0.20)',
               border: '1px solid rgba(4,7,32,0.08)',
             }}
           >
             <div className="p-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                   <button
                     onClick={() => handleNav(item)}
                     className="flex min-h-[48px] w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-[#040720] transition-all duration-300 hover:bg-[#ffffff] hover:text-[#040720]"
                     style={isActive(item) ? { background: 'var(--edri-nav-blue)', color: '#ffffff', fontWeight: 600, boxShadow: '0 6px 14px rgba(4,7,32,0.2)' } : undefined}
                   >
                    {item.label}
                    {item.dropdown && <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />}
                  </button>
                  {item.dropdown && servicesOpen && (
                    <div className="ml-3 border-l border-[#040720]/15 pl-2">
                      {serviceItems.map((service) => (
                         <button
                           key={service}
                           onClick={() => handleNav({ action: () => refs?.goServiceDetail?.(service) })}
                           className="flex min-h-[42px] w-full items-center rounded-lg px-3 py-2 text-left text-xs text-[#B1B6CE] transition-all duration-300 hover:bg-[#ffffff] hover:text-[#040720]"
                         >
                          {service}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t mt-1 pt-2" style={{ borderColor: 'rgba(4,7,32,0.08)' }}>
                <button
                  onClick={() => refs?.goSection?.(refs?.cta)}
                  className="text-white text-sm w-full px-4 py-3 rounded-xl font-medium mt-1 min-h-[48px] transition-all duration-200"
                  style={{ backgroundColor: '#040720' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B1B6CE')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#040720')}
                >
                  Request a Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
