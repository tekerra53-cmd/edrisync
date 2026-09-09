import { motion } from 'framer-motion';
import { ArrowRight, Cloud, Database, Network, ShieldCheck, Workflow } from 'lucide-react';
import AnimatedText from './AnimatedText';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=85';

const serviceModules = [
  { label: 'Cybersecurity', icon: ShieldCheck, position: 'left-[1%] top-[21%]', delay: 0 },
  { label: 'GRC', icon: Workflow, position: 'right-[1%] top-[25%]', delay: 0.35 },
  { label: 'Microsoft', icon: Cloud, position: 'left-[2%] bottom-[22%]', delay: 0.7 },
  { label: 'Digital Transformation', icon: Network, position: 'right-[0%] bottom-[18%]', delay: 1.05 },
];

export default function HeroSection({ sectionRef, refs }) {
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '100vh', paddingTop: '84px' }}
    >
      {/* Background Image with subtle scale animation */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'linear' }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGE}
          alt="Enterprise data center infrastructure"
          className="w-full h-full object-cover"
          style={{ objectPosition: '60% center', opacity: 0.28 }}
          draggable={false}
        />
      </motion.div>

      {/* Multi-layer gradient overlay, left-biased like the original */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(6,17,83,0.98) 0%, rgba(6,17,83,0.94) 30%, rgba(6,17,83,0.86) 58%, rgba(6,17,83,0.78) 82%, rgba(6,17,83,0.70) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 120% at 0% 50%, rgba(16,83,243,0.32) 0%, transparent 60%), radial-gradient(50% 90% at 100% 30%, rgba(0,125,193,0.20) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(6,17,83,0.96) 0%, rgba(6,17,83,0.62) 34%, rgba(6,17,83,0.18) 70%)',
        }}
      />

      {/* Subtle animated data points reinforce the technology theme. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.span
          className="absolute left-[62%] top-[28%] h-2 w-2 rounded-full bg-[#8bd3ff] shadow-[0_0_18px_5px_rgba(100,190,255,0.7)]"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute left-[78%] top-[54%] h-1.5 w-1.5 rounded-full bg-[#8bd3ff] shadow-[0_0_16px_4px_rgba(100,190,255,0.65)]"
          animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0.95, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute left-[88%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#8bd3ff] shadow-[0_0_16px_4px_rgba(100,190,255,0.65)]"
          animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0.95, 0.4] }}
          transition={{ duration: 2.7, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
        />
      </div>

      {/* Custom Edrisync technology system for the right side of the hero. */}
      <div className="pointer-events-none absolute right-[7%] top-[18%] z-[5] hidden h-[min(64vh,580px)] w-[44vw] max-w-[620px] lg:block" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[48%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3f9dff]/20 blur-3xl"
          animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[64%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-[#6dbdff]/40 bg-[#102d72]/80 p-3 shadow-[0_0_70px_rgba(63,157,255,0.24)] backdrop-blur-sm"
          animate={{ y: ['-50%', '-51.5%', '-50%'], boxShadow: ['0 0 60px rgba(63,157,255,0.18)', '0 0 90px rgba(63,157,255,0.34)', '0 0 60px rgba(63,157,255,0.18)'] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateY(-7deg) rotateX(3deg)' }}
        >
          <div className="flex h-full flex-col rounded-[24px] border border-white/10 bg-[#07184d]/85 p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#8bd3ff]" />
                <span className="text-[10px] font-semibold tracking-[0.18em] text-white/80">EDRISYNC CORE</span>
              </div>
              <span className="flex items-center gap-1.5 text-[8px] font-medium tracking-[0.12em] text-[#72e5b2]"><span className="h-2 w-2 rounded-full bg-[#72e5b2] shadow-[0_0_12px_3px_rgba(114,229,178,0.6)]" />LIVE</span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 py-4">
              <div className="relative mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full border border-[#8bd3ff]/40 bg-[#123477] shadow-[0_0_35px_rgba(63,157,255,0.35)]">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#8bd3ff]/45" />
                <Database className="relative h-7 w-7 text-[#8bd3ff]" strokeWidth={1.4} />
              </div>
              <span className="text-center text-[9px] font-medium tracking-[0.2em] text-white/45">CONNECTED INTELLIGENCE</span>
              {[78, 56, 88, 66].map((width, index) => (
                <div key={index} className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#3f9dff] to-[#8bd3ff]"
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1.2, delay: index * 0.12, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1.8 }}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
              <div><strong className="block text-sm text-white">99.9%</strong><span className="text-[8px] text-white/45">UPTIME</span></div>
              <div><strong className="block text-sm text-white">24/7</strong><span className="text-[8px] text-white/45">MONITORING</span></div>
              <div><strong className="block text-sm text-white">SECURE</strong><span className="text-[8px] text-white/45">BY DESIGN</span></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 h-[72%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#62b7ff]/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[88%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#62b7ff]/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        />

        {serviceModules.map(({ label, icon: Icon, position }) => (
          <div
            key={label}
            className={`absolute ${position} flex items-center gap-2 rounded-full border border-white/15 bg-[#123477]/85 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md`}
          >
            <Icon className="h-4 w-4 shrink-0 text-[#8bd3ff]" strokeWidth={1.8} />
            <span className="whitespace-nowrap text-[10px] font-medium text-white/85">{label}</span>
          </div>
        ))}
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
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: '650px' }}
          >
            We are a Cybersecurity, GRC, Microsoft Enablement, and Digital Transformation advisory and implementation firm, helping organizations position technology as a strategic business enabler rather than a point-solution vendor.
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
                 onClick={() => refs?.goSection?.(refs?.cta)}
                className="relative flex items-center gap-2 bg-white rounded-xl px-8 py-4 font-semibold text-sm transition-all duration-200 min-h-[52px] shadow-xl hover:shadow-2xl cursor-pointer"
                style={{ color: '#061153', backgroundColor: '#B1B6CE' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9ca3b8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B1B6CE')}
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
