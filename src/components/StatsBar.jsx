import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { CheckCircle2, Award, Smile, Users } from 'lucide-react';

const DEFAULT_STATS = [
  { value: 100, suffix: 'K+', label: 'Successful Projects', icon: CheckCircle2 },
  { value: 270, suffix: '+', label: 'All Awards Winning', icon: Award },
  { value: 96, suffix: '%', label: 'Satisfaction Rates', icon: Smile },
  { value: 3, suffix: 'K+', label: 'Trusted Clients Worldwide', icon: Users },
];

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { count, start } = useCountUp(stat.value ?? 0, 2000);
  const hasTriggered = useRef(false);

  if (inView && !hasTriggered.current) {
    hasTriggered.current = true;
    start();
  }

  const Icon = stat.icon;
  const display = stat.text ? stat.text : Math.floor(count).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col items-center text-center px-5 py-8 rounded-3xl cursor-default transition-shadow duration-300"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 22px 50px rgba(16,83,243,0.35)' }}
      />

      {/* Icon badge */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.15, ease: 'backOut' }}
        className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: 'linear-gradient(140deg, rgba(0,125,193,0.25), rgba(16,83,243,0.18))',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>

      {/* Number */}
      <div className="relative z-10 flex items-baseline justify-center gap-1">
        <span
          className="font-light tracking-tight"
          style={{
            fontSize: 'clamp(2.75rem, 5.5vw, 3.75rem)',
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #9fd3f0 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
          }}
        >
          {display}
        </span>
        {stat.suffix && (
          <span
            className="font-light text-3xl"
            style={{
              backgroundImage: 'linear-gradient(180deg, #7fd0ff 0%, #007dc1 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.3, ease: 'easeOut' }}
        className="relative z-10 h-[2px] w-10 mt-4 rounded-full origin-center"
        style={{ background: 'linear-gradient(90deg, transparent, #7fd0ff, transparent)' }}
      />

      <p
        className="relative z-10 text-xs uppercase tracking-[0.22em] mt-4 font-medium"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsBar({ statsData = DEFAULT_STATS }) {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: '#061153' }}>
      {/* Decorative gradient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 60% at 15% 20%, rgba(0,125,193,0.35) 0, transparent 60%), radial-gradient(55% 55% at 85% 80%, rgba(16,83,243,0.30) 0, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] animate-grid-pan"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs uppercase tracking-[0.35em] font-semibold mb-3"
            style={{ color: '#7fd0ff' }}
          >
            By the numbers
          </p>
          <h2 className="text-3xl lg:text-4xl font-light text-white">
            Trusted results, measured in impact
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {statsData.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
