import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, MapPin, Share2 } from 'lucide-react';
import { getPublishedJobBySlug, submitJobApplication } from '../services/jobs';

export default function JobDetailPage({ slug, onCareers }) {
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { getPublishedJobBySlug(slug).then(setJob).catch(() => setMessage('This vacancy is unavailable.')); }, [slug]);
  if (message && !job) return <main className="px-6 py-40 text-center"><p>{message}</p><button className="mt-6 text-[#087FD1]" onClick={onCareers}>View all vacancies</button></main>;
  if (!job) return <main className="px-6 py-40 text-center text-slate-500">Loading vacancy…</main>;
  const directApply = () => {
    if (job.application_url) return window.open(job.application_url, '_blank', 'noopener,noreferrer');
    window.location.href = `mailto:${job.application_email}?subject=${encodeURIComponent(`Application — ${job.title}`)}&body=${encodeURIComponent(job.application_instructions || '')}`;
  };
  const submitScreening = async () => {
    if (!answer.trim()) return;
    setSubmitting(true);
    try { await submitJobApplication({ job_id: job.id, screening_answer: answer.trim() }); setMessage('Your response has been sent to the EDRISYNC recruitment dashboard.'); setAnswer(''); }
    catch { setMessage('We could not send your response. Please try again.'); }
    finally { setSubmitting(false); }
  };
  const share = async () => { await navigator.clipboard?.writeText(window.location.href); setMessage('Vacancy link copied.'); window.setTimeout(() => setMessage(''), 1800); };
  const hasQuestion = Boolean(job.pre_application_question);
  return <main className="min-h-screen bg-[#f7f9fd] px-6 pb-24 pt-32"><div className="mx-auto max-w-5xl"><button onClick={onCareers} className="inline-flex items-center gap-2 text-sm text-slate-500"><ArrowLeft className="h-4 w-4" /> All vacancies</button><section className="mt-10 rounded-3xl bg-white p-7 shadow-sm sm:p-12"><div className="flex flex-wrap items-center justify-between gap-4"><span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#087FD1]">{job.department}</span><button onClick={share} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><Share2 className="h-4 w-4" /> Share vacancy</button></div><h1 className="mt-6 text-4xl font-light text-[#000741] sm:text-5xl">{job.title}</h1><p className="mt-4 flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4 text-[#087FD1]" /> {job.location} · {job.employment_type}</p><p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">{job.summary}</p><a href="#apply" className="mt-7 inline-flex rounded-xl bg-[#000741] px-7 py-4 text-base font-bold text-white shadow-xl ring-4 ring-blue-100">Apply now</a><div className="mt-12 grid gap-10 md:grid-cols-2"><JobList title="What you’ll do" items={job.responsibilities} /><JobList title="What you’ll bring" items={job.requirements} /></div><div id="apply" className="mt-12 scroll-mt-24 rounded-2xl border-2 border-[#087FD1]/20 bg-slate-50 p-6"><h2 className="text-xl font-semibold text-[#000741]">{hasQuestion ? 'Screening question' : 'Apply for this role'}</h2>{hasQuestion ? <><p className="mt-2 text-sm text-slate-500">Answer the job-specific question below. Your response is sent to the recruitment dashboard for review.</p><label className="mt-6 block text-sm font-semibold text-[#000741]">{job.pre_application_question}</label><textarea value={answer} onChange={(event) => setAnswer(event.target.value)} rows={5} className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm" required /><button onClick={submitScreening} disabled={submitting || !answer.trim()} className="mt-6 rounded-xl bg-[#000741] px-7 py-4 text-base font-bold text-white shadow-xl ring-4 ring-blue-100 disabled:opacity-50">{submitting ? 'Sending response…' : 'Send response'}</button></> : <><p className="mt-2 text-sm text-slate-500">Application method: {job.application_url ? 'external application link' : `email ${job.application_email}`}</p>{job.application_instructions && <p className="mt-4 text-sm leading-6 text-slate-600">{job.application_instructions}</p>}<button onClick={directApply} className="mt-6 rounded-xl bg-[#000741] px-7 py-4 text-base font-bold text-white shadow-xl ring-4 ring-blue-100">{job.application_url ? 'Continue to application' : 'Apply by email'}</button></>}{message && <p className="mt-4 text-sm text-[#087FD1]">{message}</p>}</div></section></div></main>;
}

function JobList({ title, items }) { return <div><h2 className="text-xl font-semibold text-[#000741]">{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#087FD1]" />{item}</li>)}</ul></div>; }
