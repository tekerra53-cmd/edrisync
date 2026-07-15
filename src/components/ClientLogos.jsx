import { motion } from 'framer-motion';

const logos = [
  { src: 'https://inotek.themevally.com/wp-content/uploads/2025/11/01.webp', name: 'Client 1' },
  { src: 'https://inotek.themevally.com/wp-content/uploads/2025/11/02.webp', name: 'Client 2' },
  { src: 'https://inotek.themevally.com/wp-content/uploads/2025/11/03.webp', name: 'Client 3' },
  { src: 'https://inotek.themevally.com/wp-content/uploads/2025/11/04.webp', name: 'Client 4' },
  { src: 'https://inotek.themevally.com/wp-content/uploads/2025/11/05.webp', name: 'Client 5' },
  { src: 'https://inotek.themevally.com/wp-content/uploads/2025/11/06.webp', name: 'Client 6' },
];

export default function ClientLogos() {
  return (
    <section
      className="relative py-14 px-0 overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #061153 0%, #0a1640 55%, #061153 100%)' }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 px-6"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-white/70 font-medium">
          Trusted by forward-thinking companies worldwide
        </p>
      </motion.div>

      {/* Infinite marquee */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <motion.div
          className="flex shrink-0 items-center gap-x-16 pr-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-11 w-auto object-contain shrink-0 transition-transform duration-300 hover:scale-110"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
              draggable={false}
            />
          ))}
        </motion.div>
      </div>

      {/* Fade divider into next section */}
      <div className="mt-12 max-w-6xl mx-auto border-b border-white/10" />
    </section>
  );
}
