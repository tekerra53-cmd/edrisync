import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Shield, FileCheck, Landmark, Settings, TrendingUp, X } from 'lucide-react';
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
    content: `Zero Trust is often presented as a product or a checklist. In practice, it is a way of making access decisions using evidence about identity, device health, context, and the sensitivity of the resource being requested. That makes it especially useful for organisations whose people and systems no longer sit behind one office network.

Start by mapping the applications and data that matter most. Identify who needs access, from which devices, and under what conditions. Enforce multi-factor authentication, remove standing privileges where possible, and use conditional access to respond to risk rather than treating every sign-in as equally trustworthy.

The next step is to make device and workload signals part of the decision. A managed, compliant device can receive a different level of access from an unknown or out-of-date endpoint. In a Microsoft environment, identity, endpoint, and security signals can be brought together to strengthen those decisions.

Roll out changes in stages: observe current access patterns, pilot policies with a small group, resolve legitimate exceptions, and expand gradually. Measure outcomes such as risky sign-ins blocked, unmanaged devices restricted, and time taken to revoke access. Zero Trust is a continuous operating model: review the policies as the organisation, its threats, and its technology change.`,
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
    content: `Audit readiness is easier when evidence is produced by everyday work instead of assembled in a last-minute rush. Begin with the obligations that apply to your organisation and translate each one into a clear control, an accountable owner, and evidence that can be reviewed.

Create a simple evidence register. For each control, record where the evidence lives, how often it is refreshed, who reviews it, and what would count as a failure. Keep the register practical: the goal is to make gaps visible early, not to create another layer of paperwork.

Run a readiness review before the formal audit. Sample the evidence, check that approvals and dates are present, and speak with control owners about how the process works in practice. Where a gap appears, record the risk, agree an owner and due date, and retain proof of remediation.

After the audit, capture recurring findings and use them to improve the control environment. A consistent cycle of ownership, evidence, review, and remediation reduces surprises and helps compliance become part of normal operations.`,
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
    content: `A secure Microsoft 365 environment starts with identity. Require strong authentication, protect privileged accounts, review administrator roles regularly, and use conditional access policies that reflect the sensitivity of each workload.

Next, establish a baseline for devices and collaboration. Keep endpoints managed and up to date, restrict legacy authentication, and review external sharing in SharePoint, OneDrive, and Teams. Make sure users can report suspicious messages and know how to handle unexpected requests for credentials or payment.

Defender XDR can help bring signals from endpoints, identities, email, and cloud applications into one incident view. The value comes from configuring the tools around your response process: decide who triages alerts, how incidents are escalated, and which actions can be automated safely.

Prioritise improvements by risk and validate them with regular reviews. Track coverage, investigate exceptions, and test the response workflow. Security settings are most effective when they are maintained as the tenant and the organisation evolve.`,
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
    content: `Digitising a paper process is a useful beginning, but it does not automatically make the work faster or easier. Process maturity grows when teams reduce unnecessary steps, connect information between systems, and use data to improve how work is done.

Start by understanding the current process from the people who use it. Record hand-offs, delays, rework, approvals, and the information needed at each step. Agree on what success means before choosing a platform: for example, shorter turnaround time, fewer errors, or better visibility for customers.

Then simplify the process before automating it. Introduce a consistent digital workflow, clarify ownership, and connect the systems that hold the required information. Automate repetitive steps only after exceptions and controls are understood.

Finally, measure the results and keep improving. Use a small set of operational measures, review them with process owners, and make it easy for staff to report friction. Sustainable transformation is a sequence of practical changes, supported by people, governance, and technology.`,
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
    content: `An incident response plan should help people make good decisions under pressure. Keep the first version clear and usable: define who can declare an incident, who leads the response, how specialists are contacted, and how decisions are recorded.

Prepare playbooks for the scenarios most relevant to your organisation, such as a compromised account, ransomware, or loss of a critical service. Each playbook should include containment options, evidence-preservation steps, communication responsibilities, and the criteria for involving external support.

Tabletop exercises test the plan without disrupting production. Give participants a realistic scenario, introduce new information as the exercise unfolds, and observe how decisions and hand-offs happen. Focus on finding unclear responsibilities and missing access to essential tools rather than judging individuals.

After each exercise or real incident, document what worked, what caused delay, and which changes have owners and deadlines. Revisit the plan when systems, suppliers, or responsibilities change so responders can rely on it when it matters.`,
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
    content: `Data governance in a hybrid environment begins with knowing what information the organisation holds and why it matters. Start with the important data domains and systems, then identify business owners, sensitivity, retention requirements, and the people or services that need access.

Use consistent classification and access rules across cloud and on-premises locations. Review broad permissions, remove access that is no longer needed, and make ownership clear when data is copied or shared between platforms. The right controls depend on the data's purpose and risk, not only on where it is stored.

Build governance into routine processes such as onboarding, project approval, procurement, and system changes. This creates opportunities to assess new data use before it becomes difficult to track. Monitoring and periodic access reviews can then help identify drift.

Keep the framework proportionate. Begin with high-impact data, assign accountable owners, and measure whether classification, access reviews, and retention actions are actually happening. Expand coverage as the organisation improves its visibility and control.`,
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

function PostCard({ post, index, onOpen }) {
  const CatIcon = categoryIcons[post.category] || TrendingUp;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden transition-shadow duration-300"
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
        <button
          type="button"
          onClick={() => onOpen(post)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B1B6CE] hover:text-[#2857B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087FD1]"
          aria-label={`Read article: ${post.title}`}
        >
          Read article
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}

export default function InsightsPage({ onHome }) {
  const [managedPosts, setManagedPosts] = useState(defaultPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getManagedContent('insights', defaultPosts).then((posts) => {
      setManagedPosts(posts.map((post) => ({
        ...post,
        content: post.content || defaultPosts.find((defaultPost) => defaultPost.title === post.title)?.content,
      })));
    });
  }, []);

  useEffect(() => {
    if (!selectedPost) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPost(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedPost]);

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
          className="group relative bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-shadow duration-300"
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
            <button
              type="button"
              onClick={() => setSelectedPost(featured)}
              className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#B1B6CE] hover:text-[#2857B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087FD1]"
              aria-label={`Read article: ${featured.title}`}
            >
              Read article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.article>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {rest.map((post, i) => (
            <PostCard key={post.title} post={post} index={i} onOpen={setSelectedPost} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000741]/75 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby="insight-dialog-title"
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-[#000741] shadow transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087FD1]"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative h-56 overflow-hidden sm:h-72">
                <img src={selectedPost.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000741]/65 to-transparent" />
                <span
                  className="absolute bottom-5 left-6 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: selectedPost.accent }}
                >
                  {selectedPost.category}
                </span>
              </div>
              <div className="px-6 py-7 sm:px-10 sm:py-9">
                <div className="mb-4 flex items-center gap-3 text-xs text-gray-400">
                  <span>{selectedPost.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {selectedPost.readTime}
                  </span>
                </div>
                <h2 id="insight-dialog-title" className="text-2xl font-bold leading-snug text-[#000741] sm:text-3xl">
                  {selectedPost.title}
                </h2>
                <p className="mt-4 border-l-2 border-[#087FD1] pl-4 text-base leading-7 text-gray-600">
                  {selectedPost.excerpt}
                </p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
                  {(selectedPost.content || selectedPost.excerpt).split(/\n\s*\n/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
