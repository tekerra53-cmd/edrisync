import { motion } from 'framer-motion';
import { Target, Route } from 'lucide-react';

const items = [
  {
    icon: Target,
    title: 'Our Vision',
    desc: 'To be a trusted technology partner driving sustainable digital evolution across businesses and industries.',
    accent: ['#061153', '#1053F3'],
    glow: 'linear-gradient(135deg, #1053F3, #007dc1)',
    line: '#1053F3',
  },
  {
    icon: Route,
    title: 'Our Approach',
    desc: 'We believe technology should simplify operations, not complicate them, thus supporting long-term scalability.',
    accent: ['#6b2cf5', '#007dc1'],
    glow: 'linear-gradient(135deg, #6b2cf5, #1053F3)',
    line: '#6b2cf5',
  },
];

function AbstractLines({ color, rotate = 0 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: `rotate(${rotate}deg)`, opacity: 0.42 }}
      aria-hidden="true"
    >
      <path d="M-40 70 C 70 10, 150 150, 250 60 S 430 120, 470 30" fill="none" stroke={color} strokeWidth="3" />
      <path d="M-40 150 C 90 90, 170 230, 280 140 S 440 200, 480 110" fill="none" stroke={color} strokeWidth="3" />
      <path d="M-40 240 C 80 190, 160 300, 270 220 S 430 280, 470 200" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="360" cy="280" r="48" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="210" cy="160" r="3" fill={color} />
    </svg>
  );
}

export default function VisionSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(177,182,206,0.45), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,125,193,0.14), transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.28em] font-medium" style={{ color: '#B1B6CE' }}>
            Our Vision & Approach
          </p>
          <h2 className="text-4xl lg:text-[2.75rem] font-light mt-4" style={{ color: '#061153', fontFamily: 'var(--font-family-heading)' }}>
            Driving sustainable digital
            <br />
            <span className="font-medium">evolution across industries</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Animated gradient glow border */}
                <div
                  className="absolute -inset-0.5 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                  style={{ background: item.glow }}
                />
                {/* Shimmer sweep */}
                <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
                  <div
                    className="absolute -translate-x-full group-hover:translate-x-[250%] transition-transform duration-[1100ms] ease-out top-0 bottom-0 w-1/3"
                    style={{ background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)', transform: 'skewX(-12deg)' }}
                  />
                </div>

                <div
                  className="relative bg-white rounded-[28px] p-7 sm:p-10 h-full text-center cursor-default overflow-hidden"
                  style={{ boxShadow: '0 14px 40px rgba(6,17,83,0.08)', border: '1px solid rgba(6,17,83,0.06)' }}
                >
                  {/* Abstract line background (behind content) */}
                  <AbstractLines color={item.line} rotate={i === 1 ? 180 : 0} />
                  {/* Soft white focal glow so text stays readable over the lines */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(120% 85% at 50% 42%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0) 100%)' }}
                  />

                  {/* Content sits above the lines */}
                  <div className="relative z-10">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7"
                      style={{ background: `linear-gradient(135deg, ${item.accent[0]}, ${item.accent[1]})`, boxShadow: '0 10px 24px rgba(6,17,83,0.18)' }}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#061153' }}>
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed mx-auto max-w-[34ch]" style={{ color: '#374151' }}>
                      {item.desc}
                    </p>

                    {/* Animated underline that grows on hover */}
                    <div className="mx-auto mt-6 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-24"
                      style={{ background: item.glow }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
