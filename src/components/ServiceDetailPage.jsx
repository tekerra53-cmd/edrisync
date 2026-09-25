import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  FileCheck2,
  Network,
  Radar,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import {
  DigitalTransformationLayoutPro,
  GRCLayoutPro,
  MicrosoftLayoutPro,
} from './ServiceExperienceLayouts';

const serviceContent = {
  Cybersecurity: {
    eyebrow: 'Cybersecurity services',
    title: 'Make security a source of momentum.',
    intro: 'Build a resilient security program that protects your people, platforms, and reputation while keeping the business moving.',
    description: 'Edrisync brings security strategy, architecture, implementation, and continuous improvement into one practical operating model. We help you see risk clearly, close the gaps that matter, and create a security capability your teams can run with confidence.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=85',
    color: '#000741',
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4FA6FF 100%)',
    icon: ShieldCheck,
    capabilities: ['Security posture assessments', 'Zero-trust architecture', 'Microsoft Defender XDR', 'Identity and endpoint protection', 'Threat monitoring and response', 'Security awareness programs'],
    outcomes: ['Clear visibility into your attack surface', 'Prioritized remediation roadmap', 'Stronger identity and access controls', 'Incident readiness that reduces downtime'],
    phases: ['Assess', 'Design', 'Implement', 'Improve'],
  },
  'GRC & Compliance': {
    eyebrow: 'Governance, risk & compliance',
    title: 'Turn compliance into confidence.',
    intro: 'Create governance that makes decisions clearer, risk more manageable, and audits less disruptive.',
    description: 'We connect your policies, controls, evidence, and business priorities into a living GRC program. The result is a framework that supports accountability and growth instead of becoming a folder of documents that no one uses.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85',
    color: '#000741',
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4FA6FF 100%)',
    icon: FileCheck2,
    capabilities: ['GRC program design', 'Risk and control assessments', 'Policy and control libraries', 'Audit and regulatory readiness', 'Third-party risk management', 'Data governance'],
    outcomes: ['A shared language for business risk', 'Evidence that is easier to maintain', 'Stronger control ownership', 'Audit preparation without the scramble'],
    phases: ['Map', 'Prioritize', 'Operationalize', 'Measure'],
  },
  'Microsoft & Digital Workplace': {
    eyebrow: 'Microsoft enablement',
    title: 'Make every Microsoft investment work harder.',
    intro: 'Design a secure, connected workplace where people can collaborate productively from anywhere.',
    description: 'From Microsoft 365 and Azure to identity, Defender, Teams, and SharePoint, we turn your Microsoft environment into a cohesive digital workplace. Our approach balances adoption, security, governance, and measurable business value.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
    color: '#000741',
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4FA6FF 100%)',
    icon: Cloud,
    capabilities: ['Microsoft 365 strategy', 'Azure foundations', 'Identity and Conditional Access', 'Defender security stack', 'Teams and SharePoint', 'Adoption and enablement'],
    outcomes: ['Secure access for every worker', 'Less tool sprawl and duplication', 'Higher collaboration and adoption', 'A workplace that scales with the business'],
    phases: ['Discover', 'Architect', 'Enable', 'Optimize'],
  },
  'Digital Transformation': {
    eyebrow: 'Digital transformation',
    title: 'Move from manual work to measurable momentum.',
    intro: 'Replace friction with connected processes, useful automation, and systems that help your people do their best work.',
    description: 'We find the workarounds slowing your organization down, then design practical digital journeys that improve speed, visibility, and customer experience. Every transformation is grounded in the operating reality of your teams.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=85',
    color: '#000741',
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4FA6FF 100%)',
    icon: Workflow,
    capabilities: ['Process discovery and mapping', 'Paper-to-digital workflows', 'Business process automation', 'Systems integration', 'Data and reporting foundations', 'Change and adoption'],
    outcomes: ['Fewer manual handoffs', 'Better data across the business', 'Faster, more consistent operations', 'Transformation people actually adopt'],
    phases: ['Discover', 'Design', 'Deliver', 'Scale'],
  },
};

const fallbackKey = 'Cybersecurity';

