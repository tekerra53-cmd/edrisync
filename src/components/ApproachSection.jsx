import { motion } from 'framer-motion';
import { Lightbulb, Users, BarChart, Shield } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Consult & Understand',
    desc: 'We deeply analyze your business needs, goals, and constraints to build a clear, accurate roadmap for effective solutions.',
    tag: 'Discover',
    accent: ['#000741', '#2857b8'],
  },
  {
    icon: Users,
    title: 'Plan & Strategize',
    desc: 'We create a structured strategy with focused, prioritized actions that ensure strong and sustainable project outcomes.',
    tag: 'Design',
    accent: ['#000741', '#2857b8'],
  },
  {
    icon: BarChart,
    title: 'Implement & Execute',
    desc: 'We apply the planned solutions with precision, ensuring smooth execution, on-time delivery, and high-quality results.',
    tag: 'Build',
    accent: ['#000741', '#2857b8'],
  },
  {
    icon: Shield,
    title: 'Support & Optimize',
    desc: 'We continuously monitor and refine your systems to improve performance and maintain long-term, reliable growth.',
    tag: 'Grow',
    accent: ['#000741', '#2857b8'],
  },
];

export default function ApproachSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f7fb] py-20 sm:py-24 lg:py-28">
      {/* Decorative accents */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42,104,204,0.08), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42,104,204,0.06), transparent 70%)' }}
      />

      <div
        className="relative w-full"
        style={{
          paddingLeft: 'clamp(1.5rem, 8%, 9rem)',
          paddingRight: 'clamp(1.5rem, 5%, 5rem)',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#087fd1' }}>
            Our Process
          </p>
          <h2 className="mt-4 text-4xl font-light leading-tight lg:text-[2.75rem]" style={{ color: '#000741', fontFamily: 'var(--font-family-heading)' }}>
            How we deliver exceptional
            <br />
            <span className="font-medium">results for our clients</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 [text-align:justify] [text-align-last:left]" style={{ color: '#707c92' }}>
            A clear, accountable path from first conversation to long-term partnership, with no guesswork and no surprises.
          </p>
        </motion.div>

        {/* Process grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
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
                className="group relative cursor-default overflow-hidden rounded-2xl bg-white p-7 transition-shadow duration-300"
                style={{ border: '1px solid rgba(18, 39, 92, 0.05)', boxShadow: '0 8px 30px rgba(18, 39, 92, 0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 22px 50px rgba(18, 39, 92, 0.14)';
                  e.currentTarget.style.borderColor = 'rgba(20, 87, 234, 0.20)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(18, 39, 92, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(18, 39, 92, 0.05)';
                }}
              >
                {/* Accent top bar that grows on hover */}
                <div
                  className="absolute top-0 left-0 h-1 w-12 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${item.accent[0]}, ${item.accent[1]})` }}
                />

                <div className="flex h-full flex-col items-start gap-7">
                  <div
                    className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${item.accent[0]}, ${item.accent[1]})`, boxShadow: '0 8px 20px rgba(20, 55, 154, 0.18)' }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="w-full">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: '#087fd1' }}>
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 mt-1" style={{ color: '#000741' }}>
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-7 [text-align:justify] [text-align-last:left]" style={{ color: '#526076' }}>{item.desc}</p>
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
