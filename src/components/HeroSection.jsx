import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80';

export default function HeroSection({ sectionRef, refs }) {
  return (
    <section ref={sectionRef} className="relative overflow-hidden flex items-center" style={{ minHeight: '100vh' }}>
      {/* Background Image with subtle scale animation */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGE}
          alt="Modern office space"
          className="w-full h-full object-cover"
          style={{ objectPosition: '60% center' }}
          draggable={false}
        />
      </motion.div>

      {/* Multi-layer gradient overlay — left-biased, like the original */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(6,17,83,0.88) 0%, rgba(6,17,83,0.68) 30%, rgba(30,27,75,0.35) 58%, rgba(30,27,75,0.10) 82%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 120% at 0% 50%, rgba(16,83,243,0.40) 0%, transparent 60%), radial-gradient(50% 90% at 100% 30%, rgba(0,125,193,0.28) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(6,17,83,0.75) 0%, transparent 38%)',
        }}
      />

      {/* Main content — left aligned */}
      <div
        className="relative z-10 w-full px-6 lg:px-0"
        style={{ paddingLeft: 'clamp(1.5rem, 8%, 9rem)', paddingTop: 'clamp(7.5rem, 14vh, 9rem)', paddingBottom: '6rem' }}
      >
        <div style={{ maxWidth: '580px' }}>
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-xs font-medium tracking-wide">
                Innovative Solutions
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
             EdriSync
            <br />
            <AnimatedText className="font-medium" />
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white mt-6 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: '480px' }}
          >
            We operate at the intersection of business strategy and technology, helping organizations transition into efficient, secure, and fully digital work environments.
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
                style={{ backgroundColor: '#B1B6CE' }}
                aria-hidden="true"
              />
              <button
                onClick={() => refs?.goSection?.(refs?.about)}
                className="relative flex items-center gap-2 bg-white rounded-xl px-8 py-4 font-semibold text-sm transition-all duration-200 min-h-[52px] shadow-xl hover:shadow-2xl cursor-pointer"
                style={{ color: '#061153', backgroundColor: '#B1B6CE' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9ca3b8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B1B6CE')}
              >
                Discover More
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </button>
            </div>
            <button
              onClick={() => refs?.goSection?.(refs?.cta)}
              className="flex items-center gap-2 text-white rounded-xl px-8 py-4 font-medium text-sm transition-all duration-200 min-h-[52px] cursor-pointer"
              style={{ border: '1.5px solid #B1B6CE' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(177, 182, 206, 0.2)';
                e.currentTarget.style.borderColor = '#B1B6CE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#B1B6CE';
              }}
            >
              Contact sales
            </button>
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
                'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
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