function OrbitVisual({ service }) {
  const Icon = service.icon;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[510px]">
      <motion.div
        className="absolute inset-[12%] rounded-full border border-white/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-[25%] rounded-full border border-dashed border-white/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[5%] rounded-full bg-[#000741]/40 blur-3xl" />
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[30%] border border-white/30 bg-[#000741]/90 shadow-[0_0_70px_rgba(255,255,255,0.22)] backdrop-blur-xl"
        animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-[72%] w-[72%] flex-col items-center justify-center rounded-[24%] border border-white/10 bg-[#000741]/90">
          <Icon className="mb-3 h-10 w-10 text-white" strokeWidth={1.4} />
          <span className="text-center text-[9px] font-semibold tracking-[0.2em] text-white/85">EDRISYNC</span>
          <span className="mt-1 text-center text-[8px] tracking-[0.14em] text-white/60">SERVICE CORE</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute left-[7%] top-[20%] flex items-center gap-2 rounded-full border border-white/15 bg-[#000741]/90 px-3 py-2 text-[10px] text-white/80 shadow-lg backdrop-blur-md"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Radar className="h-4 w-4" style={{ color: service.accent }} />
        Always on
      </motion.div>
      <motion.div
        className="absolute bottom-[18%] right-[4%] flex items-center gap-2 rounded-full border border-white/15 bg-[#000741]/90 px-3 py-2 text-[10px] text-white/80 shadow-lg backdrop-blur-md"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <Check className="h-4 w-4" style={{ color: service.accent }} />
        Business ready
      </motion.div>
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-2 rounded-full"
          style={{ backgroundColor: '#ffffff', left: `${[19, 74, 84][index]}%`, top: `${[72, 18, 68][index]}%`, boxShadow: '0 0 18px 5px rgba(255,255,255,0.55)' }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.2 + index * 0.4, repeat: Infinity, delay: index * 0.4 }}
        />
      ))}
    </div>
  );
}

