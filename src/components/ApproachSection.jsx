import { motion } from 'framer-motion';
import { Lightbulb, Users, BarChart, Shield } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Consult & Understand',
    desc: 'We deeply analyze your business needs, goals, and constraints to build a clear, accurate roadmap for effective solutions.',
    tag: 'Discover',
    accent: ['#1053F3', '#007dc1'],
  },
  {
    icon: Users,
    title: 'Plan & Strategize',
    desc: 'We create a structured strategy with focused, prioritized actions that ensure strong and sustainable project outcomes.',
    tag: 'Design',
    accent: ['#6b2cf5', '#1053F3'],
  },
  {
    icon: BarChart,
    title: 'Implement & Execute',
    desc: 'We apply the planned solutions with precision, ensuring smooth execution, on-time delivery, and high-quality results.',
    tag: 'Build',
    accent: ['#007dc1', '#1053F3'],
  },
  {
    icon: Shield,
    title: 'Support & Optimize',
    desc: 'We continuously monitor and refine your systems to improve performance and maintain long-term, reliable growth.',
    tag: 'Grow',
    accent: ['#061153', '#1053F3'],
  },
];

function AbstractLines({ color, rotate = 0, opacity = 0.14 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      aria-hidden="true"
    >
      <path d="M-40 40 C 60 -10, 140 110, 240 30 S 430 80, 470 10" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 95 C 70 40, 150 170, 250 85 S 430 140, 470 60" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 150 C 90 90, 170 230, 280 140 S 440 200, 480 110" fill="none" stroke={color} strokeWidth="1" />
      <path d="M-40 205 C 80 150, 160 280, 270 195 S 430 255, 470 175" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 260 C 90 210, 170 320, 280 245 S 440 300, 480 220" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 300 C 80 260, 160 360, 270 290 S 430 340, 470 270" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="360" cy="280" r="48" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="120" cy="190" r="22" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="300" cy="80" r="14" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="210" cy="160" r="2" fill={color} />
      <circle cx="90" cy="250" r="2" fill={color} />
      <circle cx="330" cy="160" r="2" fill={color} />
    </svg>
  );
}

export default function ApproachSection() {
  return (
    <section className="relative py-24 lg:py-20 px-6 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Abstract line background (same design as the vision cards) */}
      <div className="absolute inset-0 pointer-events-none">
        <AbstractLines color="#1053F3" rotate={0} opacity={0.06} />
        <AbstractLines color="#6b2cf5" rotate={180} opacity={0.05} />
      </div>

      {/* Decorative accents */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,125,193,0.10), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,83,243,0.08), transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>
            Our Process
          </p>
          <h2 className="text-4xl lg:text-[2.75rem] font-light mt-4 leading-tight" style={{ color: '#061153', fontFamily: 'var(--font-family-heading)' }}>
            How we deliver exceptional
            <br />
            <span className="font-medium">results for our clients</span>
          </h2>
          <p className="text-gray-500 mt-5 text-base max-w-md mx-auto leading-relaxed">
            A clear, accountable path from first conversation to long-term partnership — no guesswork, no surprises.
          </p>
        </motion.div>

        {/* Process grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 max-w-4xl mx-auto">
          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl p-7 cursor-default overflow-hidden transition-shadow duration-300"
                style={{ border: '1px solid rgba(6,17,83,0.07)', boxShadow: '0 8px 30px rgba(6,17,83,0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 22px 50px rgba(6,17,83,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(0,125,193,0.30)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,17,83,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(6,17,83,0.07)';
                }}
              >
                {/* Accent top bar that grows on hover */}
                <div
                  className="absolute top-0 left-0 h-1 w-12 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${item.accent[0]}, ${item.accent[1]})` }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${item.accent[0]}, ${item.accent[1]})`, boxShadow: '0 8px 20px rgba(6,17,83,0.18)' }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: '#007dc1' }}>
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 mt-1" style={{ color: '#061153' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">{item.desc}</p>
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
