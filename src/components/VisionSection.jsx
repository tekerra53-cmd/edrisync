import { motion } from 'framer-motion';
import { Shield, Settings, Target } from 'lucide-react';

const items = [
  {
    icon: Shield,
    title: 'Our Vision',
    desc: 'To be the trusted advisory partner that helps organizations build secure, compliant, and digitally enabled businesses through integrated technology strategy and execution.',
    accent: 'linear-gradient(135deg, #000741 0%, #2857b8 100%)',
    glow: '#2857b8',
  },
  {
    icon: Settings,
    title: 'Our Approach',
    desc: 'We start with your business problem, then connect cybersecurity, GRC, Microsoft, and transformation into one integrated roadmap, from strategy through implementation and continuous improvement.',
    accent: 'linear-gradient(135deg, #000741 0%, #2857b8 100%)',
    glow: '#2857b8',
  },
  {
    icon: Target,
    title: 'Our Commitment',
    desc: 'We stay focused on outcomes that matter: resilient operations, confident teams, and technology investments that deliver measurable value for your organisation.',
    accent: 'linear-gradient(135deg, #000741 0%, #2857b8 100%)',
    glow: '#2857b8',
  },
];

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f5f9] py-20 sm:py-24 lg:py-28">
      <div
        className="relative w-full"
        style={{
          paddingLeft: 'clamp(1.5rem, 8%, 9rem)',
          paddingRight: 'clamp(1.5rem, 5%, 5rem)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.28em] font-medium" style={{ color: '#087fd1' }}>
            Our Vision &amp; Approach
          </p>
          <h2 className="mt-4 text-4xl font-light leading-tight lg:text-[2.75rem]" style={{ color: '#000741', fontFamily: 'var(--font-family-heading)' }}>
            Driving sustainable digital
            <br />
            <span className="font-medium">evolution across industries</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" style={{ background: item.glow }} />

                <div
                  className="relative h-full cursor-default overflow-hidden rounded-[28px] bg-[#ffffff] p-8 sm:p-10 lg:p-12"
                  style={{ boxShadow: '0 14px 40px rgba(19,35,82,0.08)', border: '1px solid rgba(19,35,82,0.04)' }}
                >
                  <div className="relative z-10 flex h-full flex-col items-start">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ background: item.accent, boxShadow: '0 10px 24px rgba(15, 40, 139, 0.18)' }}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </motion.div>

                    <h3 className="mb-4 text-2xl font-bold" style={{ color: '#000741' }}>
                      {item.title}
                    </h3>
                    <p className="max-w-none text-[15px] leading-7 [text-align:justify] [text-align-last:left]" style={{ color: '#414b60' }}>
                      {item.desc}
                    </p>

                    <div className="mt-8 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-24"
                      style={{ backgroundColor: item.glow }}
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