// CYBERSECURITY - Traditional layout with orbit visual
function CybersecurityLayout({ service, onServices, onHome }) {
  const Icon = service.icon;
  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#000741]">
      <header className="relative overflow-hidden bg-[linear-gradient(135deg,#087fd1_0%,#4FA6FF_100%)] px-6 pb-20 pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(8,127,209,0.42),transparent_40%),radial-gradient(circle_at_30%_100%,rgba(40,87,184,0.25),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-[#000741]/85 transition-colors hover:text-[#000741]">
            <ArrowLeft className="h-4 w-4" /> All services
          </button>
          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-[#000741]">
                <Icon className="h-4 w-4" /> {service.eyebrow}
              </div>
              <h1 className="max-w-2xl text-4xl font-light leading-[1.06] text-white sm:text-5xl lg:text-[4.4rem]">{service.title}</h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{service.intro}</p>
              <button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="mt-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: service.gradient }}>
                Explore this service <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
              <OrbitVisual service={service} />
            </motion.div>
          </div>
        </div>
      </header>

      <main id="service-start">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>The Edrisync approach</span>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Technology that connects to the way your business really works.</h2>
            <p className="mt-6 leading-relaxed text-slate-600">{service.description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] bg-[#000741] shadow-[0_24px_70px_rgba(4,7,32,0.18)]">
            <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#000741] via-[#000741]/30 to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-xs text-white"><p className="text-lg font-medium leading-snug">One connected program. Clearer outcomes.</p></div>
          </motion.div>
        </section>

        <section className="bg-white px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>What we deliver</span><h2 className="mt-4 text-3xl font-light sm:text-4xl">Capability built around your next move.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((capability, index) => (
                <motion.div key={capability} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="group relative min-h-[168px] overflow-hidden rounded-2xl border border-slate-200 bg-[#ffffff] p-6 transition-colors hover:border-[#B1B6CE]">
                  <img src={service.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[#000741]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 mb-8 flex items-center justify-end"><ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" /></div>
                  <h3 className="relative z-10 font-semibold text-[#000741] transition-colors duration-300 group-hover:text-white">{capability}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>The outcome</span><h2 className="mt-4 text-3xl font-light sm:text-4xl">Built to make progress visible.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">{service.outcomes.map((outcome, index) => <motion.div key={outcome} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-3 border-t border-slate-200 pt-4"><Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: service.accent }} /><p className="text-sm leading-relaxed text-slate-600">{outcome}</p></motion.div>)}</div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#087fd1_0%,#4FA6FF_100%)] px-6 py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl"><div className="mb-12 max-w-xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>How we work</span><h2 className="mt-4 text-3xl font-light sm:text-4xl">A practical path from first signal to lasting capability.</h2></div><div className="grid gap-8 md:grid-cols-4">{service.phases.map((phase, index) => <div key={phase} className="relative border-t border-white/20 pt-5"><h3 className="text-xl font-medium">{phase}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">A focused stage with clear decisions, useful artefacts, and measurable progress.</p>{index < service.phases.length - 1 && <ArrowRight className="absolute right-0 top-5 hidden h-5 w-5 text-white/30 md:block" />}</div>)}</div></div>
        </section>

        <section className="px-6 py-20 text-center lg:py-28"><Network className="mx-auto mb-5 h-8 w-8" style={{ color: service.accent }} /><h2 className="mx-auto max-w-2xl text-3xl font-light sm:text-4xl">Ready to make this service work for your organization?</h2><p className="mx-auto mt-5 max-w-xl text-slate-600">Let’s talk through where you are, what is changing, and the next practical step.</p><button onClick={onHome} className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: service.gradient }}>Start a conversation <ArrowRight className="h-4 w-4" /></button></section>
      </main>
    </div>
  );
}
// GRC - Formal, structured layout
function GRCLayout({ service, onServices, onHome }) {
  return (
    <div className="min-h-screen bg-white text-[#000741]">
      <header className="relative overflow-hidden px-6 py-20 lg:py-32" style={{ backgroundColor: service.color }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }} />
        <div className="relative mx-auto max-w-7xl">
          <button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All services
          </button>
          <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-white/80">
              <service.icon className="h-4 w-4" /> {service.eyebrow}
            </div>
            <h1 className="max-w-3xl text-5xl font-light leading-[1.1] text-white sm:text-6xl">{service.title}</h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/85">{service.intro}</p>
            <button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="mt-10 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white bg-white/15 backdrop-blur hover:bg-white/25 transition-all">
              Explore <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </header>
      <main id="service-start">
        <section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-5xl"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="grid gap-12 md:grid-cols-[1fr_1fr]"><div><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Our Approach</span><h2 className="mt-4 text-4xl font-light leading-tight">{service.description}</h2></div><div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 p-8"><img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[280px] w-full object-cover rounded-2xl opacity-60" /></div></div></motion.div></div></section>
        <section className="bg-slate-50 px-6 py-24 lg:py-32"><div className="mx-auto max-w-5xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Key Capabilities</span><h2 className="mt-4 text-4xl font-light mb-12">What makes the difference</h2><div className="grid gap-6 md:grid-cols-2">{service.capabilities.map((capability, index) => <motion.div key={capability} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"><div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-semibold text-white" style={{ backgroundColor: service.color }}>{index + 1}</div><div><h3 className="font-semibold text-lg">{capability}</h3></div></motion.div>)}</div></div></section>
        <section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-5xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Expected Outcomes</span><h2 className="mt-4 text-4xl font-light mb-12">Measurable results</h2><div className="space-y-4">{service.outcomes.map((outcome, index) => <motion.div key={outcome} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="flex gap-4 p-4 border-b-2 border-slate-200 last:border-b-0"><Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: service.color }} /><p className="text-lg text-slate-700">{outcome}</p></motion.div>)}</div></div></section>
        <section className="px-6 py-24 lg:py-32" style={{ backgroundColor: service.color }}><div className="mx-auto max-w-5xl"><span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Implementation Path</span><h2 className="mt-4 text-4xl font-light text-white mb-16">Our phased approach</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{service.phases.map((phase, index) => <motion.div key={phase} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20"><div className="text-4xl font-light text-white/60 mb-3">{String(index + 1).padStart(2, '0')}</div><h3 className="text-2xl font-light text-white mb-3">{phase}</h3><p className="text-white/70">Strategic milestones and deliverables tailored to your organization's maturity and needs.</p></motion.div>)}</div></div></section>
        <section className="px-6 py-20 text-center lg:py-24"><h2 className="mx-auto max-w-2xl text-4xl font-light">Let's discuss your GRC maturity</h2><p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">Understanding where you stand and where you want to be.</p><button onClick={onHome} className="mt-10 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>Start the conversation <ArrowRight className="h-4 w-4" /></button></section>
      </main>
    </div>
  );
}

