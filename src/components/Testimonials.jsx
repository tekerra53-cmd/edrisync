import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Creates purposeful mobile solutions connecting core business goals and specified market audiences efficiently.',
    author: 'Jubin Nawtail',
    role: 'App Developer',
    avatar: 'https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-testi01.webp',
    rating: 4.5,
  },
  {
    quote:
      'Optimizes strategic online visibility that aligns brands with profitable search audiences and business goals.',
    author: 'Apel Mahmud',
    role: 'SEO Marketer',
    avatar: 'https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-testi05.webp',
    rating: 5,
  },
  {
    quote:
      'Designs thoughtful interface systems linking business identity to engaging user journeys across platforms.',
    author: 'Robert L. Smith',
    role: 'UI/UX Designer',
    avatar: 'https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-testi03.webp',
    rating: 5,
  },
];

function Stars({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />;
        }
        if (i === full && hasHalf) {
          return (
            <span key={i} className="relative inline-block w-4 h-4">
              <Star className="absolute inset-0 w-4 h-4 text-amber-400" />
              <span className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </span>
            </span>
          );
        }
        return <Star key={i} className="w-4 h-4 text-amber-400" />;
      })}
    </div>
  );
}

export default function Testimonials({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      className="py-28 px-6"
      style={{ background: 'linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.28em] font-medium" style={{ color: '#007dc1' }}>
            Testimonial
          </p>
          <h2 className="text-4xl lg:text-[2.75rem] font-light mt-4" style={{ color: '#0a1628' }}>
            Helping business in 3,000+ industries.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-8 flex flex-col cursor-default transition-shadow duration-300 hover:shadow-2xl"
              style={{
                boxShadow: '0 2px 20px rgba(10,22,40,0.07)',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <Stars rating={t.rating} />

              {/* Quote mark */}
              <div
                className="text-7xl font-serif leading-none select-none mb-2"
                style={{ color: '#007dc1', opacity: 0.15, lineHeight: 0.8 }}
              >
                "
              </div>

              {/* Quote */}
              <p className="text-[#0a1628] text-base leading-relaxed flex-1" style={{ marginTop: '-8px' }}>
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0a1628' }}>{t.author}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Trusted by{' '}
            <strong className="text-gray-700">3,000+</strong> clients worldwide across{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline" style={{ color: '#007dc1' }}>
              different industries
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
