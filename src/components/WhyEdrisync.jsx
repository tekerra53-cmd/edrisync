import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Award, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

const IMAGE_URL = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80';

const features = [
  {
    icon: Activity,
    title: '99.9% Uptime SLA',
    desc: 'Guaranteed reliability backed by proactive infrastructure monitoring and a rapid-response team available around the clock.',
  },
  {
    icon: Award,
    title: 'Certified Experts',
    desc: 'AWS, Azure, Cisco, and CompTIA certified engineers on every engagement — no junior staff on your account.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'No hidden fees. Flat-rate or per-user plans that scale linearly with your team, billed monthly with no lock-in.',
  },
];

export default function WhyEdrisync({ sectionRef }) {
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
            'radial-gradient(40% 40% at 90% 10%, rgba(0,125,193,0.06) 0, transparent 70%), radial-gradient(40% 40% at 0% 90%, rgba(16,83,243,0.05) 0, transparent 70%)',
        }}
      />

      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left — image with parallax */}
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
                'linear-gradient(180deg, transparent 55%, rgba(6,17,83,0.35) 100%)',
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
                style={{ background: 'linear-gradient(140deg, #007dc1, #1053F3)' }}
              >
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">System uptime</p>
                <p className="text-xl font-bold" style={{ color: '#0a1628' }}>99.97%</p>
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

        {/* Right — text */}
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
              style={{ background: 'linear-gradient(90deg, #007dc1, #1053F3)' }}
            />
            <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#007dc1' }}>
              Why EdriSync
            </p>
          </div>

          <h2 className="text-4xl lg:text-[2.7rem] font-light mt-5 leading-[1.12]" style={{ color: '#0a1628' }}>
            Technology partners,
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(100deg, #007dc1, #1053F3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              not just vendors.
            </span>
          </h2>

          <p className="text-gray-600 text-base mt-5 leading-relaxed max-w-md">
            We embed ourselves in your business, learn your goals, and build systems that last.
            Our clients average a 3-year relationship — because results speak louder than contracts.
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
                  whileHover={{ y: -4 }}
                  className="group relative flex gap-5 rounded-2xl p-5 transition-all duration-300 cursor-default"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(10,22,40,0.07)',
                    boxShadow: '0 1px 2px rgba(10,22,40,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(16,83,243,0.14)';
                    e.currentTarget.style.borderColor = 'rgba(16,83,243,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(10,22,40,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(10,22,40,0.07)';
                  }}
                >
                  {/* Animated top accent on hover */}
                  <span
                    className="absolute top-0 left-5 right-5 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ background: 'linear-gradient(90deg, #007dc1, #1053F3)' }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 group-hover:text-white"
                    style={{ background: 'rgba(0,125,193,0.10)', color: '#007dc1' }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base" style={{ color: '#0a1628' }}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="group inline-flex items-center gap-2 mt-9 text-sm font-semibold hover:gap-3 transition-all duration-200"
            style={{ color: '#007dc1' }}
          >
            Meet our team
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ background: 'rgba(0,125,193,0.12)' }}
            >
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
