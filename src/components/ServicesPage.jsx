import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, FileCheck, Landmark, Settings } from 'lucide-react';

const servicePillars = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    short: 'Threat assessment through incident response, with security built into every layer.',
    desc: 'We assess your current security posture, design zero-trust architectures, implement Microsoft Defender and endpoint protection, monitor for threats, and prepare you for any incident, all while connecting back to your governance and compliance requirements.',
    capabilities: ['Security assessments', 'Microsoft Defender XDR', 'Endpoint & network security', 'Threat monitoring', 'Incident response'],
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4da8ef 100%)',
  },
  {
    icon: FileCheck,
    title: 'GRC & Compliance',
    short: 'Governance, risk, and compliance frameworks aligned to your business and regulatory landscape.',
    desc: 'From IT governance and risk assessment to policy development, regulatory readiness, and audit preparation, we turn compliance from a burden into a competitive advantage.',
    capabilities: ['IT governance', 'Risk assessment', 'Policy & controls', 'Audit readiness', 'Data governance'],
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4da8ef 100%)',
  },
  {
    icon: Landmark,
    title: 'Microsoft & Digital Workplace',
    short: 'Maximize your Microsoft investment with secure, collaborative digital workplaces.',
    desc: 'We architect and implement secure Microsoft 365, Azure, and identity solutions, including Defender, Conditional Access, SharePoint, and Teams, that empower your workforce while meeting your security and compliance standards.',
    capabilities: ['Microsoft 365', 'Azure', 'Identity & Access', 'Defender XDR', 'SharePoint & Teams'],
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4da8ef 100%)',
  },
  {
    icon: Settings,
    title: 'Digital Transformation',
    short: 'Paper to digital to automated to measurable. Optimize your business processes at every stage.',
    desc: 'We discover inefficiencies, digitize paper workflows, automate repetitive tasks, and integrate your systems into a cohesive, measurable digital operating model.',
    capabilities: ['Process discovery', 'Paper-to-digital', 'Workflow automation', 'Business systems integration', 'Digital workplace'],
    accent: '#087fd1',
    gradient: 'linear-gradient(135deg, #087fd1 0%, #4da8ef 100%)',
  },
];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl p-8 cursor-default transition-shadow duration-300"
      style={{ border: '1px solid rgba(4,7,32,0.07)', boxShadow: '0 8px 30px rgba(4,7,32,0.06)' }}
    >
      <div className="flex items-start gap-5">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: service.gradient, boxShadow: '0 8px 20px rgba(40,87,184,0.22)' }}
        >
          <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#040720' }}>
            {service.title}
          </h3>
          <p className="text-gray-600 text-[14px] leading-relaxed mb-4">{service.desc}</p>
          <div className="flex flex-wrap gap-2">
            {service.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[10px] font-medium uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(8,127,209,0.08)', color: service.accent }}
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage({ onHome }) {
  return (
    <div style={{ backgroundColor: '#f7f9fd', minHeight: '100vh' }} className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden px-6 pb-14 pt-32" style={{ background: 'linear-gradient(135deg, #087fd1 0%, #4da8ef 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(8,127,209,0.45), transparent 45%), radial-gradient(circle at 85% 60%, rgba(40,87,184,0.35), transparent 45%)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em]" style={{ color: '#087fd1' }}>
            Our Services
          </p>
          <h1 className="text-4xl lg:text-[2.8rem] font-light leading-tight text-white">
            Cybersecurity. GRC. Microsoft. <span className="font-medium">Digital Transformation.</span>
          </h1>
          <p className="text-white/70 mt-4 max-w-xl leading-relaxed">
            We position technology as a strategic business enabler, connecting cybersecurity, governance, Microsoft enablement, and digital transformation into one coordinated offering.
          </p>
        </div>
      </header>

      {/* Introduction */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed"
        >
          Rather than treating each service area in isolation, we connect them so your security strategy aligns with your compliance obligations, your Microsoft investment supports your transformation goals, and every recommendation ties back to measurable business outcomes.
        </motion.p>
      </div>

      {/* Service pillars grid */}
      <div className="mx-auto max-w-6xl px-6 pb-28">
        <div className="space-y-6">
          {servicePillars.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onHome(); }}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#040720] transition-all duration-200 hover:gap-3"
          >
            Request a consultation
            <ArrowRight className="h-4 w-4 text-[#087fd1] transition-colors group-hover:text-[#2857b8]" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
