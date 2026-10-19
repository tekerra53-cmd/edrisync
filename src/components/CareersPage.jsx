import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, ExternalLink, MapPin, Users } from 'lucide-react';
import { getPublishedJobs } from '../services/jobs';

function dateLabel(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function safeRichText(value) {
  const allowed = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'mark', 'ul', 'ol', 'li']);
  const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const documentNode = new DOMParser().parseFromString(value || '', 'text/html');
  const render = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return escape(node.textContent || '');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const tag = node.tagName.toLowerCase();
    const children = Array.from(node.childNodes).map(render).join('');
    return allowed.has(tag) ? `<${tag}>${children}</${tag}>` : children;
  };
  return Array.from(documentNode.body.childNodes).map(render).join('');
}

export default function CareersPage({ onHome }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublishedJobs()
      .then(setJobs)
      .catch(() => setError('We could not load open roles right now. Please try again shortly.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f9fd] text-[#000741]">
      <header className="relative overflow-hidden bg-[#000741] px-6 pb-24 pt-32 sm:pb-28">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(55% 100% at 82% 0%, rgba(8,127,209,.32), transparent 62%), radial-gradient(35% 65% at 12% 100%, rgba(177,182,206,.18), transparent 66%)' }} />
        <div className="relative mx-auto max-w-6xl">
          <button onClick={onHome} className="inline-flex items-center gap-2 text-sm text-blue-100/70 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to home</button>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#B1B6CE]">Careers at EdriSync</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl">Build technology that makes progress <span className="text-[#B1B6CE]">possible.</span></h1>
            </div>
            <p className="max-w-lg text-base leading-7 text-blue-100/70">Join a team that turns complex technology into practical, secure outcomes for ambitious organisations.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <section className="grid gap-5 md:grid-cols-3">
          {[
            [Users, 'Collaborative by design', 'Work closely with people who value clear thinking, shared ownership, and generous expertise.'],
            [BriefcaseBusiness, 'Meaningful client work', 'Help organisations solve real operational, security, and growth challenges.'],
            [Clock3, 'Built for sustainable impact', 'We favour thoughtful delivery, continual learning, and work that creates lasting value.'],
          ].map(([Icon, title, text]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(4,7,32,.04)]"><Icon className="h-5 w-5 text-[#087FD1]" /><h2 className="mt-7 text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}
        </section>

        <section className="mt-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#087FD1]">Open opportunities</p><h2 className="mt-3 text-3xl font-light sm:text-4xl">Find your next challenge.</h2></div>
            {!loading && !error && <p className="text-sm text-slate-500">{jobs.length} open role{jobs.length === 1 ? '' : 's'}</p>}
          </div>

          {loading ? <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading open roles…</div> : error ? <div className="mt-10 rounded-2xl border border-rose-100 bg-rose-50 p-6 text-sm text-rose-700">{error}</div> : jobs.length === 0 ? <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center"><BriefcaseBusiness className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-4 text-lg font-semibold">No open roles today</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">We are always happy to hear from thoughtful people. Send your CV to <a className="font-semibold text-[#087FD1] hover:underline" href="mailto:info@edrisync.com?subject=Career%20opportunity%20at%20EdriSync">info@edrisync.com</a>.</p></div> : <div className="mt-10 space-y-5">{jobs.map((job, index) => <JobCard key={job.id} job={job} index={index} />)}</div>}
        </section>

        <section className="mt-20 rounded-[1.75rem] bg-[#000741] px-7 py-12 text-center text-white sm:px-12"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#B1B6CE]">Don’t see the right role?</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-light sm:text-4xl">We still want to hear what you could bring to EdriSync.</h2><a href="mailto:info@edrisync.com?subject=Career%20opportunity%20at%20EdriSync" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#087FD1] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#2857B8]">Introduce yourself <ArrowRight className="h-4 w-4" /></a></section>
      </main>
    </div>
  );
}

function JobCard({ job, index }) {
  const applicationHref = job.application_url || `mailto:${job.application_email}?subject=${encodeURIComponent(`Application — ${job.title}`)}`;
  const applicationIsExternal = Boolean(job.application_url);
  return <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(4,7,32,.05)]"><div className="p-6 sm:p-8"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start"><div><div className="flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full bg-blue-50 px-3 py-1.5 text-[#087FD1]">{job.department}</span><span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600">{job.employment_type}</span></div><h3 className="mt-5 text-2xl font-semibold tracking-tight">{job.title}</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500"><span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#087FD1]" />{job.location}</span><span>Posted {dateLabel(job.posted_at)}</span></div></div><a href={applicationHref} target={applicationIsExternal ? '_blank' : undefined} rel={applicationIsExternal ? 'noreferrer' : undefined} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#087FD1] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2857B8]">Apply now {applicationIsExternal ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</a></div><div className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 [&_mark]:rounded [&_mark]:bg-yellow-100 [&_mark]:px-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: safeRichText(job.summary) }} /><div className="mt-8 grid gap-8 border-t border-slate-100 pt-7 md:grid-cols-2"><JobList title="What you’ll do" items={job.responsibilities} /><JobList title="What you’ll bring" items={job.requirements} /></div>{job.application_instructions && <div className="mt-7 rounded-xl bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600 [&_mark]:rounded [&_mark]:bg-yellow-100 [&_mark]:px-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"><span className="font-semibold text-[#000741]">How to apply: </span><span dangerouslySetInnerHTML={{ __html: safeRichText(job.application_instructions) }} /></div>}</div></motion.article>;
}

function JobList({ title, items }) {
  return <div><h4 className="text-sm font-semibold text-[#000741]">{title}</h4><ul className="mt-4 space-y-3">{items.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2.5 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#087FD1]" /><span className="[&_mark]:rounded [&_mark]:bg-yellow-100 [&_mark]:px-1" dangerouslySetInnerHTML={{ __html: safeRichText(item) }} /></li>)}</ul></div>;
}
