import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, FileCheck, Landmark, Settings } from 'lucide-react';

export const projects = [
  {
    title: 'Secure Cloud Migration',
    category: 'Cybersecurity',
    desc: 'A secure migration from legacy infrastructure to Microsoft Azure with Defender for Cloud coverage and no security incidents after launch.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm2-img01.webp',
    tags: ['Azure', 'Security', 'Microsoft'],
    year: '2025',
    icon: Code2,
    accent: '#1053f3',
  },
  {
    title: 'GRC Framework Implementation',
    category: 'GRC & Compliance',
    desc: 'An IT governance and risk framework aligned with ISO 27001 and local regulatory requirements, delivered in six months.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm2-img02.webp',
    tags: ['ISO 27001', 'Risk management', 'Audit'],
    year: '2025',
    icon: FileCheck,
    accent: '#007dc1',
  },
  {
    title: 'Microsoft 365 & Defender Deployment',
    category: 'Microsoft Enablement',
    desc: 'A secure Microsoft 365 environment with Defender XDR and Conditional Access, reducing incident response from hours to minutes.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm3-img03.webp',
    tags: ['M365', 'Defender', 'Identity'],
    year: '2024',
    icon: Landmark,
    accent: '#214f9e',
  },
  {
    title: 'Process Automation Transformation',
    category: 'Digital Transformation',
    desc: 'Procurement and HR workflows automated with Power Platform, cutting processing time by 70% and removing paper bottlenecks.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm3-img04.webp',
    tags: ['Automation', 'Power Platform', 'Process'],
    year: '2024',
    icon: Settings,
    accent: '#0b7189',
  },
  {
    title: 'Identity & Access Modernization',
    category: 'Cybersecurity',
    desc: 'A practical identity program that simplified access, strengthened authentication, and gave leadership a clearer view of risk.',
    tags: ['Identity', 'Zero Trust', 'Access'],
    year: '2024',
    icon: Code2,
    accent: '#153b7d',
    visual: true,
  },
];

function ProjectMeta({ project }) {
  const Icon = project.icon;
  return (
    <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: project.accent }}>
      <span className="flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {project.category}</span>
      <span className="text-slate-400">{project.year}</span>
    </div>
  );
}

function ProjectTags({ project }) {
  return <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">{tag}</span>)}</div>;
}

function ProjectVisual({ project, className }) {
  const Icon = project.icon;
  return project.image ? (
    <div className={className}><img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false} /></div>
  ) : (
    <div className={`${className} flex items-center justify-center bg-[#102b63]`}>
      <div className="w-full max-w-[210px] rounded-xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-sm">
        <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#8bd3ff]" /><span className="text-[10px] uppercase tracking-[0.16em] text-white/55">Impact</span></div>
        <div className="mt-8 text-4xl font-light">3x</div>
        <p className="mt-1 text-xs text-white/65">clearer access visibility</p>
        <div className="mt-5 h-1.5 rounded-full bg-white/15"><div className="h-full w-[78%] rounded-full bg-[#68c5ff]" /></div>
      </div>
    </div>
  );
}

export default function PortfolioSection({ sectionRef, onViewMore }) {
  const [featured] = projects;

  return (
    <section ref={sectionRef} className="relative bg-[#f4f6f8] px-5 py-24 sm:px-6 sm:py-28" style={{ scrollMarginTop: '120px' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="mb-14 flex flex-col gap-7 border-b border-slate-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#007dc1]">Case studies</p>
            <h2 className="mt-4 text-4xl font-light leading-[1.08] text-[#061153] sm:text-5xl">Work that makes the difference visible.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">A selection of security, governance, Microsoft, and transformation programs delivered for organizations ready to operate with more confidence.</p>
        </motion.div>

        <div className="grid gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(6,17,83,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(6,17,83,0.12)]">
            <div className="relative h-72 overflow-hidden sm:h-96"><img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false} /><div className="absolute bottom-5 left-5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#061153]">Featured project</div></div>
            <div className="p-7 sm:p-9"><ProjectMeta project={featured} /><h3 className="mt-5 text-3xl font-light leading-tight text-[#061153]">{featured.title}</h3><p className="mt-4 max-w-xl leading-relaxed text-slate-600">{featured.desc}</p><div className="mt-6"><ProjectTags project={featured} /></div></div>
          </motion.div>

          <div className="flex justify-center border-t border-slate-200 pt-10">
            <button onClick={onViewMore} className="relative flex min-h-[52px] items-center gap-3 rounded-xl px-8 py-4 text-sm font-semibold shadow-xl transition-all duration-200 hover:bg-[#9ca3b8] hover:shadow-2xl" style={{ backgroundColor: '#B1B6CE', color: '#061153' }}>
              View more <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
