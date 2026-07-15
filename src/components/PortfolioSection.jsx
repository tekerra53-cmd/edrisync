import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Webx – Website Development',
    category: 'DEVELOPMENT',
    desc: 'A modern, high-performance website build delivered for Theme-Vally, showcasing clean architecture and conversion-focused design.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm2-img01.webp',
    link: '#',
  },
  {
    title: 'Care – 3D Beauty Mockup',
    category: 'BUSINESS',
    desc: 'A creative 3D beauty mockup concept crafted to bring a brand’s product story to life with realistic, eye-catching detail.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm2-img02.webp',
    link: '#',
  },
  {
    title: 'Booky – Book Cover Design',
    category: 'DESIGNING',
    desc: 'An editorial book cover design blending typography and visual narrative for a polished, market-ready publishing asset.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm3-img03.webp',
    link: '#',
  },
  {
    title: 'Pack – Coffee Mug Design',
    category: 'DEVELOPMENT',
    desc: 'A branded coffee mug packaging concept developed to extend a creative agency’s identity into physical merchandise.',
    image: 'https://edrisync.com/myapp/wp-content/uploads/2025/11/hm3-img04.webp',
    link: '#',
  },
];

export default function PortfolioSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.28em] font-medium" style={{ color: '#B1B6CE' }}>
            Projects
          </p>
          <h2 className="text-4xl lg:text-[2.75rem] font-light mt-4" style={{ color: '#061153', fontFamily: 'var(--font-family-heading)' }}>
            We've successfully completed
            <br />
            <span className="font-medium">creative projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden mb-5" style={{ boxShadow: '0 8px 32px rgba(6,17,83,0.08)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  draggable={false}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(6,17,83,0.85))' }}
                >
                  <span className="text-white text-xs font-semibold uppercase tracking-[0.15em] flex items-center gap-1.5">
                    View Case Study
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="text-xs uppercase tracking-[0.15em] mb-2 font-medium" style={{ color: '#007dc1' }}>
                {project.category}
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#061153' }}>
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {project.desc}
              </p>
              <a
                href={project.link}
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: '#B1B6CE' }}
              >
                Read more
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 duration-200" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            className="flex items-center gap-2 bg-white rounded-xl px-8 py-4 font-semibold text-sm transition-all duration-200 min-h-[52px] shadow-xl hover:shadow-2xl"
            style={{ color: '#061153', backgroundColor: '#B1B6CE' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9ca3b8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B1B6CE')}
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
