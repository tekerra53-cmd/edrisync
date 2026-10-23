import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const ABOUT_IMAGE = 'https://edrisync.com/myapp/wp-content/uploads/2026/05/edrisync-hm1-img01.png';

export default function AboutSection({ sectionRef, onAbout }) {
  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24 lg:py-28" style={{ background: 'linear-gradient(135deg, #f7f9fd 0%, #ffffff 48%, #f3f7ff 100%)' }}>
      {/* Decorative accents */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(21,87,234,0.12), transparent 70%)' }}
      />

      <div
        className="relative grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20"
        style={{
          paddingLeft: 'clamp(1.5rem, 8%, 9rem)',
          paddingRight: 'clamp(1.5rem, 5%, 5rem)',
        }}
      >
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
            style={{ background: 'linear-gradient(135deg, #24a4dd, #273de7)', opacity: 0.18 }}
          />

          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 24px 60px rgba(4,7,32,0.16)' }}>
            <img
              src={ABOUT_IMAGE}
              alt="The EdriSync team"
              className="h-[340px] w-full object-cover lg:h-[500px]"
              draggable={false}
            />
            {/* Gradient overlay at the bottom for depth */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(10,26,104,0.38))' }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute -bottom-7 left-6 sm:left-8 bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl"
            style={{ border: '1px solid rgba(18,39,92,0.06)', boxShadow: '0 18px 42px rgba(18,39,92,0.18)' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #000741 0%, #2857b8 100%)' }}
            >
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#000741' }}>Trusted & certified</p>
              <p className="text-xs" style={{ color: '#68758c' }}>Partnering with teams worldwide</p>
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
           <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#087fd1' }}>
            About EDRISYNC
          </p>
          <div className="w-12 h-1 rounded-full mt-3" style={{ background: 'linear-gradient(90deg, #6730ef, #0b82dc)' }} />
          <h2 className="mt-5 text-3xl font-light leading-[1.2] sm:text-4xl lg:text-[2.6rem]" style={{ color: '#000741', fontFamily: 'var(--font-family-heading)' }}>
            Cybersecurity, compliance, and digital
            <span className="font-medium"> transformation</span>
            <span className="block">is a business outcome,</span>
            <span className="font-medium"> not an IT project.</span>
          </h2>

          <p className="mt-5 text-[15px] leading-7 [text-align:justify] [text-align-last:left] sm:text-base" style={{ color: '#526076' }}>
            At EDRISYNC, we bridge the gap between business needs and technology execution. We help organizations navigate cybersecurity risk, compliance obligations, and digital transformation as one interconnected challenge, from strategy through implementation and continuous improvement.
          </p>

          <p className="mt-4 text-[15px] leading-7 [text-align:justify] [text-align-last:left] sm:text-base" style={{ color: '#526076' }}>
            We operate as an extension of your team, starting with your business problem, then connecting cybersecurity, governance, Microsoft enablement, and digital transformation into one coordinated roadmap.
          </p>

          {/* CTA */}
          <div className="relative inline-block mt-9">
            <span
              className="absolute inset-0 rounded-xl animate-cta-pulse"
              style={{ backgroundColor: '#B1B6CE' }}
              aria-hidden="true"
            />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onAbout?.();
              }}
              className="relative flex min-h-[52px] items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold shadow-xl transition-all duration-200 hover:shadow-2xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#000741]"
              style={{ color: '#000741', backgroundColor: '#B1B6CE' }}
            >
              Learn more about us
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
