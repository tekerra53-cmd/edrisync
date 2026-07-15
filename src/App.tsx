import { lazy, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnnouncementBar from './components/AnnouncementBar';
import Preloader from './components/Preloader';
import PillNavbar from './components/PillNavbar';
import HeroSection from './components/HeroSection';
import ClientLogos from './components/ClientLogos';
import ServicesSection from './components/ServicesSection';
import WhyEdrisync from './components/WhyEdrisync';
import Testimonials from './components/Testimonials';
import StatsBar from './components/StatsBar';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import VisionSection from './components/VisionSection';
import ApproachSection from './components/ApproachSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
const BlogPage = lazy(() => import('./components/BlogPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));

export default function App() {
  const [view, setView] = useState<'home' | 'blog' | 'about'>('home');
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

  // Scroll to a home section. If we're on the blog view, switch back to
  // home first, then scroll once the home sections have mounted.
  const goSection = (ref?: any) => {
    if (view === 'home') {
      scrollToRef(ref);
    } else {
      pendingScroll.current = ref;
      setView('home');
    }
  };

  const goBlog = () => setView('blog');

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
    why: whyRef,
    testimonials: testimonialsRef,
    cta: ctaRef,
    portfolio: portfolioRef,
    goHome,
    goSection,
    goBlog,
    goAbout,
    view,
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Initial loading screen */}
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      {/* Fixed top UI */}
      <AnnouncementBar />
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
            <ServicesSection sectionRef={servicesRef} />
            <PortfolioSection sectionRef={portfolioRef} />
            <WhyEdrisync sectionRef={whyRef} />
            <StatsBar />
            <Testimonials sectionRef={testimonialsRef} />
            <CTASection sectionRef={ctaRef} />
          </>
        ) : view === 'blog' ? (
          <Suspense fallback={null}><BlogPage onHome={goHome} /></Suspense>
        ) : (
          <Suspense fallback={null}><AboutPage onHome={goHome} /></Suspense>
        )}
      </main>

      <Footer />
    </div>
  );
}
