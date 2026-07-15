import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { LOGO_URL } from '../constants/site';

// Custom SVG social icons (brand icons removed from lucide-react v1+)
const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>
  </svg>
);
const PinterestIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.98 9.1-.08-.77-.16-1.96.03-2.8.18-.76 1.15-4.85 1.15-4.85s-.29-.59-.29-1.46c0-1.37.79-2.39 1.78-2.39.84 0 1.25.63 1.25 1.39 0 .85-.54 2.11-.82 3.28-.23.98.49 1.78 1.46 1.78 1.75 0 3.1-1.85 3.1-4.51 0-2.36-1.7-4.01-4.12-4.01-2.81 0-4.46 2.1-4.46 4.28 0 .85.33 1.76.74 2.25.08.1.09.19.07.29l-.27 1.12c-.04.18-.14.22-.32.13-1.19-.55-1.93-2.29-1.93-3.68 0-2.99 2.17-5.74 6.27-5.74 3.29 0 5.85 2.35 5.85 5.48 0 3.27-2.06 5.9-4.92 5.9-1.96 0-3.41-1.62-2.94-3.61.56-2.37 2.06-4.93 2.06-6.64 0-1.53-.82-2.8-2.53-2.8-2 0-3.61 1.66-3.61 3.88 0 1.42.57 2.94.57 2.94l-2.3 9.65c-.66 2.78-.1 6.2-.05 6.54.03.2.28.25.4.1.17-.22 2.25-2.79 2.96-5.37.2-.73.95-3.56.95-3.56.47 1.06.98 2.26.98 2.26.85 1.64 2.96 2.49 5.11 2.49 4.85 0 8.5-4.32 8.5-9.46C22 6.38 17.63 2 12 2z"/>
  </svg>
);

const footerLinks = {
  Services: ['Web Development', 'UI/UX Design', 'Digital Marketing', 'Networking', 'Hosting'],
  Company: ['About Us', 'Our Team', 'Latest Blog', 'Contact Us', 'Career'],
  Legal: ['Privacy Policy', 'Return and Refund Policy', 'Terms of Service'],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#061153', color: '#cbd5e1' }} className="pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14"
          style={{ borderBottom: '1px solid rgba(177, 182, 206, 0.14)' }}
        >
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src={LOGO_URL}
                alt="Edrisync"
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
                draggable={false}
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-[240px]">
              Innovative IT Solutions. World's leading business agency helping teams work smarter and safer.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-gray-300 text-sm">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(0,125,193,0.18)' }}>
                  <Phone className="w-4 h-4" style={{ color: '#7fd0ff' }} />
                </span>
                <span>+980 (396) 980</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300 text-sm">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(0,125,193,0.18)' }}>
                  <Mail className="w-4 h-4" style={{ color: '#7fd0ff' }} />
                </span>
                <span>info@edrisync.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300 text-sm">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(0,125,193,0.18)' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#7fd0ff' }} />
                </span>
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-7">
              {[
                { Icon: LinkedinIcon, label: 'LinkedIn' },
                { Icon: TwitterIcon, label: 'Twitter' },
                { Icon: FacebookIcon, label: 'Facebook' },
                { Icon: PinterestIcon, label: 'Pinterest' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-300 text-sm hover:text-white transition-colors duration-200 block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Newsletter strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderBottom: '1px solid rgba(177, 182, 206, 0.14)' }}
        >
          <div>
            <p className="text-white text-sm font-medium">Stay ahead of the curve.</p>
            <p className="text-gray-300 text-xs mt-1">Monthly IT insights, no fluff.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@company.com"
              className="bg-white/5 border text-white text-sm px-4 py-2.5 rounded-lg outline-none flex-1 sm:w-56 placeholder-gray-400 focus:border-[#007dc1] transition-colors"
              style={{ borderColor: 'rgba(177, 182, 206, 0.25)' }}
            />
            <button
              className="flex items-center gap-1.5 text-white text-sm px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
              style={{ backgroundColor: '#007dc1' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0069a8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007dc1')}
            >
              Subscribe
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 text-xs text-gray-400">
          <span>© 2026 Edrisync Limited. All Rights Reserved.</span>
          <span>Design by Theme-vally.</span>
        </div>
      </div>
    </footer>
  );
}
