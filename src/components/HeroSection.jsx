import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { defaultHeroSettings, getHeroSettings } from '../services/siteContent';

export default function HeroSection({ sectionRef, refs }) {
  const [settings, setSettings] = useState(defaultHeroSettings);

  useEffect(() => {
    getHeroSettings().then(setSettings);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative isolate overflow-hidden flex items-center"
      style={{ minHeight: '100vh', paddingTop: '84px' }}
    >
      {/* The scene is built from separate layers so its content stays responsive and editable. */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 78% 32%, rgba(79, 166, 255, 0.16), transparent 28%), radial-gradient(circle at 74% 78%, rgba(40, 87, 184, 0.18), transparent 38%), linear-gradient(118deg, #000741 0%, #000741 50%, #10265f 140%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 7, 65, 0.24), transparent 72%), linear-gradient(to top, rgba(0, 7, 65, 0.42), transparent 42%)',
        }}
      />

      {/* Main content, left aligned */}
      <div
        className="relative z-10 w-full px-6 lg:px-0"
        style={{ paddingLeft: 'clamp(1.5rem, 8%, 9rem)', paddingTop: 'clamp(7.5rem, 14vh, 9rem)', paddingBottom: '6rem' }}
      >
        <div style={{ maxWidth: 'min(680px, 100%)' }}>
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-white text-xs font-medium tracking-wide">
                {settings.eyebrow}
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white font-light leading-[1.06] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.25rem)', fontFamily: 'var(--font-family-heading)' }}
          >
             {settings.title}
            <br />
            <AnimatedText className="font-medium" />
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white mt-6 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: '650px' }}
          >
            {settings.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <div className="relative inline-block">
              <span
                className="absolute inset-0 rounded-xl animate-cta-pulse"
                style={{ backgroundColor: '#087FD1' }}
                aria-hidden="true"
              />
              <button
                 onClick={() => refs?.goSection?.(refs?.cta)}
                className="relative flex items-center gap-2 bg-white rounded-xl px-8 py-4 font-semibold text-sm transition-all duration-200 min-h-[52px] shadow-xl hover:shadow-2xl cursor-pointer"
                style={{ color: '#FFFFFF', backgroundColor: '#087FD1' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2857B8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#087FD1')}
              >
                Request a Consultation
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