// MICROSOFT - Modern ecosystem layout
function MicrosoftLayout({ service, onServices, onHome }) {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000741]"><header className="relative overflow-hidden px-6 pt-32 pb-24 lg:pb-40"><div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${service.accent}15 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${service.color}10 0%, transparent 50%)` }} /><div className="relative mx-auto max-w-7xl"><button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"><ArrowLeft className="h-4 w-4" /> All services</button><div className="grid gap-16 lg:grid-cols-2 lg:items-center"><motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}><div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]" style={{ color: service.color }}><service.icon className="h-5 w-5" /> {service.eyebrow}</div><h1 className="max-w-2xl text-5xl font-light leading-[1.1] sm:text-6xl">{service.title}</h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-700">{service.intro}</p><button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>Get started <ArrowRight className="h-4 w-4" /></button></motion.div><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative"><div className="grid grid-cols-2 gap-4">{service.capabilities.slice(0, 4).map((cap, idx) => <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"><div className="h-10 w-10 rounded-lg mb-4" style={{ backgroundColor: `${service.accent}20` }} /><p className="text-sm font-medium text-slate-900">{cap}</p></div>)}</div></motion.div></div></div></header><main id="service-start"><section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-16 lg:grid-cols-2 lg:items-center"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Why Microsoft Matters</span><h2 className="mt-4 text-4xl font-light leading-tight">The platform that powers modern work</h2><p className="mt-6 text-lg leading-relaxed text-slate-700">{service.description}</p></motion.div><motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative"><img src={service.image} alt={`${service.eyebrow} in practice`} className="w-full rounded-3xl shadow-xl" /></motion.div></div></div></section><section className="bg-white px-6 py-24 lg:py-32"><div className="mx-auto max-w-7xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Core Components</span><h2 className="mt-4 text-4xl font-light mb-16">Integrated solutions</h2><div className="grid gap-8 md:grid-cols-3">{service.capabilities.map((capability, index) => <motion.div key={capability} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="relative group"><div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-slate-100 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur" /><div className="relative bg-white p-8 rounded-2xl"><div className="flex items-center gap-3 mb-4"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} /><h3 className="font-semibold text-lg">{capability}</h3></div><p className="text-sm text-slate-600">Enterprise-grade capability for modern digital workplaces.</p></div></motion.div>)}</div></div></section><section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-2"><div><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Proven Results</span><h2 className="mt-4 text-4xl font-light mb-8">Transform how teams work</h2><div className="space-y-4">{service.outcomes.map((outcome, index) => <motion.div key={outcome} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="flex gap-3"><Check className="h-6 w-6 shrink-0 mt-0.5" style={{ color: service.color }} /><p className="text-lg text-slate-700">{outcome}</p></motion.div>)}</div></div><div className="relative rounded-3xl overflow-hidden h-[400px]"><img src={service.image} alt="Microsoft transformation" className="h-full w-full object-cover" /></div></div></div></section><section className="px-6 py-24 lg:py-32" style={{ backgroundColor: `${service.color}08` }}><div className="mx-auto max-w-7xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Deployment Journey</span><h2 className="mt-4 text-4xl font-light mb-12">Structured implementation</h2><div className="grid gap-6 md:grid-cols-4">{service.phases.map((phase, index) => <motion.div key={phase} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative">{index < service.phases.length - 1 && <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-slate-300" />}<div className="relative z-10"><div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white mb-4" style={{ backgroundColor: service.color }}>{index + 1}</div><h3 className="text-xl font-light mb-2">{phase}</h3><p className="text-sm text-slate-600">Strategic milestone in your Microsoft adoption.</p></div></motion.div>)}</div></div></section><section className="px-6 py-20 text-center lg:py-28"><h2 className="mx-auto max-w-2xl text-4xl font-light">Ready to optimize your Microsoft investment?</h2><p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">Let's talk about your digital workplace vision.</p><button onClick={onHome} className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>Begin the journey <ArrowRight className="h-4 w-4" /></button></section></main>
    </div>
  );
}

