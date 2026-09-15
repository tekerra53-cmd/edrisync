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
const AboutPage = lazy(() => import('./components/AboutPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./components/ServiceDetailPage'));
const InsightsPage = lazy(() => import('./components/InsightsPage'));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage'));

export default function App() {
  const [view, setView] = useState<'home' | 'services' | 'serviceDetail' | 'insights' | 'about' | 'caseStudies'>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pendingScroll = useRef<any>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
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
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goAbout = () => {
    setView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goServices = () => {
    setSelectedService(null);
    setView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goServiceDetail = (service?: string) => {
    setSelectedService(service || null);
    setView('serviceDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goInsights = () => {
    setView('insights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goCaseStudies = () => {
    setView('caseStudies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to a home section. If we're on a page view, switch back to
  // home first, then scroll once the home sections have mounted.
  const goSection = (ref?: any) => {
    if (view === 'home') {
      scrollToRef(ref);
    } else {
      pendingScroll.current = ref;
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
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Initial loading screen */}
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <PillNavbar refs={refs} />

      {/* Page sections */}
      <main>
        {view === 'home' ? (
          <>
            <HeroSection sectionRef={homeRef} refs={refs} />
            <ClientLogos />
            <VisionSection />
            <ApproachSection />
            <AboutSection sectionRef={aboutRef} onAbout={goAbout} />
            <ServicesSection sectionRef={servicesRef} onServices={goServices} onServiceDetail={goServiceDetail} />
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

      <Footer refs={refs} />
    </div>
  );
}
