import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

const posts = [
  {
    featured: true,
    category: 'Cloud',
    date: 'Jun 12, 2026',
    readTime: '6 min read',
    title: '5 Ways Cloud Workspaces Are Reshaping Remote Teams',
    excerpt:
      'Distributed teams are no longer the exception. We break down how modern cloud workspaces remove friction, improve security, and keep everyone aligned — no matter where they log in from.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    accent: '#1053F3',
  },
  {
    category: 'Automation',
    date: 'May 28, 2026',
    readTime: '4 min read',
    title: 'Automating the Boring: A Practical Guide to Business Process Automation',
    excerpt:
      'Repetitive work quietly drains your team. Learn how to spot the right processes to automate and roll them out without disrupting delivery.',
    image: 'https://images.unsplash.com/photo-1512758117926-5019c9d0b9b5?auto=format&fit=crop&w=800&q=80',
    accent: '#6b2cf5',
  },
  {
    category: 'Design',
    date: 'May 14, 2026',
    readTime: '5 min read',
    title: 'UI/UX Trends That Will Define 2026',
    excerpt:
      'From calm interfaces to motion that means something, here are the design directions worth adopting this year.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    accent: '#007dc1',
  },
  {
    category: 'Strategy',
    date: 'Apr 30, 2026',
    readTime: '7 min read',
    title: 'How Nigerian Startups Are Scaling With the Right Tech Stack',
    excerpt:
      'A look at the pragmatic architecture choices helping fast-growing teams move quickly without accumulating debt.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    accent: '#1053F3',
  },
  {
    category: 'Security',
    date: 'Apr 09, 2026',
    readTime: '5 min read',
    title: 'Security First: Protecting Your Digital Workspace',
    excerpt:
      'Your workspace is only as safe as its weakest setting. Practical hardening steps every business should ship by default.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80',
    accent: '#6b2cf5',
  },
  {
    category: 'Web',
    date: 'Mar 22, 2026',
    readTime: '4 min read',
    title: 'Choosing Between Framer, Webflow and Shopify for Your Brand',
    excerpt:
      'Three great tools, three very different jobs. A clear framework for picking the one that fits your goals.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    accent: '#007dc1',
  },
];

function PostCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300"
      style={{ border: '1px solid rgba(6,17,83,0.07)', boxShadow: '0 8px 30px rgba(6,17,83,0.06)' }}
    >
      <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(16,83,243,0.12), rgba(0,125,193,0.12))' }}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: post.accent }}
        >
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-[#1053F3] transition-colors" style={{ color: '#0a1628' }}>
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1053F3]">
          Read article
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage({ onHome }) {
  const [featured, ...rest] = posts;

  return (
    <div style={{ backgroundColor: '#f8f9fa' }} className="min-h-screen">
      {/* Header */}
      <header className="relative pt-32 pb-14 px-6 overflow-hidden" style={{ backgroundColor: '#061153' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(16,83,243,0.45), transparent 45%), radial-gradient(circle at 85% 60%, rgba(0,125,193,0.35), transparent 45%)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-3" style={{ color: '#7fa8ff' }}>
            Blog
          </p>
          <h1 className="text-4xl lg:text-[2.8rem] font-light leading-tight text-white">
            Insights, ideas &amp; <span className="font-medium">updates</span>
          </h1>
          <p className="text-white/70 mt-4 max-w-xl leading-relaxed">
            Practical perspectives on cloud, automation, design and the technology shaping modern, digital-first businesses.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Featured post */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -6 }}
          className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-2 transition-shadow duration-300"
          style={{ border: '1px solid rgba(6,17,83,0.07)', boxShadow: '0 12px 40px rgba(6,17,83,0.08)' }}
        >
          <div className="relative h-64 lg:h-auto overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(16,83,243,0.12), rgba(0,125,193,0.12))' }}>
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = 'none')}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className="absolute top-5 left-5 text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: featured.accent }}
            >
              Featured · {featured.category}
            </span>
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
              <span>{featured.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {featured.readTime}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold leading-snug mb-3 group-hover:text-[#1053F3] transition-colors" style={{ color: '#0a1628' }}>
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#1053F3]">
              Read article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.article>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {rest.map((post, i) => (
            <PostCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
