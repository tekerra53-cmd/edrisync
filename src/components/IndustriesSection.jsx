import { motion } from 'framer-motion';
import { Building, HeartPulse, Shield, TrendingUp, Briefcase, Globe, Warehouse } from 'lucide-react';

const industries = [
  {
    icon: Shield,
    title: 'Financial Services',
    desc: 'Banks, fintechs, and insurance firms that must balance innovation speed with strict regulatory oversight.',
    problems: ['PCI DSS compliance', 'Fraud detection', 'Microsoft security architecture'],
    accent: 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)',
    surface: 'linear-gradient(145deg, #040720 0%, #0a1b4c 52%, #164293 100%)',
    tint: 'rgba(95, 153, 255, 0.12)',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    desc: 'Private practices and clinics navigating HIPAA, patient data protection, and secure collaboration.',
    problems: ['HIPAA compliance', 'Patient data governance', 'Secure Teams deployment'],
    accent: 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)',
    surface: 'linear-gradient(145deg, #040720 0%, #0a1b4c 52%, #164293 100%)',
    tint: 'rgba(95, 153, 255, 0.12)',
  },
  {
    icon: Warehouse,
    title: 'Construction & Real Estate',
    desc: 'Field-heavy organizations that need secure remote access, document control, and compliance.',
    problems: ['Site-to-cloud security', 'Document management', 'Mobile workforce compliance'],
    accent: 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)',
    surface: 'linear-gradient(145deg, #040720 0%, #0a1b4c 52%, #164293 100%)',
    tint: 'rgba(95, 153, 255, 0.12)',
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    desc: 'Law firms, consulting, and advisory practices handling sensitive client data with fiduciary obligations.',
    problems: ['Client confidentiality', 'Data governance', 'Regulatory readiness'],
    accent: 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)',
    surface: 'linear-gradient(145deg, #040720 0%, #0a1b4c 52%, #164293 100%)',
    tint: 'rgba(95, 153, 255, 0.12)',
  },
  {
    icon: Globe,
    title: 'Manufacturing',
    desc: 'Production-focused businesses seeking operational efficiency through digital workflows and OT security.',
    problems: ['OT/IoT security', 'Supply chain digitization', 'Process automation'],
    accent: 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)',
    surface: 'linear-gradient(145deg, #040720 0%, #0a1b4c 52%, #164293 100%)',
    tint: 'rgba(95, 153, 255, 0.12)',
  },
  {
    icon: TrendingUp,
    title: 'SMEs',
    desc: 'Growing businesses that lack in-house expertise but need enterprise-grade security and compliance.',
    problems: ['Resource constraints', 'Security basics', 'Scalable growth'],
    accent: 'linear-gradient(135deg, #10245f 0%, #2857b8 100%)',
    surface: 'linear-gradient(145deg, #040720 0%, #0a1b4c 52%, #164293 100%)',
    tint: 'rgba(95, 153, 255, 0.12)',
  },
];

export default function IndustriesSection({ sectionRef }) {
  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24 lg:py-32" style={{ backgroundColor: '#ffffff' }}>
      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: '#087fd1' }}>Industries</p>
            <h2 className="mt-4 text-4xl font-light leading-tight lg:text-5xl" style={{ color: '#0a1a68', fontFamily: 'var(--font-family-heading)' }}>
              Context matters.
              <br />
              <span className="font-medium">We understand yours.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed lg:justify-self-end" style={{ color: '#526076' }}>
            Your risks, systems, and operating pressures are specific to your industry. We bring the right mix of security, governance, and digital capability to the work.
          </p>
        </motion.div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[22px] p-7 cursor-default transition-shadow duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(239,246,255,0.82) 100%)',
                  border: '1px solid rgba(79,166,255,0.18)',
                  boxShadow: '0 14px 36px rgba(18,39,92,0.08)',
                  backdropFilter: 'blur(18px)',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.boxShadow = '0 24px 54px rgba(18,39,92,0.13), 0 0 32px rgba(79,166,255,0.15)';
                  event.currentTarget.style.borderColor = 'rgba(79,166,255,0.40)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.boxShadow = '0 14px 36px rgba(18,39,92,0.08)';
                  event.currentTarget.style.borderColor = 'rgba(79,166,255,0.18)';
                }}
              >
                <div
                  className="absolute inset-0 z-0 origin-top scale-y-[0.018] transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ background: industry.surface }}
                />
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-70" style={{ background: `radial-gradient(circle, ${industry.tint} 0%, transparent 70%)` }} />
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15 group-hover:shadow-none"
                    style={{ background: industry.accent, boxShadow: '0 8px 18px rgba(23,69,185,0.14)' }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0a1a68] transition-colors duration-300 group-hover:text-white">
                    {industry.title}
                  </h3>
                </div>

                <p className="relative z-10 mt-4 text-[14px] leading-relaxed text-[#526076] transition-colors duration-300 group-hover:text-[#edf6ff]">{industry.desc}</p>

                <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {industry.problems.map((problem) => (
                    <span
                      key={problem}
                      className="rounded-full border border-[rgba(79,166,255,0.10)] bg-[rgba(79,166,255,0.09)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#496baa] transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/15 group-hover:text-white"
                    >
                      {problem}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
