import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileCheck, Landmark, Settings, Shield } from 'lucide-react';
import serviceImageCloud from '../assests/img/service-img1.png';
import serviceImageFlow from '../assests/img/service-img2.png';
import serviceImageAutomation from '../assests/img/service-img3.png';

const services = [
  { label: 'Cybersecurity', category: 'CYBERSECURITY', title: 'Security that moves with your business.', desc: 'From threat assessment to incident response, we build security into every layer of your business, connecting people, processes, and technology to reduce risk and protect what matters most.', tags: ['Assessment', 'Architecture', 'Microsoft Security'], visual: 'security', icon: Shield },
  { label: 'GRC & Compliance', category: 'GRC & COMPLIANCE', title: 'Turn compliance into confidence.', desc: 'Governance, risk, and compliance frameworks that align your technology posture with regulatory requirements and business objectives, turning compliance into a competitive advantage.', tags: ['IT Governance', 'Risk Assessment', 'Audit Readiness'], image: serviceImageFlow, icon: FileCheck },
  { label: 'Microsoft Enablement', serviceKey: 'Microsoft & Digital Workplace', category: 'MICROSOFT ENABLEMENT', title: 'Make your Microsoft investment work harder.', desc: 'We maximize your Microsoft investments, including M365, Azure, Defender, and identity, to create secure, collaborative digital workplaces that empower your team to work smarter.', tags: ['Microsoft 365', 'Azure', 'Identity & Access'], image: serviceImageCloud, icon: Landmark },
  { label: 'Digital Transformation', category: 'DIGITAL TRANSFORMATION', title: 'Make every process ready for what is next.', desc: 'Moving your business from paper to digital to automated to measurable, we optimize processes, automate workflows, and integrate systems that scale with your growth.', tags: ['Process Automation', 'Workflow', 'Systems Integration'], image: serviceImageAutomation, imagePosition: 'center top', icon: Settings },
];

function SecurityVisual() {
  return <div className="service-explorer-security" aria-hidden="true"><div className="service-explorer-orbit service-explorer-orbit-one" /><div className="service-explorer-orbit service-explorer-orbit-two" /><div className="service-explorer-shield"><Shield strokeWidth={1.35} /></div><span>Protected by design</span></div>;
}

export default function ServicesSection({ sectionRef, onServiceDetail }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const Icon = activeService.icon;

  return (
    <section ref={sectionRef} className="service-explorer" aria-labelledby="services-heading">
      <div className="service-explorer-heading"><div><p>What we do</p><h1 id="services-heading">Our Services</h1></div><span>Four connected capabilities. One strategic partner.</span></div>
      <div className="service-explorer-shell">
        <div className="service-explorer-tabs" role="tablist" aria-label="Our services">
          {services.map((service, index) => <button key={service.label} className={`service-explorer-tab${index === activeIndex ? ' is-active' : ''}`} role="tab" aria-selected={index === activeIndex} aria-controls="service-explorer-panel" id={`service-tab-${index}`} type="button" onClick={() => setActiveIndex(index)}><service.icon aria-hidden="true" /><span>{service.label}</span><ArrowUpRight className="service-explorer-tab-arrow" aria-hidden="true" /></button>)}
        </div>
        <div className="service-explorer-selector-note"><span /> Tap a practice to explore its capabilities</div>
        <AnimatePresence mode="wait">
          <motion.article key={activeService.label} id="service-explorer-panel" className="service-explorer-panel" role="tabpanel" aria-labelledby={`service-tab-${activeIndex}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}>
            <div className="service-explorer-copy">
              <div className="service-explorer-kicker"><Icon aria-hidden="true" /> {activeService.category}</div>
              <h2>{activeService.title}</h2><p>{activeService.desc}</p>
              <button type="button" className="service-explorer-cta" onClick={() => onServiceDetail?.(activeService.serviceKey || activeService.label)}>Explore service <ArrowRight aria-hidden="true" /></button>
              <div className="service-explorer-tags" aria-label={`${activeService.label} capabilities`}>{activeService.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="service-explorer-visual">
              {activeService.visual === 'security' ? <SecurityVisual /> : <img src={activeService.image} alt={`${activeService.label} service`} style={{ objectPosition: activeService.imagePosition || 'center' }} />}
              <div className="service-explorer-visual-label">{activeService.category}</div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