// DIGITAL TRANSFORMATION - Dynamic, forward-looking
function DigitalTransformationLayout({ service, onServices, onHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-[#000741]"><header className="relative overflow-hidden px-6 py-32 lg:py-40"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} /><div className="relative mx-auto max-w-7xl"><button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900"><ArrowLeft className="h-4 w-4" /> All services</button><motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]" style={{ color: service.color }}><service.icon className="h-5 w-5" /> {service.eyebrow}</div><h1 className="max-w-3xl text-6xl font-light leading-[1.1]">{service.title}</h1><p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-700">{service.intro}</p><div className="mt-10 flex flex-wrap gap-4"><button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>Discover the opportunity <ArrowRight className="h-4 w-4" /></button></div></motion.div></div></header><main id="service-start"><section className="px-6 py-24 lg:py-32 bg-white"><div className="mx-auto max-w-6xl"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The Challenge</span><h2 className="mt-4 text-4xl font-light leading-tight mb-6">{service.description}</h2><img src={service.image} alt={`${service.eyebrow} in practice`} className="w-full rounded-2xl shadow-lg h-[320px] object-cover" /></motion.div></div></section><section className="px-6 py-24 lg:py-32"><div className="mx-auto max-w-6xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Transformation Pillars</span><h2 className="mt-4 text-4xl font-light mb-16">Where we focus</h2><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{service.capabilities.map((capability, index) => <motion.div key={capability} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg"><div className="flex items-start justify-between mb-4"><h3 className="text-xl font-light">{capability}</h3><div className="text-3xl font-light" style={{ color: service.color }}>↗</div></div><p className="text-sm text-slate-600">Strategic focus area in your digital evolution.</p></motion.div>)}</div></div></section><section className="px-6 py-24 lg:py-32" style={{ backgroundColor: service.color }}><div className="mx-auto max-w-6xl"><span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Impact Zone</span><h2 className="mt-4 text-4xl font-light text-white mb-16">What changes</h2><div className="grid gap-6 md:grid-cols-2">{service.outcomes.map((outcome, index) => <motion.div key={outcome} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex gap-4 items-start"><div className="flex-shrink-0"><Check className="h-6 w-6 text-white/80 mt-1" /></div><p className="text-lg text-white/90 leading-relaxed">{outcome}</p></motion.div>)}</div></div></section><section className="px-6 py-24 lg:py-32 bg-white"><div className="mx-auto max-w-6xl"><span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>Transformation Phases</span><h2 className="mt-4 text-4xl font-light mb-16">Your journey</h2><div className="grid gap-8 md:grid-cols-4">{service.phases.map((phase, index) => <motion.div key={phase} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative"><div className="mb-6 text-5xl font-light opacity-10" style={{ color: service.color }}>{String(index + 1).padStart(2, '0')}</div><h3 className="text-xl font-light mb-3">{phase}</h3><p className="text-sm text-slate-600 leading-relaxed">Strategic outcomes and measurable progress in this phase.</p>{index < service.phases.length - 1 && <div className="hidden md:block absolute -right-4 top-8 text-2xl text-slate-300">→</div>}</motion.div>)}</div></div></section><section className="px-6 py-20 text-center lg:py-28" style={{ backgroundColor: `${service.color}08` }}><h2 className="mx-auto max-w-2xl text-4xl font-light">Ready to transform?</h2><p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">Let's map out your digital future together.</p><button onClick={onHome} className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>Let's get started <ArrowRight className="h-4 w-4" /></button></section></main>
    </div>
  );
}

export default function ServiceDetailPage({ serviceKey, onHome, onServices }) {
  console.error('ServiceDetailPage render', serviceKey);
  const service = serviceContent[serviceKey] || serviceContent[fallbackKey];

  switch (serviceKey) {
    case 'GRC & Compliance':
      return <GRCLayoutPro service={service} onServices={onServices} onHome={onHome} />;
    case 'Microsoft & Digital Workplace':
      return <MicrosoftLayoutPro service={service} onServices={onServices} onHome={onHome} />;
    case 'Digital Transformation':
      return <DigitalTransformationLayoutPro service={service} onServices={onServices} onHome={onHome} />;
    default:
      return <CybersecurityLayout service={service} onServices={onServices} onHome={onHome} />;
  }
}
