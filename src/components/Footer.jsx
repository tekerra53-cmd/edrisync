import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { LOGO_URL } from '../constants/site';

const LinkedinIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const TwitterIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const FacebookIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>;

const columns = [
  { title: 'Services', links: ['Cybersecurity', 'GRC & Compliance', 'Microsoft & Digital Workplace', 'Digital Transformation'] },
  { title: 'Company', links: ['About Us', 'Industries', 'Insights', 'Case Studies'] },
];

const serviceKeys = {
  Cybersecurity: 'Cybersecurity',
  'GRC & Compliance': 'GRC & Compliance',
  'Microsoft & Digital Workplace': 'Microsoft & Digital Workplace',
  'Digital Transformation': 'Digital Transformation',
};

const socials = [
  { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { Icon: TwitterIcon, label: 'Twitter', href: 'https://x.com/' },
  { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/' },
];

export default function Footer({ refs }) {
  const navigate = (link) => {
    if (serviceKeys[link]) {
      refs?.goServiceDetail?.(serviceKeys[link]);
    } else if (link === 'About Us') {
      refs?.goAbout?.();
    } else if (link === 'Industries') {
      refs?.goSection?.(refs?.industries);
    } else if (link === 'Insights') {
      refs?.goInsights?.();
    } else if (link === 'Case Studies') {
      refs?.goCaseStudies?.();
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--edri-nav-blue)] px-6 pb-8 pt-16 text-slate-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B1B6CE] to-transparent opacity-80" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-16"
        >
          <div>
            <img src={LOGO_URL} alt="Edrisync" className="h-10 w-auto" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-slate-300">Cybersecurity, governance, Microsoft enablement, and digital transformation for organizations ready to move with confidence.</p>
            <div className="mt-8 space-y-4 text-sm">
              <a href="mailto:info@edrisync.com" className="group flex items-center gap-3 transition-colors hover:text-white"><Mail className="h-4 w-4 text-[#B1B6CE] transition-transform group-hover:-translate-y-0.5" /> info@edrisync.com</a>
              <a href="tel:+980396980" className="group flex items-center gap-3 transition-colors hover:text-white"><Phone className="h-4 w-4 text-[#B1B6CE] transition-transform group-hover:-translate-y-0.5" /> +980 (396) 980</a>
              <span className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#B1B6CE]" /> Lagos, Nigeria</span>
            </div>
            <div className="mt-9 flex items-center gap-2">
              {socials.map(({ Icon, label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all hover:border-[#B1B6CE] hover:bg-[#B1B6CE] hover:text-[#000741]"><Icon className="h-4 w-4" /></a>)}
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B1B6CE]">{column.title}</h3>
              <ul className="mt-7 space-y-4">
                {column.links.map((link) => <li key={link}><button type="button" onClick={() => navigate(link)} className="group flex items-center gap-2 text-left text-sm text-slate-300 transition-colors hover:text-white"><span>{link}</span><ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></button></li>)}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-7 border-b border-white/10 py-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p className="text-lg font-medium tracking-tight text-white">Stay informed, stay ready.</p>
            <p className="mt-2 text-sm text-slate-400">Occasional cybersecurity and GRC insights for decision-makers.</p>
          </div>
          <form className="flex w-full max-w-xl gap-2" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" placeholder="your@company.com" className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#B1B6CE] focus:ring-2 focus:ring-[#B1B6CE]/20" />
            <button type="submit" className="flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#B1B6CE]" style={{ backgroundColor: '#B1B6CE' }}>Subscribe <ArrowUpRight className="h-4 w-4" /></button>
          </form>
        </motion.div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Edrisync Limited. All Rights Reserved.</span>
          <span className="flex flex-wrap gap-4 text-slate-400"><button type="button" onClick={() => refs?.goLegal?.('/privacy-policy')} className="hover:text-white">Privacy Policy</button><button type="button" onClick={() => refs?.goLegal?.('/cookie-policy')} className="hover:text-white">Cookie Policy</button><button type="button" onClick={() => refs?.goLegal?.('/terms-and-conditions')} className="hover:text-white">Terms &amp; Conditions</button></span>
        </div>
      </div>
    </footer>
  );
}
