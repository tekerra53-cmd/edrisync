import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import PillNavbar from './components/PillNavbar';
import HeroSection from './components/HeroSection';
import ClientLogos from './components/ClientLogos';
import ServicesSection from './components/ServicesSection';
import WhyEdrisync from './components/WhyEdrisync';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import VisionSection from './components/VisionSection';
import ApproachSection from './components/ApproachSection';
import AboutSection from './components/AboutSection';
import IndustriesSection from './components/IndustriesSection';
import PortfolioSection from './components/PortfolioSection';
import AdminDashboard from './components/AdminDashboard';
import LegalPage from './components/LegalPage';
import NotFoundPage from './components/NotFoundPage';
const AboutPage = lazy(() => import('./components/AboutPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage'));
const InsightsPage = lazy(() => import('./components/InsightsPage'));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'));

type PublicView = 'home' | 'services' | 'serviceDetail' | 'insights' | 'about' | 'caseStudies';

function getPublicView(pathname: string): PublicView {
  if (pathname === '/about') return 'about';
  if (pathname === '/services') return 'services';
  if (pathname.startsWith('/services/')) return 'serviceDetail';
  if (pathname === '/insights') return 'insights';
  if (pathname === '/case-studies') return 'caseStudies';
  return 'home';
}

function PublicApp() {
  const [view, setView] = useState<PublicView>(() => getPublicView(window.location.pathname));
  const [selectedService, setSelectedService] = useState<string | null>(() => window.location.pathname.startsWith('/services/') ? decodeURIComponent(window.location.pathname.slice('/services/'.length)) : null);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState(window.location.pathname);
  const pendingScroll = useRef<any>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const nextPath = window.location.pathname;
      setPath(nextPath);
      setView(getPublicView(nextPath));
      setSelectedService(nextPath.startsWith('/services/') ? decodeURIComponent(nextPath.slice('/services/'.length)) : null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const industriesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  const scrollToRef = (ref?: any) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goHome = () => {
    if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
    setPath('/');
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPage = (nextPath: string, nextView: PublicView, service: string | null = null) => {
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    setSelectedService(service);
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goLegal = (legalPath: '/privacy-policy' | '/terms-and-conditions' | '/cookie-policy') => {
    window.history.pushState({}, '', legalPath);
    setPath(legalPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goAbout = () => {
    goPage('/about', 'about');
  };

  const goServices = () => {
    goPage('/services', 'services');
  };

  const goServiceDetail = (service?: string) => {
    const selected = service || null;
    goPage(selected ? `/services/${encodeURIComponent(selected)}` : '/services', selected ? 'serviceDetail' : 'services', selected);
  };

  const goInsights = () => {
    goPage('/insights', 'insights');
  };

  const goCaseStudies = () => {
    goPage('/case-studies', 'caseStudies');
  };

  // Scroll to a home section. If we're on a page view, switch back to
  // home first, then scroll once the home sections have mounted.
  const goSection = (ref?: any) => {
    if (view === 'home') {
      scrollToRef(ref);
    } else {
      pendingScroll.current = ref;
      if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
      setPath('/');
      setView('home');
    }
  };

  useEffect(() => {
    if (view === 'home' && pendingScroll.current) {
      const ref = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToRef(ref)));
    }
  }, [view]);

     const refs = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    industries: industriesRef,
    why: whyRef,
    testimonials: testimonialsRef,
    cta: ctaRef,
    portfolio: portfolioRef,
    goHome,
    goSection,
    goInsights,
    goCaseStudies,
    goAbout,
    goServices,
    goServiceDetail,
    view,
    selectedService,
    goLegal,
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Initial loading screen */}
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <PillNavbar refs={refs} />

      {path === '/privacy-policy' ? <LegalPage type="privacy" onHome={goHome} /> : path === '/terms-and-conditions' ? <LegalPage type="terms" onHome={goHome} /> : path === '/cookie-policy' ? <LegalPage type="cookies" onHome={goHome} /> : path !== '/' && getPublicView(path) === 'home' ? <NotFoundPage onHome={goHome} /> : <>
      {/* Page sections */}
      <main>
        {view === 'home' ? (
          <>
            <HeroSection sectionRef={homeRef} refs={refs} />
            <ClientLogos />
            <VisionSection />
            <ApproachSection />
            <AboutSection sectionRef={aboutRef} onAbout={goAbout} />
            <ServicesSection sectionRef={servicesRef} onServiceDetail={goServiceDetail} />
            <IndustriesSection sectionRef={industriesRef} />
            <PortfolioSection sectionRef={portfolioRef} onViewMore={goCaseStudies} />
            <WhyEdrisync sectionRef={whyRef} refs={refs} />
            <Testimonials sectionRef={testimonialsRef} />
            <CTASection sectionRef={ctaRef} />
          </>
        ) : view === 'services' ? (
          <Suspense fallback={null}><ServicesPage onHome={goHome} /></Suspense>
        ) : view === 'serviceDetail' ? (
          <Suspense fallback={null}><ServiceDetailPage serviceKey={selectedService} onHome={goHome} onServices={goServices} /></Suspense>
        ) : view === 'insights' ? (
          <Suspense fallback={null}><InsightsPage onHome={goHome} /></Suspense>
         ) : view === 'about' ? (
          <Suspense fallback={null}><AboutPage onHome={goHome} /></Suspense>
        ) : view === 'caseStudies' ? (
          <Suspense fallback={null}><CaseStudiesPage onHome={goHome} /></Suspense>
        ) : null}
      </main>
      </>}
      <Footer refs={refs} />
    </div>
  );
}

export default function App() {
  if (window.location.pathname.startsWith('/admin')) return <AdminDashboard />;
  return <PublicApp />;
}
