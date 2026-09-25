import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Shield, FileCheck, Landmark, Settings, TrendingUp } from 'lucide-react';
import { getManagedContent } from '../services/managedContent';

export const defaultPosts = [
  {
    featured: true,
    category: 'Cybersecurity',
    date: 'Jun 12, 2026',
    readTime: '6 min read',
    title: 'Zero Trust in Practice: Moving Beyond the Checklist',
    excerpt:
      'Distributed workforces demand more than perimeter security. We break down how to design a zero-trust architecture that actually works for your Microsoft environment.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    accent: '#B1B6CE',
  },
  {
    category: 'GRC',
    date: 'May 28, 2026',
    readTime: '4 min read',
    title: 'Regulatory Readiness: Preparing Your Next Audit Without the Panic',
    excerpt:
      'Audits don\'t have to be crisis events. A proactive GRC framework turns compliance into continuous practice.',
    image: 'https://images.unsplash.com/photo-1512758117926-5019c9d0b9b5?auto=format&fit=crop&w=800&q=80',
    accent: '#4ADE80',
  },
  {
    category: 'Microsoft',
    date: 'May 14, 2026',
    readTime: '5 min read',
    title: 'Securing Your Microsoft 365 Investment: A Defender XDR Playbook',
    excerpt:
      'Microsoft 365 delivers productivity, but only if you secure it properly. Practical hardening steps every tenant should ship by default.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    accent: '#B1B6CE',
  },
  {
    category: 'Digital Transformation',
    date: 'Apr 30, 2026',
    readTime: '7 min read',
    title: 'From Paper to Digital: The 4 Stages of Process Maturity',
    excerpt:
      'Moving processes online is step one. True transformation means getting to automated, integrated, and measurable operations.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    accent: '#B1B6CE',
  },
  {
    category: 'Cybersecurity',
    date: 'Apr 09, 2026',
    readTime: '5 min read',
    title: 'Incident Response Planning: Your Tabletop Checklist',
    excerpt:
      'When seconds count, preparation matters. A tested incident response plan can reduce breach costs by over 60%.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80',
    accent: '#4ADE80',
  },
  {
    category: 'GRC',
    date: 'Mar 22, 2026',
    readTime: '4 min read',
    title: 'Data Governance in a Hybrid World: Where to Start',
    excerpt:
      'Data lives everywhere now, across cloud, on-prem, and endpoints. Here\'s a practical framework for governing what you can\'t always see.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    accent: '#B1B6CE',
  },
];

const categoryIcons = {
  Cybersecurity: Shield,
  GRC: FileCheck,
  Microsoft: Landmark,
  'Digital Transformation': Settings,
};

function PostCard({ post, index }) {
  const CatIcon = categoryIcons[post.category] || TrendingUp;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300"
      style={{ border: '1px solid rgba(4,7,32,0.07)', boxShadow: '0 8px 30px rgba(4,7,32,0.06)' }}
    >
      <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(177,182,206,0.12), rgba(168,213,186,0.12))' }}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-full text-white flex items-center gap-1.5"
          style={{ backgroundColor: post.accent }}
        >
          <CatIcon className="w-3 h-3" />
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
        <h3 className="text-lg font-bold leading-snug mb-2 group-hover:text-[#B1B6CE] transition-colors" style={{ color: '#000741' }}>
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B1B6CE]">
          Read article
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}

export default function InsightsPage({ onHome }) {
  const [managedPosts, setManagedPosts] = useState(defaultPosts);

  useEffect(() => {
    getManagedContent('insights', defaultPosts).then(setManagedPosts);
  }, []);

  const [featured, ...rest] = managedPosts;

  return (
    <div style={{ backgroundColor: '#ffffff' }} className="min-h-screen">
      {/* Header */}
      <header className="relative pt-32 pb-14 px-6 overflow-hidden" style={{ backgroundColor: '#000741' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(177,182,206,0.45), transparent 45%), radial-gradient(circle at 85% 60%, rgba(168,213,186,0.35), transparent 45%)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </button>
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-3" style={{ color: '#B1B6CE' }}>
            Insights
          </p>
          <h1 className="text-4xl lg:text-[2.8rem] font-light leading-tight text-white">
            Cybersecurity. Compliance. Microsoft. <span className="font-medium">Digital business.</span>
          </h1>
          <p className="text-white/70 mt-4 max-w-xl leading-relaxed">
            Practical perspectives on cybersecurity risk, GRC compliance, Microsoft enablement, and digital transformation, connecting technology decisions to business outcomes.
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
          style={{ border: '1px solid rgba(4,7,32,0.07)', boxShadow: '0 12px 40px rgba(4,7,32,0.08)' }}
        >
          <div className="relative h-64 lg:h-auto overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(177,182,206,0.12), rgba(168,213,186,0.12))' }}>
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
            <h2 className="text-2xl lg:text-3xl font-bold leading-snug mb-3 group-hover:text-[#B1B6CE] transition-colors" style={{ color: '#000741' }}>
              {featured.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#B1B6CE]">
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
