import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Cloud,
  FileCheck2,
  Gauge,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

function BackLink({ onServices, light = false }) {
  return (
    <button
      onClick={onServices}
      className={`inline-flex items-center gap-2 text-sm transition-colors ${light ? 'text-white/65 hover:text-white' : 'text-slate-500 hover:text-slate-950'}`}
    >
      <ArrowLeft className="h-4 w-4" /> All services
    </button>
  );
}

function CapabilityCard({ capability, index, service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative min-h-[168px] overflow-hidden rounded-2xl border border-slate-200 bg-[#f8faff] p-6 transition-colors hover:border-[#8bd3ff]"
    >
      <img src={service.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-[#153b7d]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 mb-8 flex items-center justify-end">
        <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
      <h3 className="relative z-10 font-semibold text-[#061153] transition-colors duration-300 group-hover:text-white">{capability}</h3>
    </motion.div>
  );
}

function OutcomeItem({ outcome, index, service }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-3 border-t border-slate-200 pt-4"
    >
      <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: service.color }} />
      <p className="text-sm leading-relaxed text-slate-600">{outcome}</p>
    </motion.div>
  );
}

function ProcessBand({ service, title, subtitle }) {
  return (
    <section className="bg-[#061153] px-6 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[.28em]" style={{ color: service.accent }}>How we work</span>
          <h2 className="mt-4 text-4xl font-light">{title}</h2>
          <p className="mt-5 text-white/60">{subtitle}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {service.phases.map((phase, index) => (
            <div key={phase} className="relative border-t border-white/20 pt-5">
              <h3 className="text-xl font-medium">{phase}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">A focused stage with a clear decision, useful output, and visible progress.</p>
              {index < service.phases.length - 1 && <ArrowRight className="absolute right-0 top-5 hidden h-5 w-5 text-white/30 md:block" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ service, onHome, title, body }) {
  return (
    <section className="px-6 py-20 text-center lg:py-28">
      <Network className="mx-auto h-8 w-8" style={{ color: service.color }} />
      <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-light">{title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-slate-600">{body}</p>
      <button
        onClick={onHome}
        className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-1"
        style={{ backgroundColor: service.color }}
      >
        Start a conversation <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}

function GRCLayoutPro({ service, onServices, onHome }) {
  const Icon = service.icon;
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#061153]">
      <header className="relative overflow-hidden bg-[#061153] px-6 pb-20 pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,83,243,0.35),transparent_40%),radial-gradient(circle_at_30%_100%,rgba(0,125,193,0.2),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All services
          </button>
          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]" style={{ color: service.accent }}>
                <Icon className="h-4 w-4" /> {service.eyebrow}
              </div>
              <h1 className="max-w-2xl text-4xl font-light leading-[1.06] text-white sm:text-5xl lg:text-[4.4rem]">{service.title}</h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{service.intro}</p>
              <button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="mt-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>
                Explore this service <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="relative overflow-hidden rounded-[28px] bg-[#102d72] shadow-[0_24px_70px_rgba(6,17,83,0.18)]">
                <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#061153] via-[#061153]/30 to-transparent" />
                <div className="absolute bottom-7 left-7 max-w-xs text-white">
                  <Sparkles className="mb-3 h-5 w-5" style={{ color: service.accent }} />
                  <p className="text-lg font-medium leading-snug">One connected program. Clearer outcomes.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main id="service-start">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The Edrisync approach</span>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Technology that connects to the way your business really works.</h2>
            <p className="mt-6 leading-relaxed text-slate-600">{service.description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] bg-[#102d72] shadow-[0_24px_70px_rgba(6,17,83,0.18)]">
            <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#061153] via-[#061153]/30 to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-xs text-white">
              <Sparkles className="mb-3 h-5 w-5" style={{ color: service.accent }} />
              <p className="text-lg font-medium leading-snug">One connected program. Clearer outcomes.</p>
            </div>
          </motion.div>
        </section>

        <section className="bg-white px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>What we deliver</span>
              <h2 className="mt-4 text-3xl font-light sm:text-4xl">Capability built around your next move.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((capability, index) => (
                <CapabilityCard key={capability} capability={capability} index={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The outcome</span>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Built to make progress visible.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.outcomes.map((outcome, index) => (
                <OutcomeItem key={outcome} outcome={outcome} index={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#061153] px-6 py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>How we work</span>
              <h2 className="mt-4 text-3xl font-light sm:text-4xl">A practical path from first signal to lasting capability.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {service.phases.map((phase, index) => (
                <div key={phase} className="relative border-t border-white/20 pt-5">
                  <h3 className="text-xl font-medium">{phase}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">A focused stage with clear decisions, useful artefacts, and measurable progress.</p>
                  {index < service.phases.length - 1 && <ArrowRight className="absolute right-0 top-5 hidden h-5 w-5 text-white/30 md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 text-center lg:py-28">
          <ShieldCheck className="mx-auto mb-5 h-8 w-8" style={{ color: service.color }} />
          <h2 className="mx-auto max-w-2xl text-3xl font-light sm:text-4xl">Ready to make this service work for your organization?</h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-600">Let's talk through where you are, what is changing, and the next practical step.</p>
          <button
            onClick={onHome}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#153b7d] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start a conversation <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    </div>
  );
}

function MicrosoftLayoutPro({ service, onServices, onHome }) {
  const Icon = service.icon;
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#061153]">
      <header className="relative overflow-hidden bg-[#061153] px-6 pb-20 pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,83,243,0.35),transparent_40%),radial-gradient(circle_at_30%_100%,rgba(0,125,193,0.2),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All services
          </button>
          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]" style={{ color: service.accent }}>
                <Icon className="h-4 w-4" /> {service.eyebrow}
              </div>
              <h1 className="max-w-2xl text-4xl font-light leading-[1.06] text-white sm:text-5xl lg:text-[4.4rem]">{service.title}</h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{service.intro}</p>
              <button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="mt-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>
                Explore this service <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="relative overflow-hidden rounded-[28px] bg-[#102d72] shadow-[0_24px_70px_rgba(6,17,83,0.18)]">
                <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#061153] via-[#061153]/30 to-transparent" />
                <div className="absolute bottom-7 left-7 max-w-xs text-white">
                  <Cloud className="mb-3 h-5 w-5" style={{ color: service.accent }} />
                  <p className="text-lg font-medium leading-snug">Secure. Connected. Adopted.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main id="service-start">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The Edrisync approach</span>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Technology that connects to the way your business really works.</h2>
            <p className="mt-6 leading-relaxed text-slate-600">{service.description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] bg-[#102d72] shadow-[0_24px_70px_rgba(6,17,83,0.18)]">
            <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#061153] via-[#061153]/30 to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-xs text-white">
              <Cloud className="mb-3 h-5 w-5" style={{ color: service.accent }} />
              <p className="text-lg font-medium leading-snug">Secure. Connected. Adopted.</p>
            </div>
          </motion.div>
        </section>

        <section className="bg-white px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>What we deliver</span>
              <h2 className="mt-4 text-3xl font-light sm:text-4xl">Capability built around your next move.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((capability, index) => (
                <CapabilityCard key={capability} capability={capability} index={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The outcome</span>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Built to make progress visible.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.outcomes.map((outcome, index) => (
                <OutcomeItem key={outcome} outcome={outcome} index={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#061153] px-6 py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>How we work</span>
              <h2 className="mt-4 text-3xl font-light sm:text-4xl">A practical path from first signal to lasting capability.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {service.phases.map((phase, index) => (
                <div key={phase} className="relative border-t border-white/20 pt-5">
                  <h3 className="text-xl font-medium">{phase}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">A focused stage with clear decisions, useful artefacts, and measurable progress.</p>
                  {index < service.phases.length - 1 && <ArrowRight className="absolute right-0 top-5 hidden h-5 w-5 text-white/30 md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 text-center lg:py-28">
          <Cloud className="mx-auto mb-5 h-8 w-8" style={{ color: service.color }} />
          <h2 className="mx-auto max-w-2xl text-3xl font-light sm:text-4xl">Ready to make this service work for your organization?</h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-600">Let's talk through where you are, what is changing, and the next practical step.</p>
          <button
            onClick={onHome}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#153b7d] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start a conversation <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    </div>
  );
}

function DigitalTransformationLayoutPro({ service, onServices, onHome }) {
  const Icon = service.icon;
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#061153]">
      <header className="relative overflow-hidden bg-[#061153] px-6 pb-20 pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,83,243,0.35),transparent_40%),radial-gradient(circle_at_30%_100%,rgba(0,125,193,0.2),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <button onClick={onServices} className="mb-10 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All services
          </button>
          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]" style={{ color: service.accent }}>
                <Icon className="h-4 w-4" /> {service.eyebrow}
              </div>
              <h1 className="max-w-2xl text-4xl font-light leading-[1.06] text-white sm:text-5xl lg:text-[4.4rem]">{service.title}</h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{service.intro}</p>
              <button onClick={() => document.getElementById('service-start')?.scrollIntoView({ behavior: 'smooth' })} className="mt-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ backgroundColor: service.color }}>
                Explore this service <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="relative overflow-hidden rounded-[28px] bg-[#102d72] shadow-[0_24px_70px_rgba(6,17,83,0.18)]">
                <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#061153] via-[#061153]/30 to-transparent" />
                <div className="absolute bottom-7 left-7 max-w-xs text-white">
                  <Workflow className="mb-3 h-5 w-5" style={{ color: service.accent }} />
                  <p className="text-lg font-medium leading-snug">Connected processes. Measurable momentum.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main id="service-start">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The Edrisync approach</span>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Technology that connects to the way your business really works.</h2>
            <p className="mt-6 leading-relaxed text-slate-600">{service.description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[28px] bg-[#102d72] shadow-[0_24px_70px_rgba(6,17,83,0.18)]">
            <img src={service.image} alt={`${service.eyebrow} in practice`} className="h-[340px] w-full object-cover opacity-70 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#061153] via-[#061153]/30 to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-xs text-white">
              <Workflow className="mb-3 h-5 w-5" style={{ color: service.accent }} />
              <p className="text-lg font-medium leading-snug">Connected processes. Measurable momentum.</p>
            </div>
          </motion.div>
        </section>

        <section className="bg-white px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>What we deliver</span>
              <h2 className="mt-4 text-3xl font-light sm:text-4xl">Capability built around your next move.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((capability, index) => (
                <CapabilityCard key={capability} capability={capability} index={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.color }}>The outcome</span>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">Built to make progress visible.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.outcomes.map((outcome, index) => (
                <OutcomeItem key={outcome} outcome={outcome} index={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#061153] px-6 py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: service.accent }}>How we work</span>
              <h2 className="mt-4 text-3xl font-light sm:text-4xl">A practical path from first signal to lasting capability.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {service.phases.map((phase, index) => (
                <div key={phase} className="relative border-t border-white/20 pt-5">
                  <h3 className="text-xl font-medium">{phase}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">A focused stage with clear decisions, useful artefacts, and measurable progress.</p>
                  {index < service.phases.length - 1 && <ArrowRight className="absolute right-0 top-5 hidden h-5 w-5 text-white/30 md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 text-center lg:py-28">
          <Workflow className="mx-auto mb-5 h-8 w-8" style={{ color: service.color }} />
          <h2 className="mx-auto max-w-2xl text-3xl font-light sm:text-4xl">Ready to make this service work for your organization?</h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-600">Let's talk through where you are, what is changing, and the next practical step.</p>
          <button
            onClick={onHome}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#153b7d] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Start a conversation <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    </div>
  );
}

export { GRCLayoutPro, MicrosoftLayoutPro, DigitalTransformationLayoutPro };
