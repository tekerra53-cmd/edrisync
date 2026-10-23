import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, FileCheck, Landmark, Settings } from 'lucide-react';
import { getManagedContent } from '../services/managedContent';

export const projects = [
  {
    title: 'Secure Cloud Migration',
    category: 'Cybersecurity',
    desc: 'A secure migration from legacy infrastructure to Microsoft Azure with Defender for Cloud coverage and no security incidents after launch.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm2-img01.webp',
    tags: ['Azure', 'Security', 'Microsoft'],
    year: '2025',
    icon: Code2,
    accent: '#B1B6CE',
  },
  {
    title: 'GRC Framework Implementation',
    category: 'GRC & Compliance',
    desc: 'An IT governance and risk framework aligned with ISO 27001 and local regulatory requirements, delivered in six months.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm2-img02.webp',
    tags: ['ISO 27001', 'Risk management', 'Audit'],
    year: '2025',
    icon: FileCheck,
    accent: '#B1B6CE',
  },
  {
    title: 'Microsoft 365 & Defender Deployment',
    category: 'Microsoft Enablement',
    desc: 'A secure Microsoft 365 environment with Defender XDR and Conditional Access, reducing incident response from hours to minutes.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm3-img03.webp',
    tags: ['M365', 'Defender', 'Identity'],
    year: '2024',
    icon: Landmark,
    accent: '#000741',
  },
  {
    title: 'Process Automation Transformation',
    category: 'Digital Transformation',
    desc: 'Procurement and HR workflows automated with Power Platform, cutting processing time by 70% and removing paper bottlenecks.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm3-img04.webp',
    tags: ['Automation', 'Power Platform', 'Process'],
    year: '2024',
    icon: Settings,
    accent: '#4ADE80',
  },
  {
    title: 'Identity & Access Modernization',
    category: 'Cybersecurity',
    desc: 'A practical identity program that simplified access, strengthened authentication, and gave leadership a clearer view of risk.',
    tags: ['Identity', 'Zero Trust', 'Access'],
    year: '2024',
    icon: Code2,
    accent: '#000741',
    visual: true,
  },
];

// Icons are React components and must never be read back from persisted JSON.
// A previously saved case study can contain a serialized icon object, which
// React cannot render. Derive the display icon from the plain-text category.
const categoryIcons = {
  Cybersecurity: Code2,
  'GRC & Compliance': FileCheck,
  'Microsoft Enablement': Landmark,
  'Digital Transformation': Settings,
};

function getProjectIcon(project) {
  return categoryIcons[project?.category] || Code2;
}

function ProjectMeta({ project }) {
  const Icon = getProjectIcon(project);
  return (
    <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: project.accent }}>
      <span className="flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {project.category}</span>
      <span className="text-slate-400">{project.year}</span>
    </div>
  );
}

function ProjectTags({ project }) {
  const tags = Array.isArray(project.tags) ? project.tags : [];
  return <div className="flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">{tag}</span>)}</div>;
}

function ProjectVisual({ project, className }) {
  const Icon = getProjectIcon(project);
  return project.image ? (
    <div className={className}><img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false} /></div>
  ) : (
    <div className={`${className} flex items-center justify-center bg-[#000741]`}>
      <div className="w-full max-w-[210px] rounded-xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-sm">
        <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#B1B6CE]" /><span className="text-[10px] uppercase tracking-[0.16em] text-white/55">Impact</span></div>
        <div className="mt-8 text-4xl font-light">3x</div>
        <p className="mt-1 text-xs text-white/65">clearer access visibility</p>
        <div className="mt-5 h-1.5 rounded-full bg-white/15"><div className="h-full w-[78%] rounded-full bg-[#B1B6CE]" /></div>
      </div>
    </div>
  );
}

export default function PortfolioSection({ sectionRef, onViewMore }) {
  const [managedProjects, setManagedProjects] = useState(projects);

  useEffect(() => {
    getManagedContent('case_studies', projects).then((items) => {
      if (Array.isArray(items) && items.length) setManagedProjects(items);
    });
  }, []);

  const [featured, ...supportingProjects] = managedProjects;
  const secondaryProjects = supportingProjects.slice(0, 2);

  return (
    <section ref={sectionRef} className="relative bg-[#ffffff] py-20 sm:py-24 lg:py-28" style={{ scrollMarginTop: '120px' }}>
      <div className="w-full" style={{ paddingLeft: 'clamp(1.5rem, 8%, 9rem)', paddingRight: 'clamp(1.5rem, 5%, 5rem)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="mb-14 border-b border-slate-200 pb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#087fd1]">Case studies</p>
            <h2 className="mt-4 text-4xl font-light leading-[1.08] text-[#000741] sm:text-5xl">Work that makes the difference visible.</h2>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 [text-align:justify] [text-align-last:left] text-slate-600">A selection of security, governance, Microsoft, and transformation programs delivered for organizations ready to operate with more confidence.</p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(4,7,32,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(4,7,32,0.12)]">
              <div className="relative h-64 overflow-hidden sm:h-72"><img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false} /><div className="absolute bottom-5 left-5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#000741]">Featured project</div></div>
              <div className="p-7 sm:p-8"><ProjectMeta project={featured} /><h3 className="mt-5 text-3xl font-light leading-tight text-[#000741]">{featured.title}</h3><p className="mt-4 leading-7 [text-align:justify] [text-align-last:left] text-slate-600">{featured.desc}</p><div className="mt-6"><ProjectTags project={featured} /></div></div>
            </motion.div>

            <div className="grid gap-6">
              {secondaryProjects.map((project, index) => (
                <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }} className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(4,7,32,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(4,7,32,0.12)] sm:grid-cols-[150px_minmax(0,1fr)] xl:grid-cols-[130px_minmax(0,1fr)]">
                  <ProjectVisual project={project} className="relative h-44 overflow-hidden sm:h-full sm:min-h-[190px]" />
                  <div className="flex flex-col justify-center p-6"><ProjectMeta project={project} /><h3 className="mt-4 text-xl font-medium leading-tight text-[#000741]">{project.title}</h3><p className="mt-3 text-sm leading-6 [text-align:justify] [text-align-last:left] text-slate-600">{project.desc}</p><div className="mt-4"><ProjectTags project={project} /></div></div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center border-t border-slate-200 pt-10">
            <button onClick={onViewMore} className="relative flex min-h-[52px] items-center gap-3 rounded-xl px-8 py-4 text-sm font-semibold shadow-xl transition-all duration-200 hover:bg-[#B1B6CE] hover:shadow-2xl" style={{ backgroundColor: '#B1B6CE', color: '#000741' }}>
              View more <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
