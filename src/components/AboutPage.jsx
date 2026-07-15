import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye, Heart, Zap, ShieldCheck, Lightbulb, Handshake, Cloud, Lock, Workflow, Cpu, Compass } from 'lucide-react';
import StatsBar from './StatsBar';

const IMG_WORKSPACE = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80';
const IMG_SYSTEM = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
const IMG_TEAM = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80';
const IMG_DESK = 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80';
const IMG_MEETING = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80';

const values = [
  {
    icon: ShieldCheck,
    title: 'Integrity first',
    desc: 'We do right by our clients even when no one is watching. Transparent pricing, honest advice, no lock-in.',
  },
  {
    icon: Lightbulb,
    title: 'Relentless innovation',
    desc: 'We stay ahead of the curve so you don’t have to — bringing modern, proven tools to every engagement.',
  },
  {
    icon: Handshake,
    title: 'True partnership',
    desc: 'We embed in your business and treat your goals as our own. Results over contracts, always.',
  },
  {
    icon: Zap,
    title: 'Speed with care',
    desc: 'We move fast without cutting corners, shipping secure, scalable systems built to last.',
  },
];

const purposes = [
  { icon: Target, title: 'Mission', text: 'Make powerful, secure technology effortless for every business — so clients focus on what they do best while we build the digital foundation.' },
  { icon: Eye, title: 'Vision', text: 'A world where every organization, regardless of size, operates with the security, speed, and clarity of a digital-native leader.' },
  { icon: Heart, title: 'Promise', text: 'One accountable partner instead of a dozen vendors — measured by your outcomes, not our output.' },
];

const capabilities = [
  { icon: Cloud, title: 'Cloud workspaces', desc: 'Migration, management and optimization of cloud-native environments.', span: 'lg:col-span-2' },
  { icon: Lock, title: 'Cybersecurity', desc: 'Hardening, compliance and 24/7 threat monitoring.', span: '' },
  { icon: Workflow, title: 'Automation', desc: 'Business process automation that removes repetitive work and frees your team.', span: '' },
  { icon: Cpu, title: 'Product & UI/UX', desc: 'Interfaces and products designed around real user journeys.', span: 'lg:col-span-2' },
  { icon: Compass, title: 'Strategy', desc: 'Digital roadmap and technology consulting aligned to growth.', span: '' },
  { icon: ShieldCheck, title: 'Managed IT', desc: 'Ongoing support and proactive infrastructure care.', span: '' },
];

const milestones = [
  { year: '2011', title: 'Founded', desc: 'EdriSync launches with a mission to make enterprise-grade technology accessible to every business.' },
  { year: '2016', title: 'Going global', desc: 'First international clients onboarded as demand for secure digital workspaces accelerates.' },
  { year: '2020', title: 'Cloud-first era', desc: 'Helped hundreds of teams transition to fully remote, cloud-native operations.' },
  { year: '2026', title: '500+ projects', desc: 'Crossed 500 delivered projects with a 98% client retention rate worldwide.' },
];

