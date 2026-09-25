import { motion } from 'framer-motion';
import { Shield, Settings } from 'lucide-react';

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
];

export default function VisionSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: '#f4f5f9' }}>
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.28em] font-medium" style={{ color: '#087fd1' }}>
            Our Vision &amp; Approach
          </p>
          <h2 className="text-4xl lg:text-[2.75rem] font-light mt-4" style={{ color: '#000741', fontFamily: 'var(--font-family-heading)' }}>
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
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" style={{ background: item.glow }} />

                <div
                  className="relative bg-[#ffffff] rounded-[28px] p-7 sm:p-10 h-full text-center cursor-default overflow-hidden"
                  style={{ boxShadow: '0 14px 40px rgba(19,35,82,0.08)', border: '1px solid rgba(19,35,82,0.04)' }}
                >
                  <div className="relative z-10">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7"
                      style={{ background: item.accent, boxShadow: '0 10px 24px rgba(15, 40, 139, 0.18)' }}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#000741' }}>
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed mx-auto max-w-[34ch]" style={{ color: '#414b60' }}>
                      {item.desc}
                    </p>

                    <div className="mx-auto mt-6 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-24"
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
