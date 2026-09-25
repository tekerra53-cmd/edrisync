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
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '100vh', paddingTop: '84px' }}
    >
      {/* Palette-led background: no third-party photo is needed for contrast. */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 83% 24%, rgba(79, 166, 255, 0.42), transparent 25%), radial-gradient(circle at 72% 80%, rgba(40, 87, 184, 0.5), transparent 38%), linear-gradient(118deg, #000741 0%, #000741 45%, #2857B8 155%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(rgba(79, 166, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 166, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(90deg, transparent, black 45%, transparent)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 7, 65, 0.28), transparent 72%), linear-gradient(to top, rgba(0, 7, 65, 0.46), transparent 52%)',
        }}
      />

      {/* Subtle animated data points reinforce the technology theme. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.span
          className="absolute left-[62%] top-[28%] h-2 w-2 rounded-full bg-[#4FA6FF] shadow-[0_0_18px_5px_rgba(79,166,255,0.7)]"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute left-[78%] top-[54%] h-1.5 w-1.5 rounded-full bg-[#4FA6FF] shadow-[0_0_16px_4px_rgba(79,166,255,0.65)]"
          animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0.95, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute left-[88%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#4FA6FF] shadow-[0_0_16px_4px_rgba(79,166,255,0.65)]"
          animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0.95, 0.4] }}
          transition={{ duration: 2.7, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
        />
      </div>

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

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center gap-5 mt-10"
          >
            <div className="flex -space-x-2.5">
              {[
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
                'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=80&q=80',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                  style={{ border: '2px solid rgba(255,255,255,0.25)' }}
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/55 text-xs">
                Trusted by <strong className="text-white/80 font-medium">500+</strong> businesses
              </p>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
