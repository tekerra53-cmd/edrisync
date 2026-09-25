import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getManagedContent } from '../services/managedContent';

export const defaultPartners = [
  { id: 'partner-1', title: 'Client 1', image: 'https://inotek.themevally.com/wp-content/uploads/2025/11/01.webp', category: 'Partner', website: '', description: '', status: 'Published' },
  { id: 'partner-2', title: 'Client 2', image: 'https://inotek.themevally.com/wp-content/uploads/2025/11/02.webp', category: 'Partner', website: '', description: '', status: 'Published' },
  { id: 'partner-3', title: 'Client 3', image: 'https://inotek.themevally.com/wp-content/uploads/2025/11/03.webp', category: 'Partner', website: '', description: '', status: 'Published' },
  { id: 'partner-4', title: 'Client 4', image: 'https://inotek.themevally.com/wp-content/uploads/2025/11/04.webp', category: 'Partner', website: '', description: '', status: 'Published' },
  { id: 'partner-5', title: 'Client 5', image: 'https://inotek.themevally.com/wp-content/uploads/2025/11/05.webp', category: 'Partner', website: '', description: '', status: 'Published' },
  { id: 'partner-6', title: 'Client 6', image: 'https://inotek.themevally.com/wp-content/uploads/2025/11/06.webp', category: 'Partner', website: '', description: '', status: 'Published' },
];

export default function ClientLogos() {
  const [partners, setPartners] = useState(defaultPartners);
  useEffect(() => { getManagedContent('partners', defaultPartners).then(setPartners); }, []);
  const publishedPartners = partners.filter((partner) => partner.status !== 'Draft');
  return (
    <section
      className="relative overflow-hidden px-0 py-16 sm:py-20"
      style={{ background: 'radial-gradient(circle at 50% 0%, rgba(40, 87, 184, 0.28), transparent 34%), #000741' }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-11 text-center px-6"
      >
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#B1B6CE] font-semibold">
          Trusted by forward-thinking companies worldwide
        </p>
      </motion.div>

      {/* Infinite marquee */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
        }}
      >
        <motion.div
          className="flex shrink-0 items-center gap-6 pr-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
        >
          {[...publishedPartners, ...publishedPartners].map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="group flex h-[94px] w-[208px] shrink-0 items-center justify-center rounded-[22px] border px-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#4FA6FF]/60"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 166, 255, 0.22), rgba(40, 87, 184, 0.18))',
                borderColor: 'rgba(177, 182, 206, 0.26)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 28px rgba(0,0,65,0.22)',
              }}
            >
              <img
                src={logo.image}
                alt={logo.title}
                className="max-h-12 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ opacity: 0.96 }}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Fade divider into next section */}
      <div className="mt-14 max-w-6xl mx-auto border-b border-[#B1B6CE]/20" />
    </section>
  );
}
