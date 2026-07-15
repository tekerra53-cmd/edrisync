import { motion } from 'framer-motion';
import { Award, Users, Calendar, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

const ABOUT_IMAGE = 'https://edrisync.com/myapp/wp-content/uploads/2026/05/edrisync-hm1-img01.png';

const stats = [
  { icon: Award, value: '500+', label: 'Projects Delivered' },
  { icon: Users, value: '98%', label: 'Client Retention' },
  { icon: Calendar, value: '15+', label: 'Years Experience' },
  { icon: Globe, value: 'Global', label: 'Client Reach' },
];

export default function AboutSection({ sectionRef, onAbout }) {
  return (
    <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Decorative accents */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,83,243,0.08), transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Accent block behind image */}
          <div
            className="absolute -bottom-6 -left-6 w-36 h-36 rounded-3xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)', opacity: 0.16 }}
          />

          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(6,17,83,0.16)' }}>
            <img
              src={ABOUT_IMAGE}
              alt="The EdriSync team"
              className="w-full h-[340px] lg:h-[440px] object-cover"
              draggable={false}
            />
            {/* Gradient overlay at the bottom for depth */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(6,17,83,0.35))' }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute -bottom-7 left-6 sm:left-8 bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl"
            style={{ border: '1px solid rgba(6,17,83,0.06)' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
            >
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#061153' }}>Trusted & certified</p>
              <p className="text-xs text-gray-500">Partnering with teams worldwide</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content column */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>
            About EdriSync
          </p>
          <div className="w-12 h-1 rounded-full mt-3" style={{ background: 'linear-gradient(90deg, #1053F3, #007dc1)' }} />
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-light mt-5 leading-[1.2] text-balance" style={{ color: '#061153', fontFamily: 'var(--font-family-heading)' }}>
            Digital transformation{' '}
            <span className="font-medium">is no longer optional.</span>
          </h2>

          <p className="text-gray-600 text-[15px] sm:text-base mt-5 leading-relaxed text-pretty">
            At EDRISYNC, we bridge the gap between business needs and technology execution helping organizations adopt the right tools, streamline operations, and build digital environments that scale.
          </p>

          <p className="text-gray-600 text-[15px] sm:text-base mt-4 leading-relaxed text-pretty">
            We operate at the intersection of business strategy and technology, guiding companies through efficient, secure, and fully digital work environments built for long-term growth.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 mt-9">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center sm:text-left">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 mx-auto sm:mx-0"
                    style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold" style={{ color: '#061153' }}>{stat.value}</div>
                  <div className="text-gray-500 text-[11px] mt-1 uppercase tracking-wide leading-snug">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onAbout?.();
            }}
            className="inline-flex items-center gap-2 mt-9 text-sm font-medium hover:gap-3 transition-all duration-200"
            style={{ color: '#007dc1' }}
          >
            Learn more about us
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
