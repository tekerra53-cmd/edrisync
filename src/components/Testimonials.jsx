import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'EDRISYNC helped us design and implement a security-first Microsoft environment while keeping us audit-ready. Our risk profile dropped by 60% within the first year, and we closed two compliance audits with zero findings.',
    author: 'Sarah Chen',
    role: 'Head of Information Security',
    company: 'Enterprise technology organization',
  },
  {
    quote: "From paper-based processes to a fully automated digital workflow, EDRISYNC transformed how we operate. They didn't just implement tools, they changed how our teams work.",
    author: 'Marcus Okello',
    role: 'Operations Director',
    company: 'Growing professional services firm',
  },
  {
    quote: 'The integrated approach was exactly what we needed. EDRISYNC connected our Microsoft migration, security controls, and compliance framework into one seamless roadmap, all delivered on time and on budget.',
    author: 'Aisha Patel',
    role: 'Finance Director',
    company: 'Regulated financial services group',
  },
  {
    quote: 'EDRISYNC gave our leadership team a clear view of risk and a practical plan for addressing it. The work was structured, transparent, and grounded in the realities of our business.',
    author: 'David Mensah',
    role: 'Chief Operating Officer',
    company: 'Regional logistics company',
  },
  {
    quote: 'The new Microsoft workplace is easier to manage and far easier for our teams to use. Adoption improved quickly because the solution was designed around the way people work.',
    author: 'Nadia Williams',
    role: 'People and Technology Lead',
    company: 'Multi-site healthcare provider',
  },
  {
    quote: 'We moved from disconnected manual steps to a process we can measure and improve. EDRISYNC stayed close to our team throughout delivery and made the change feel achievable.',
    author: 'Emeka Okafor',
    role: 'Transformation Manager',
    company: 'Professional services organization',
  },
];

export default function Testimonials({ sectionRef }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = testimonials[activeIndex];

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => move(1), 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section ref={sectionRef} className="bg-[#ffffff] px-6 py-24 sm:py-28" style={{ scrollMarginTop: '120px' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3"><span className="h-px w-10 bg-[#087fd1]" /><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#087fd1]">Client outcomes</p></div>
            <h2 className="mt-5 max-w-md text-4xl font-light leading-[1.08] text-[#040720] sm:text-5xl">Client success stories that prove the impact.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">Hear from organizations that trust EDRISYNC to deliver reliable, secure, and measurable technology outcomes.</p>
            <div className="mt-10 flex items-center gap-3">
              <button onClick={() => move(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 shadow-sm transition-colors hover:border-[#B1B6CE]" style={{ backgroundColor: '#ffffff', color: '#040720' }}><ArrowLeft className="h-4 w-4" /></button>
              <button onClick={() => move(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-[#040720]" style={{ backgroundColor: '#040720', color: '#ffffff' }}><ArrowRight className="h-4 w-4" /></button>
              <span className="ml-2 text-xs font-semibold tracking-[0.18em] text-slate-400">0{activeIndex + 1} / 0{testimonials.length}</span>
            </div>
          </motion.div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(4,7,32,0.07)] sm:p-10" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)}>
            <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-5"><span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#087fd1]">Client perspective</span><span className={`flex items-center gap-2 text-xs ${isPaused ? 'text-[#087fd1]' : 'text-slate-400'}`}><span className={`h-2 w-2 rounded-full ${isPaused ? 'bg-[#087fd1]' : 'bg-[#A8D5BA]'}`} />{isPaused ? 'Paused' : 'Rotating'}</span></div>
            <AnimatePresence mode="wait">
              <motion.figure key={active.author} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
                <Quote className="mb-7 h-8 w-8 text-[#B1B6CE]" strokeWidth={1.5} />
                <blockquote className="max-w-4xl text-xl font-light leading-relaxed text-[#040720] sm:text-2xl">“{active.quote}”</blockquote>
                <figcaption className="mt-9">
                  <p className="text-base font-semibold text-[#040720]">{active.author}</p>
                  <p className="mt-1 text-sm text-slate-500">{active.role}</p>
                  <p className="text-sm text-slate-400">{active.company}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="mt-12 flex items-center justify-between gap-5" role="tablist" aria-label="Testimonials">
              <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button key={testimonial.author} onClick={() => setActiveIndex(index)} role="tab" aria-selected={activeIndex === index} aria-label={`Show testimonial ${index + 1}`} className={`h-2.5 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-[#040720]' : 'w-2.5 bg-slate-300 hover:bg-[#B1B6CE]'}`} />
              ))}
              </div>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100"><div key={activeIndex} className="testimonial-progress h-full rounded-full bg-[#A8D5BA]" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
