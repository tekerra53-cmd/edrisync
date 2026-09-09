import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from './PortfolioSection';

function CaseStudyVisual({ project }) {
  const Icon = project.icon;
  if (project.image) {
    return <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false} />;
  }

  return (
    <div className="flex h-full items-center justify-center bg-[#102b63]">
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm">
        <Icon className="h-6 w-6 text-[#8bd3ff]" />
        <p className="mt-8 text-4xl font-light">3x</p>
        <p className="mt-1 text-xs text-white/65">clearer access visibility</p>
      </div>
    </div>
  );
}

export default function CaseStudiesPage({ onHome }) {
  const caseStudies = projects.slice(1);

  return (
    <section className="min-h-screen bg-[#f4f6f8] px-5 pb-24 pt-32 sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <button onClick={onHome} className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#061153]"><ArrowLeft className="h-4 w-4" /> Back to home</button>
        <div className="mt-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#007dc1]">Case studies</p>
          <h1 className="mt-4 text-5xl font-light leading-[1.04] text-[#061153] sm:text-6xl">More work. More measurable outcomes.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600">Explore the programs behind our approach to governance, secure workplaces, transformation, and identity.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {caseStudies.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(6,17,83,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(6,17,83,0.12)]">
                <div className="h-64 overflow-hidden"><CaseStudyVisual project={project} /></div>
                <div className="p-7">
                  <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: project.accent }}><span className="flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {project.category}</span><span className="text-slate-400">{project.year}</span></div>
                  <h2 className="mt-5 text-2xl font-light text-[#061153]">{project.title}</h2>
                  <p className="mt-4 leading-relaxed text-slate-600">{project.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">{tag}</span>)}</div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20 rounded-2xl bg-[#061153] px-7 py-12 text-center text-white sm:px-12"><h2 className="text-3xl font-light">Have a challenge worth solving?</h2><p className="mx-auto mt-4 max-w-xl text-white/65">Let’s talk about the outcome your organization needs next.</p><button onClick={onHome} className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#9ca3b8]" style={{ backgroundColor: '#B1B6CE', color: '#061153' }}>Start a conversation <ArrowUpRight className="h-4 w-4" /></button></div>
      </div>
    </section>
  );
}