const teamMembers = [
  { name: 'Jobaer Khanom', role: 'UI/UX Designer', bio: 'Designs thoughtful interface systems that link brand identity to engaging user journeys across web and mobile platforms.', image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm1-img01-4.webp' },
  { name: 'Sayma D. Farna', role: 'App Developer', bio: 'Creates purposeful mobile solutions that connect core business goals with clearly defined market audiences.', image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm1-img02-3.webp' },
  { name: 'Jubin E. Nawtail', role: 'SEO Marketer', bio: 'Optimizes strategic online visibility, aligning brands with profitable search audiences and measurable business goals.', image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm1-img03-3.webp' },
  { name: 'Arman H. Siddik', role: 'Cloud Engineer', bio: 'Architects resilient cloud infrastructure and migration paths that keep distributed teams fast, secure, and always available.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80' },
  { name: 'Nusrat T. Rahman', role: 'Cybersecurity Lead', bio: 'Designs defense-in-depth strategies and runs 24/7 monitoring to keep client data protected against evolving threats.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80' },
];

export default function AboutPage({ onHome }) {
  return (
    <div style={{ backgroundColor: '#ffffff' }} className="min-h-screen">
      {/* HERO */}
      <header className="relative pt-28 pb-20 px-6 overflow-hidden" style={{ backgroundColor: '#007dc1' }}>
        {/* Depth gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(70% 80% at 82% 0%, rgba(16,83,243,0.45), transparent 60%), radial-gradient(60% 70% at 0% 100%, rgba(6,17,83,0.55), transparent 60%)' }}
        />

        {/* Animated thin-line abstract — decorative, does not affect layout */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
            {[
              'M-50,80 C300,30 520,170 1250,60',
              'M-50,160 C320,100 540,250 1250,150',
              'M-50,240 C340,180 560,320 1250,230',
              'M-50,320 C360,260 580,400 1250,310',
              'M-50,400 C380,340 520,460 1250,390',
              'M-50,480 C300,420 560,540 1250,470',
              'M-50,560 C340,500 540,600 1250,550',
              'M80,-50 C160,180 120,380 200,650',
              'M360,-50 C440,180 400,380 480,650',
              'M640,-50 C720,180 680,380 760,650',
              'M920,-50 C1000,180 960,380 1040,650',
              'M1140,-50 C1180,180 1160,380 1200,650',
            ].map((d, i) => (
              <path key={`base-${i}`} d={d} stroke="rgba(255,255,255,0.10)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            {[
              'M-50,80 C300,30 520,170 1250,60',
              'M-50,240 C340,180 560,320 1250,230',
              'M-50,400 C380,340 520,460 1250,390',
              'M-50,560 C340,500 540,600 1250,550',
              'M120,-50 C200,200 160,400 240,650',
              'M620,-50 C700,200 660,400 740,650',
              'M1020,-50 C1100,200 1060,400 1140,650',
            ].map((d, i) => (
              <motion.path
                key={`pulse-${i}`}
                d={d}
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="150 1100"
                initial={{ strokeDashoffset: 1250 }}
                animate={{ strokeDashoffset: -150 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: i * 1.1 }}
              />
            ))}
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            About EdriSync
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl lg:text-[3.4rem] font-light leading-[1.08] max-w-4xl mx-auto" style={{ color: '#ffffff' }}
          >
            The partner behind{' '}
            <span style={{ backgroundImage: 'linear-gradient(100deg, #ffffff, #bfe6ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              modern, secure businesses.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            We help organizations transition into efficient, secure, and fully digital work environments — bridging business strategy and technology execution since 2011.
          </motion.p>

          {/* Image collage — workspace, system view, team */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto items-center"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="rounded-2xl overflow-hidden h-48 sm:h-60 order-2 sm:order-1"
              style={{ boxShadow: '0 18px 44px rgba(6,17,83,0.16)' }}
            >
              <img src={IMG_WORKSPACE} alt="Modern technology workspace" className="w-full h-full object-cover" draggable={false} />
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="rounded-3xl overflow-hidden h-60 sm:h-80 order-1 sm:order-2"
              style={{ boxShadow: '0 28px 64px rgba(6,17,83,0.22)' }}
            >
              <img src={IMG_SYSTEM} alt="System and analytics dashboard view" className="w-full h-full object-cover" draggable={false} />
            </motion.div>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="rounded-2xl overflow-hidden h-48 sm:h-60 order-3"
              style={{ boxShadow: '0 18px 44px rgba(6,17,83,0.16)' }}
            >
              <img src={IMG_TEAM} alt="Team collaborating" className="w-full h-full object-cover" draggable={false} />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* STORY — manifesto layout */}
      <section className="py-24 px-6" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>Our story</p>
            <div className="w-12 h-1 rounded-full mt-3 mb-6" style={{ background: 'linear-gradient(90deg, #1053F3, #007dc1)' }} />
            <blockquote className="text-2xl lg:text-[2rem] font-light leading-snug" style={{ color: '#061153' }}>
              “We started EdriSync with a simple belief — every business deserves enterprise-grade technology without the enterprise-grade complexity.”
            </blockquote>
            <p className="text-gray-600 text-[15px] sm:text-base mt-6 leading-relaxed">
              Over the past 15+ years, we’ve helped hundreds of organizations adopt the right tools, streamline operations, and build digital environments that scale. We operate at the intersection of business strategy and technology, guiding companies through efficient, secure, and fully digital work environments built for long-term growth.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="text-3xl font-light" style={{ color: '#061153' }}>15<span className="text-[#007dc1]">+</span></div>
              <p className="text-sm text-gray-500 leading-snug">Years building<br />digital-first teams</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl overflow-hidden" style={{ height: '240px', boxShadow: '0 18px 40px rgba(6,17,83,0.14)' }}>
              <img src={IMG_DESK} alt="Workspace with technology" className="w-full h-full object-cover" draggable={false} />
            </div>
            <div className="rounded-2xl overflow-hidden mt-8" style={{ height: '240px', boxShadow: '0 18px 40px rgba(6,17,83,0.14)' }}>
              <img src={IMG_MEETING} alt="Team in collaboration meeting" className="w-full h-full object-cover" draggable={false} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PURPOSE — 3 column band */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {purposes.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative rounded-2xl p-8 transition-all duration-300"
                style={{ background: '#f8f9fa', border: '1px solid rgba(6,17,83,0.06)' }}
                whileHover={{ y: -6 }}
              >
                <span className="absolute top-0 left-8 right-8 h-[3px] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'linear-gradient(90deg, #1053F3, #007dc1)' }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#061153' }}>{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PROJECT COUNT — identical to homepage StatsBar (same numbers, design + animation) */}
      <StatsBar />

      {/* VALUES — kept identical to previous about values section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>What drives us</p>
            <h2 className="text-3xl lg:text-4xl font-light mt-3" style={{ color: '#061153' }}>Our core values</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl p-7 transition-all duration-300"
                  style={{ background: '#fff', border: '1px solid rgba(6,17,83,0.07)', boxShadow: '0 8px 30px rgba(6,17,83,0.05)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 18px 40px rgba(16,83,243,0.14)'; e.currentTarget.style.borderColor = 'rgba(16,83,243,0.25)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,17,83,0.05)'; e.currentTarget.style.borderColor = 'rgba(6,17,83,0.07)'; }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: '#0a1628' }}>{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAPABILITIES — bento grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>What we do</p>
            <h2 className="text-3xl lg:text-4xl font-light mt-3" style={{ color: '#061153' }}>
              End-to-end technology, <span className="font-medium">delivered.</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              From strategy to support, we cover the full lifecycle of your digital operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-2xl p-7 overflow-hidden transition-all duration-300 ${cap.span}`}
                  style={{ background: '#f8f9fa', border: '1px solid rgba(6,17,83,0.06)' }}
                >
                  <div
                    className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(circle, rgba(16,83,243,0.14), transparent 70%)' }}
                  />
                  <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="relative font-semibold text-lg mb-2" style={{ color: '#061153' }}>{cap.title}</h4>
                  <p className="relative text-gray-600 text-sm leading-relaxed">{cap.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE — horizontal scroll */}
      <section className="py-20 px-6 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>Our journey</p>
            <h2 className="text-3xl lg:text-4xl font-light mt-3" style={{ color: '#061153' }}>Milestones along the way</h2>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: 'thin' }}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="snap-start shrink-0 w-72 rounded-2xl p-7 bg-white"
                style={{ border: '1px solid rgba(6,17,83,0.07)', boxShadow: '0 10px 30px rgba(6,17,83,0.06)' }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(0,125,193,0.12)', color: '#007dc1' }}>{m.year}</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#061153' }}>{m.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#007dc1' }}>Our Team</p>
            <h2 className="text-3xl lg:text-4xl font-light mt-3" style={{ color: '#061153' }}>
              The experts behind <span className="font-medium">your success</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300"
                style={{ border: '1px solid rgba(6,17,83,0.07)', boxShadow: '0 10px 30px rgba(6,17,83,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 22px 50px rgba(16,83,243,0.18)'; e.currentTarget.style.borderColor = 'rgba(16,83,243,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(6,17,83,0.05)'; e.currentTarget.style.borderColor = 'rgba(6,17,83,0.07)'; }}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(6,17,83,0.28))' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold" style={{ color: '#061153' }}>{member.name}</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: '#007dc1' }}>{member.role}</p>
                  <div className="h-[2px] w-9 rounded-full mt-4 mb-4" style={{ background: 'linear-gradient(90deg, #1053F3, #007dc1)' }} />
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <button
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-sm transition-all duration-200 min-h-[52px] shadow-xl hover:shadow-2xl"
              style={{ color: '#061153', backgroundColor: '#B1B6CE' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9ca3b8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B1B6CE')}
            >
              Join Our Team
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ backgroundColor: '#061153' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(55% 55% at 50% 0%, rgba(16,83,243,0.45), transparent 55%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-light text-white">Ready to build with us?</h2>
          <p className="text-white/70 mt-4 leading-relaxed">
            Explore our work or get in touch — we’d love to learn about your goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={onHome}
              className="inline-flex items-center gap-2 text-white rounded-xl px-7 py-3.5 font-semibold text-sm transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
            >
              <ArrowRight className="w-4 h-4" /> See our work
            </button>
            <button
              onClick={onHome}
              className="inline-flex items-center gap-2 text-white rounded-xl px-7 py-3.5 font-medium text-sm transition-all duration-200"
              style={{ border: '1.5px solid rgba(255,255,255,0.4)' }}
            >
              Back to home
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
