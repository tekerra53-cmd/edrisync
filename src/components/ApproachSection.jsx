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

export default function ApproachSection() {
  return (
    <section className="relative py-24 lg:py-20 px-6 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
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
            A clear, accountable path from first conversation to long-term partnership, with no guesswork and no surprises.
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
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.55, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 cursor-default overflow-hidden transition-shadow duration-300"
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
