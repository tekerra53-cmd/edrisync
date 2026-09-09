import { motion } from 'framer-motion';
import { Building, HeartPulse, Shield, TrendingUp, Briefcase, Globe, Warehouse } from 'lucide-react';

const industries = [
  {
    icon: Shield,
    title: 'Financial Services',
    desc: 'Banks, fintechs, and insurance firms that must balance innovation speed with strict regulatory oversight.',
    problems: ['PCI DSS compliance', 'Fraud detection', 'Microsoft security architecture'],
    accent: '#1053F3',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    desc: 'Private practices and clinics navigating HIPAA, patient data protection, and secure collaboration.',
    problems: ['HIPAA compliance', 'Patient data governance', 'Secure Teams deployment'],
    accent: '#007dc1',
  },
  {
    icon: Warehouse,
    title: 'Construction & Real Estate',
    desc: 'Field-heavy organizations that need secure remote access, document control, and compliance.',
    problems: ['Site-to-cloud security', 'Document management', 'Mobile workforce compliance'],
    accent: '#005f83',
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    desc: 'Law firms, consulting, and advisory practices handling sensitive client data with fiduciary obligations.',
    problems: ['Client confidentiality', 'Data governance', 'Regulatory readiness'],
    accent: '#214f9e',
  },
  {
    icon: Globe,
    title: 'Manufacturing',
    desc: 'Production-focused businesses seeking operational efficiency through digital workflows and OT security.',
    problems: ['OT/IoT security', 'Supply chain digitization', 'Process automation'],
    accent: '#0b7189',
  },
  {
    icon: TrendingUp,
    title: 'SMEs',
    desc: 'Growing businesses that lack in-house expertise but need enterprise-grade security and compliance.',
    problems: ['Resource constraints', 'Security basics', 'Scalable growth'],
    accent: '#153b7d',
  },
];

export default function IndustriesSection({ sectionRef }) {
  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24 lg:py-32" style={{ backgroundColor: '#f3f5f7' }}>
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: '#007dc1' }}>Industries</p>
            <h2 className="mt-4 text-4xl font-light leading-tight lg:text-5xl" style={{ color: '#061153', fontFamily: 'var(--font-family-heading)' }}>
              Context matters.
              <br />
              <span className="font-medium">We understand yours.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end">
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
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-xl bg-white p-7 cursor-default transition-shadow duration-300"
                style={{ border: '1px solid rgba(6,17,83,0.08)', boxShadow: '0 8px 24px rgba(6,17,83,0.05)' }}
              >
                <div className="absolute left-0 right-0 top-0 h-1" style={{ backgroundColor: industry.accent }} />
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: industry.accent }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: '#061153' }}>
                    {industry.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-[14px] leading-relaxed mt-4">{industry.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {industry.problems.map((problem) => (
                    <span
                      key={problem}
                      className="text-[10px] font-medium uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(6,17,83,0.04)', color: '#374151' }}
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
