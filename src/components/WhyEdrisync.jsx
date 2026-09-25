import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Award, DollarSign, ShieldCheck, TrendingUp, Users, CheckCircle } from 'lucide-react';

const IMAGE_URL = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80';

const features = [
  {
    icon: ShieldCheck,
    title: 'Integrated Advisory',
    desc: 'Cybersecurity, GRC, Microsoft, and Digital Transformation, delivered as one coordinated engagement, not disconnected projects.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Outcomes',
    desc: 'We tie every recommendation to business metrics: reduced risk, compliant operations, and digital efficiency you can track.',
  },
  {
    icon: Users,
    title: 'Embedded Partnership',
    desc: 'We become an extension of your team, working alongside your stakeholders from strategy through implementation and continuous improvement.',
  },
];

export default function WhyEdrisync({ sectionRef, refs }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const badgeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={sectionRef} className="relative bg-white py-28 px-6 overflow-hidden">
      {/* Soft accent blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(40% 40% at 90% 10%, rgba(49,93,209,0.07) 0, transparent 70%), radial-gradient(40% 40% at 0% 90%, rgba(95,153,255,0.05) 0, transparent 70%)',
        }}
      />

      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left: image with parallax */}
        <motion.div
          initial={{ opacity: 0, x: -28, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-3xl overflow-hidden h-[420px] lg:h-[540px] order-2 lg:order-1"
          style={{ boxShadow: '0 30px 70px rgba(10,22,40,0.16)' }}
        >
          <motion.img
            src={IMAGE_URL}
            alt="EdriSync team collaborating"
            style={{ y: imageY }}
            className="w-full h-[116%] object-cover object-center absolute inset-0"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, transparent 55%, rgba(4,7,32,0.35) 100%)',
            }}
          />

          {/* Floating badge */}
          <motion.div
            style={{ scale: badgeScale, border: '1px solid rgba(0,0,0,0.06)' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-2xl px-5 py-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(140deg, #000741, #2857b8)' }}
              >
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">System uptime</p>
                <p className="text-xl font-bold" style={{ color: '#000741' }}>99.97%</p>
              </div>
              <div className="ml-2 flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs text-green-600 font-semibold">Live</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-[2px] w-10 rounded-full origin-left"
              style={{ background: 'linear-gradient(90deg, #000741, #2857b8)' }}
            />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#087fd1' }}>
              Why EdriSync
            </p>
          </div>

          <h2 className="text-4xl lg:text-[2.7rem] font-light mt-5 leading-[1.12]" style={{ color: '#000741' }}>
            Cybersecurity, compliance, and digital
            <span
              style={{
                backgroundImage: 'linear-gradient(100deg, #315db9, #90a0c9)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              transformation, unified.
            </span>
          </h2>

          <p className="text-gray-600 text-base mt-5 leading-relaxed max-w-md">
            We embed ourselves in your business, learn your goals, and build systems that last.
            Our clients average a 3-year relationship, because results speak louder than contracts.
          </p>

          <div className="mt-9 space-y-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ y: -5 }}
                  className="group relative flex gap-5 overflow-hidden rounded-2xl p-5 transition-all duration-300 cursor-default"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(18,39,92,0.09)',
                    boxShadow: '0 6px 20px rgba(18,39,92,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(120deg, #ffffff 0%, #f0f5ff 100%)';
                    e.currentTarget.style.boxShadow = '0 18px 38px rgba(18,39,92,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(40,87,184,0.24)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(18,39,92,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(18,39,92,0.09)';
                  }}
                >
                  <span
                    className="absolute bottom-5 left-0 top-5 w-1 origin-bottom scale-y-0 rounded-r-full transition-transform duration-300 ease-out group-hover:scale-y-100"
                    style={{ background: 'linear-gradient(180deg, #2857b8, #79a7ff)' }}
                  />
                  <div
                    className="relative z-10 mt-0.5 flex w-11 shrink-0 items-center justify-center rounded-xl border border-[#2857b8]/10 bg-[#edf3ff] text-[#2857b8] transition-all duration-300 group-hover:scale-105 group-hover:border-[#2857b8]/20 group-hover:bg-[#000741] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#2857b8]/20"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-base font-semibold text-[#000741] transition-colors duration-300 group-hover:text-[#000741]">
                      {feature.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-[#42536f]">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
