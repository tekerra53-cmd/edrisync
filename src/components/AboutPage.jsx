import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye, Heart, Zap, ShieldCheck, Lightbulb, Handshake, Cloud, Lock, Workflow, Cpu, Compass } from 'lucide-react';

const IMG_WORKSPACE = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80';
const IMG_SYSTEM = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
const IMG_TEAM = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80';
const IMG_DESK = 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80';
const IMG_MEETING = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80';
const INDUSTRY_ICON_GRADIENT = 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)';
const INDUSTRY_ACCENT_LINE = 'linear-gradient(90deg, #10245f 0%, #2857b8 100%)';

const values = [
  {
    icon: ShieldCheck,
    title: 'Integrity first',
    desc: 'We do right by our clients even when no one is watching. Transparent pricing, honest advice, no lock-in.',
  },
  {
    icon: Lightbulb,
    title: 'Relentless innovation',
    desc: 'We stay ahead of the curve so you don’t have to, bringing modern, proven tools to every engagement.',
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
  { icon: Target, title: 'Mission', text: 'Make powerful, secure technology effortless for every business, so clients focus on what they do best while we build the digital foundation.' },
  { icon: Eye, title: 'Vision', text: 'A world where every organization, regardless of size, operates with the security, speed, and clarity of a digital-native leader.' },
  { icon: Heart, title: 'Promise', text: 'One accountable partner instead of a dozen vendors, measured by your outcomes, not our output.' },
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

const featuredMembers = [
  { name: 'Arman H. Siddik', role: 'Cloud Engineer', bio: 'Architects resilient cloud infrastructure and migration paths that keep distributed teams fast, secure, and always available.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', accent: 'linear-gradient(135deg, #B1B6CE, #B1B6CE)' },
  { name: 'Nusrat T. Rahman', role: 'Cybersecurity Lead', bio: 'Designs defense-in-depth strategies and runs 24/7 monitoring to keep client data protected against evolving threats.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80', accent: 'linear-gradient(135deg, #040720, #B1B6CE)' },
];

export default function AboutPage({ onHome }) {
  return (
    <div style={{ backgroundColor: '#f7f9fd' }} className="min-h-screen">
      {/* HERO */}
      <header className="relative overflow-hidden bg-[#040720] px-6 pb-24 pt-32 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(60% 70% at 70% 0%, rgba(177,182,206,0.20), transparent 58%), linear-gradient(105deg, rgba(4,7,32,0.98) 0%, rgba(4,7,32,0.90) 58%, rgba(4,7,32,0.76) 100%)' }} />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087fd1]"
            >
              About EdriSync
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl font-light leading-[1.08] text-white sm:text-5xl lg:text-[4.25rem]"
            >
              Technology that makes progress feel <span className="text-[#B1B6CE]">possible.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mt-7 max-w-lg text-[15px] leading-7 text-slate-300 lg:mx-0"
            >
              We help organizations build secure, efficient, and fully digital work environments by connecting business strategy with practical technology execution.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-sm">
              <img src={IMG_SYSTEM} alt="System and analytics dashboard view" className="h-[22rem] w-full rounded-2xl object-cover sm:h-[30rem]" draggable={false} />
            </div>
            <div className="absolute -bottom-8 -left-5 w-44 overflow-hidden rounded-2xl border-4 border-white/80 bg-white p-1 shadow-[0_16px_35px_rgba(0,0,0,0.28)] sm:-left-10 sm:w-52">
              <img src={IMG_TEAM} alt="Team collaborating" className="h-28 w-full rounded-xl object-cover sm:h-36" draggable={false} />
            </div>
            <div className="absolute right-5 top-5 rounded-xl bg-[#040720] px-4 py-3 text-white shadow-lg">
              <p className="text-xl font-light">2011</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#B1B6CE]">Established</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* STORY: manifesto layout */}
      <section className="relative overflow-hidden bg-[#f7f9fd] px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(55% 45% at 100% 0%, rgba(177,182,206,0.07), transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 lg:pr-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#087fd1' }}>Our story</p>
            <div className="w-12 h-1 rounded-full mt-3 mb-6" style={{ background: INDUSTRY_ACCENT_LINE }} />
            <blockquote className="text-2xl lg:text-[2.35rem] font-light leading-[1.15]" style={{ color: '#040720' }}>
              “We started EdriSync with a simple belief: every business deserves enterprise-grade technology without the enterprise-grade complexity.”
            </blockquote>
            <p className="text-gray-600 text-[15px] sm:text-base mt-6 leading-relaxed">
              Over the past 15+ years, we’ve helped hundreds of organizations adopt the right tools, streamline operations, and build digital environments that scale. We operate at the intersection of business strategy and technology, guiding companies through efficient, secure, and fully digital work environments built for long-term growth.
            </p>
            <div className="flex items-center gap-5 mt-8">
              <div className="text-4xl font-light" style={{ color: '#040720' }}>15<span className="text-[#B1B6CE]">+</span></div>
              <div>
                <p className="text-sm font-medium text-[#040720]">Years building</p>
                <p className="text-sm text-gray-500 leading-snug">digital-first teams</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="rounded-[1.5rem] overflow-hidden" style={{ height: '260px', boxShadow: '0 20px 48px rgba(4,7,32,0.16)' }}>
              <img src={IMG_DESK} alt="Workspace with technology" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" draggable={false} />
            </div>
            <div className="rounded-[1.5rem] overflow-hidden mt-10" style={{ height: '260px', boxShadow: '0 20px 48px rgba(4,7,32,0.16)' }}>
              <img src={IMG_MEETING} alt="Team in collaboration meeting" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" draggable={false} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PURPOSE: 3 column band */}
      <section className="relative overflow-hidden px-6 py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(55% 45% at 50% 0%, rgba(177,182,206,0.1), transparent 55%)' }} />
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-14 max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#087fd1' }}>The EdriSync way</p>
            <h2 className="mt-3 text-3xl lg:text-4xl font-light leading-tight" style={{ color: '#040720' }}>Clear thinking. Practical delivery. Lasting confidence.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {purposes.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative rounded-[1.5rem] bg-white p-8 transition-all duration-300"
                style={{ border: '1px solid rgba(4,7,32,0.07)', boxShadow: '0 12px 30px rgba(4,7,32,0.04)' }}
                whileHover={{ y: -6 }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 22px 48px rgba(177,182,206,0.12)'; e.currentTarget.style.borderColor = 'rgba(177,182,206,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(4,7,32,0.04)'; e.currentTarget.style.borderColor = 'rgba(4,7,32,0.07)'; }}
              >
                <span className="absolute top-0 left-8 right-8 h-[3px] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: INDUSTRY_ACCENT_LINE }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: INDUSTRY_ICON_GRADIENT }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#040720' }}>{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
          </div>
        </div>
      </section>

      {/* VALUES: kept identical to previous about values section */}
      <section className="bg-[#040720] px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#B1B6CE' }}>What drives us</p>
            <h2 className="mt-3 text-3xl font-light text-white lg:text-4xl">Our core values</h2>
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
                  className="group rounded-[1.5rem] bg-white/[0.08] p-7 transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 22px 46px rgba(177,182,206,0.18)'; e.currentTarget.style.borderColor = 'rgba(177,182,206,0.46)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: INDUSTRY_ICON_GRADIENT }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-white">{value.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-300">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAPABILITIES: structured bento grid */}
      <section className="bg-[#f7f9fd] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: '#087fd1' }}>What we do</p>
              <h2 className="mt-3 text-3xl font-light text-[#040720] lg:text-4xl">
                End-to-end technology, <span className="font-medium">delivered.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500 lg:text-right">
              From strategy to support, we cover the full lifecycle of your digital operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              const isFeatured = i === 0;
              const isWide = i === 3;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className={`group relative overflow-hidden rounded-[1.5rem] p-7 transition-all duration-300 ${isFeatured || isWide ? 'lg:col-span-7' : 'lg:col-span-5'} ${isFeatured ? 'min-h-[280px]' : 'min-h-[220px]'}`}
                  style={{
                    background: isFeatured ? 'var(--edri-nav-blue)' : '#ffffff',
                    border: isFeatured ? 'none' : '1px solid rgba(4,7,32,0.07)',
                    boxShadow: isFeatured ? '0 18px 42px rgba(4,7,32,0.18)' : 'none',
                  }}
                  onMouseEnter={(e) => { if (!isFeatured) { e.currentTarget.style.boxShadow = '0 14px 38px rgba(4,7,32,0.1)'; e.currentTarget.style.borderColor = 'rgba(177,182,206,0.18)'; } }}
                  onMouseLeave={(e) => { if (!isFeatured) { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(4,7,32,0.07)'; } }}
                >
                  {isFeatured && <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full border border-white/10" />}
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: isFeatured ? 'rgba(255,255,255,0.14)' : INDUSTRY_ICON_GRADIENT }}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className={`mb-2 text-xl font-semibold ${isFeatured ? 'text-white' : 'text-[#040720]'}`}>{cap.title}</h4>
                      <p className={`max-w-xl text-sm leading-6 ${isFeatured ? 'text-blue-100' : 'text-slate-600'}`}>{cap.desc}</p>
                    </div>
                    {isFeatured && <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B1B6CE]">Core capability</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE: horizontal scroll */}
      <section className="relative overflow-hidden bg-white px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(55% 45% at 50% 0%, rgba(177,182,206,0.1), transparent 55%)' }} />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#B1B6CE' }}>Our journey</p>
            <h2 className="text-3xl lg:text-4xl font-light mt-3" style={{ color: '#040720' }}>Milestones along the way</h2>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x" style={{ scrollbarWidth: 'thin' }}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="snap-start shrink-0 w-72 rounded-[1.5rem] p-7 bg-white transition-all duration-300"
                style={{ border: '1px solid rgba(4,7,32,0.07)', boxShadow: '0 14px 34px rgba(4,7,32,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 22px 46px rgba(177,182,206,0.14)'; e.currentTarget.style.borderColor = 'rgba(177,182,206,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 14px 34px rgba(4,7,32,0.06)'; e.currentTarget.style.borderColor = 'rgba(4,7,32,0.07)'; }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'rgba(168,213,186,0.12)', color: '#B1B6CE' }}>{m.year}</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#040720' }}>{m.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative overflow-hidden bg-[#f7f9fd] px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(55% 45% at 50% -5%, rgba(177,182,206,0.12), transparent 60%)' }} />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: '#087fd1' }}>Our Team</p>
            <h2 className="text-3xl lg:text-4xl font-light mt-3" style={{ color: '#040720' }}>
              The experts behind <span className="font-medium">your success</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Each member brings a unique blend of technical skill and business understanding, focused on delivering measurable outcomes.
            </p>
          </motion.div>

          {/* Featured members - 2-up on desktop */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            {featuredMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[1.5rem] bg-white transition-all duration-300"
                style={{ border: '1px solid rgba(4,7,32,0.08)', boxShadow: '0 10px 28px rgba(4,7,32,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 22px 46px rgba(177,182,206,0.16)'; e.currentTarget.style.borderColor = 'rgba(177,182,206,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 10px 28px rgba(4,7,32,0.06)'; e.currentTarget.style.borderColor = 'rgba(4,7,32,0.08)'; }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
                  <div className="relative h-64 sm:h-auto overflow-hidden bg-[#ffffff]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(4,7,32,0.35))' }}
                    />
                    <div className="absolute bottom-4 left-4 sm:hidden">
                      <h3 className="text-lg font-semibold text-white drop-shadow-md">{member.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/80">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-7 sm:p-8 flex flex-col justify-center">
                    <div className="hidden sm:block">
                      <h3 className="text-xl font-semibold" style={{ color: '#040720' }}>{member.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: '#B1B6CE' }}>{member.role}</p>
                      <div className="mt-4 h-px w-10" style={{ background: INDUSTRY_ACCENT_LINE }} />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Standard members - 3-up on desktop */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(0, 3).map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[1.5rem] bg-white transition-all duration-300"
                style={{ border: '1px solid rgba(4,7,32,0.08)', boxShadow: '0 8px 24px rgba(4,7,32,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 18px 38px rgba(177,182,206,0.14)'; e.currentTarget.style.borderColor = 'rgba(177,182,206,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(4,7,32,0.05)'; e.currentTarget.style.borderColor = 'rgba(4,7,32,0.08)'; }}
              >
                <div className="relative h-64 overflow-hidden bg-[#ffffff]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(4,7,32,0.32))' }}
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-base font-semibold" style={{ color: '#040720' }}>{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: '#B1B6CE' }}>{member.role}</p>
                  <div className="my-4 h-px w-8" style={{ background: INDUSTRY_ACCENT_LINE }} />
                  <p className="text-sm leading-6 text-slate-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
