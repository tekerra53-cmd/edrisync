import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, Bell, Briefcase, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock, Edit, FileEdit, FileText, Globe2, HelpCircle, Home, Image, Inbox, LayoutDashboard, Lightbulb, Lock, LogOut, Mail, Palette, Plus, Quote, Save, Search, Send, Settings, Sparkles, TrendingUp, Trash2, Upload, Users, Zap } from 'lucide-react';
import edrisyncLogo from '../assests/img/edrisync-logo.png';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminAccount, AdminActivity, getAdminAccounts, getAdminActivity, recordSessionActivity } from '../services/adminActivity';
import { getNewsletterSubscribers, NewsletterSubscriber } from '../services/newsletter';
import { sendNewsletterCampaign, sendNewsletterTest } from '../services/newsletterCampaign';
import { defaultHeroSettings, getHeroSettings, HeroSettings, saveHeroSettings } from '../services/siteContent';
import { CaseStudy, InsightPost, getManagedContent, saveManagedContent } from '../services/managedContent';
import { projects } from './PortfolioSection';
import { defaultPosts } from './InsightsPage';
import { defaultPartners } from './ClientLogos';
import { defaultClientPerspectives } from './Testimonials';
import { deleteJob, getAdminJobs, Job, JobInput, saveJob } from '../services/jobs';

type RequestRow = { id: string; name: string; organisation: string; email: string; service_area: string; challenge: string; contact_method: string; status: 'new' | 'in_progress' | 'closed'; created_at: string };
const navItems = [{ href: '/admin', label: 'Overview', Icon: LayoutDashboard }, { href: '/admin/jobs', label: 'Jobs', Icon: Briefcase }, { href: '/admin/case-studies', label: 'Case studies', Icon: FileText }, { href: '/admin/insights', label: 'Insights', Icon: Sparkles }, { href: '/admin/partners', label: 'Partners', Icon: Users }, { href: '/admin/client-perspectives', label: 'Client perspectives', Icon: Quote }, { href: '/admin/media', label: 'Media library', Icon: Image }, { href: '/admin/contacts', label: 'Consultation inbox', Icon: Inbox }, { href: '/admin/subscribers', label: 'Subscribers', Icon: Mail }, { href: '/admin/updates', label: 'Email updates', Icon: Send }, { href: '/admin/users', label: 'Users & roles', Icon: Users }, { href: '/admin/activity', label: 'Activity log', Icon: Activity }];

function getTokenPayload(session: any) {
  try {
    const payload = session?.access_token?.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
    return payload ? JSON.parse(atob(payload)) : null;
  } catch { return null; }
}

function hasMfaSession(session: any) {
  return getTokenPayload(session)?.aal === 'aal2';
}

function isAdminSession(session: any) {
  return session?.user?.app_metadata?.role === 'admin' || getTokenPayload(session)?.app_metadata?.role === 'admin';
}

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [mfaReady, setMfaReady] = useState(false);
  const [hero, setHero] = useState<HeroSettings>(defaultHeroSettings);
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isContacts = window.location.pathname === '/admin/contacts';
  const isJobs = window.location.pathname === '/admin/jobs';
  const isCaseStudies = window.location.pathname === '/admin/case-studies';
  const isInsights = window.location.pathname === '/admin/insights';
  const isPartners = window.location.pathname === '/admin/partners';
  const isPerspectives = window.location.pathname === '/admin/client-perspectives';
  const isMedia = window.location.pathname === '/admin/media';
  const isSubscribers = window.location.pathname === '/admin/subscribers';
  const isUpdates = window.location.pathname === '/admin/updates';
  const isUsers = window.location.pathname === '/admin/users';
  const isActivity = window.location.pathname === '/admin/activity';
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(projects);
  const [insights, setInsights] = useState<InsightPost[]>(defaultPosts);
  const [partners, setPartners] = useState<any[]>(defaultPartners);
  const [perspectives, setPerspectives] = useState<any[]>(defaultClientPerspectives);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!supabase) { setAuthLoading(false); return; }
    const acceptAdminSession = (nextSession: any) => {
      if (nextSession && !isAdminSession(nextSession)) {
        setSession(null); setAuthError('This account is not authorised to access the admin workspace.');
        supabase.auth.signOut();
      } else { setSession(nextSession); setMfaReady(hasMfaSession(nextSession)); }
    };
    supabase.auth.getSession().then(({ data }) => { acceptAdminSession(data.session); setAuthLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => acceptAdminSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (!session) return; getHeroSettings().then(setHero); getManagedContent('case_studies', projects).then(setCaseStudies); getManagedContent('insights', defaultPosts).then(setInsights); getManagedContent('partners', defaultPartners).then(setPartners); getManagedContent('client_perspectives', defaultClientPerspectives).then(setPerspectives); getAdminJobs().then(setJobs).catch(() => setJobs([])); loadRequests(); }, [session]);

  useEffect(() => {
    if (!session) return;
    let timeout = window.setTimeout(() => supabase?.auth.signOut(), 30 * 60 * 1000);
    const renew = () => { window.clearTimeout(timeout); timeout = window.setTimeout(() => supabase?.auth.signOut(), 30 * 60 * 1000); };
    window.addEventListener('pointerdown', renew); window.addEventListener('keydown', renew);
    return () => { window.clearTimeout(timeout); window.removeEventListener('pointerdown', renew); window.removeEventListener('keydown', renew); };
  }, [session]);

  async function loadRequests() {
    if (!supabase) return;
    const { data } = await supabase.from('consultation_requests').select('*').order('created_at', { ascending: false });
    setRequests(data || []);
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault(); setSaving(true); setMessage('');
    try { await saveHeroSettings(hero); setMessage('Changes saved and live on the public site.'); }
    catch (error: any) { setMessage(error.message || 'Could not save settings.'); }
    finally { setSaving(false); }
  }

  async function updateStatus(id: string, status: RequestRow['status']) {
    if (!supabase) return;
    await supabase.from('consultation_requests').update({ status }).eq('id', id);
    setRequests((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }

  async function signOut() {
    try { await recordSessionActivity('sign_out'); } catch { /* Audit logging must not prevent a safe sign-out. */ }
    await supabase?.auth.signOut();
  }

  useEffect(() => {
    if (!session || !mfaReady) return;
    const sessionKey = getTokenPayload(session)?.session_id || session.access_token;
    const storageKey = `edrisync-admin-audit-${sessionKey}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, 'recorded');
    recordSessionActivity('sign_in').catch(() => sessionStorage.removeItem(storageKey));
  }, [session, mfaReady]);

  if (!isSupabaseConfigured) return <SetupNotice />;
  if (authLoading) return <div className="admin-loading min-h-screen" />;
  if (!session) return <Login authError={authError} setAuthError={setAuthError} />;
  if (!mfaReady) return <MfaGate onVerified={() => setMfaReady(true)} />;
  const newRequests = requests.filter((request) => request.status === 'new').length;
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="admin-shell min-h-screen text-white"><div className="admin-orb admin-orb-one" /><div className="admin-orb admin-orb-two" /><div className="relative flex min-h-screen">
    <motion.aside initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className={`admin-sidebar admin-reference-sidebar hidden shrink-0 flex-col lg:flex ${sidebarCollapsed ? 'w-20 px-3' : 'w-64 px-4'}`}>
      <div className={`admin-sidebar-brand ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}><a href="/" className="flex items-center gap-2"><img src={edrisyncLogo} alt="Edrisync" className="h-8 w-8 object-contain" />{!sidebarCollapsed && <span className="text-lg font-semibold">EdriSync</span>}</a></div>
      <nav className="admin-reference-nav">
        {!sidebarCollapsed && <p className="admin-nav-caption">Workspace</p>}
        <a href="/admin" title="Dashboard" className={`admin-nav-link ${window.location.pathname === '/admin' ? 'is-active' : ''}`}><LayoutDashboard />{!sidebarCollapsed && <span>Dashboard</span>}</a>
        <a href="/admin/jobs" className={`admin-nav-link ${isJobs ? 'is-active' : ''}`} title="Jobs"><Briefcase />{!sidebarCollapsed && <span>Jobs</span>}</a>
        <div className="admin-nav-group"><div className="admin-nav-group-label"><Globe2 />{!sidebarCollapsed && <><span>Website Content</span><ChevronRight className="ml-auto rotate-90" /></>}</div>{!sidebarCollapsed && <div className="admin-subnav">
          <a href="/admin" className={window.location.pathname === '/admin' ? 'is-current' : ''}><Home />Homepage</a>
          <a href="/admin/case-studies" className={isCaseStudies ? 'is-current' : ''}><FileText />Case Studies</a>
          <a href="/admin/insights" className={isInsights ? 'is-current' : ''}><Lightbulb />Insights</a>
          <a href="/admin/partners" className={isPartners ? 'is-current' : ''}><Users />Partners</a>
          <a href="/admin/client-perspectives" className={isPerspectives ? 'is-current' : ''}><Quote />Client perspectives</a>
        </div>}</div>
        <a href="/admin/media" className={`admin-nav-link ${isMedia ? 'is-active' : ''}`} title="Media Library"><Image />{!sidebarCollapsed && <span>Media Library</span>}</a>
        <a href="/admin/contacts" className={`admin-nav-link ${isContacts ? 'is-active' : ''}`} title="Messages"><Inbox />{!sidebarCollapsed && <span>Messages</span>}{!sidebarCollapsed && newRequests > 0 && <b className="admin-count">{newRequests}</b>}</a>
        <a href="/admin/subscribers" className={`admin-nav-link ${isSubscribers ? 'is-active' : ''}`} title="Subscribers"><Mail />{!sidebarCollapsed && <span>Subscribers</span>}</a>
        <a href="/admin/updates" className={`admin-nav-link ${isUpdates ? 'is-active' : ''}`} title="Email updates"><Send />{!sidebarCollapsed && <span>Email updates</span>}</a>
        <a href="/admin/users" className={`admin-nav-link ${isUsers ? 'is-active' : ''}`} title="Users & Roles"><Users />{!sidebarCollapsed && <span>Users & Roles</span>}</a>
        <a href="/admin/activity" className={`admin-nav-link ${isActivity ? 'is-active' : ''}`} title="Activity Log"><Activity />{!sidebarCollapsed && <span>Activity Log</span>}</a>
      </nav>
      <div className="admin-sidebar-bottom"><span className="admin-nav-link is-disabled" title="Help & Support"><HelpCircle />{!sidebarCollapsed && <span>Help & Support</span>}</span>{!sidebarCollapsed && <div className="admin-account"><span>AD</span><div><b>Admin</b><small>Administrator</small></div></div>}<button onClick={signOut} className="admin-nav-link admin-logout" title="Log out"><LogOut />{!sidebarCollapsed && <span>Log out</span>}</button></div>
      <button onClick={() => setSidebarCollapsed((current) => !current)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="admin-sidebar-toggle">{sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}</button>
    </motion.aside>
    <div className="min-w-0 flex-1">
      <header className="admin-header flex h-[78px] items-center justify-between px-5 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300/80">Admin workspace</p><h1 className="mt-1 text-lg font-semibold tracking-tight">{isJobs ? 'Jobs' : isContacts ? 'Consultation inbox' : isCaseStudies ? 'Case studies' : isInsights ? 'Insights' : isPartners ? 'Partners' : isPerspectives ? 'Client perspectives' : isMedia ? 'Media library' : isSubscribers ? 'Subscribers' : isUpdates ? 'Email updates' : isUsers ? 'Users & roles' : isActivity ? 'Activity log' : 'Dashboard'}</h1></div><div className="flex items-center gap-2 sm:gap-3"><a href="/" className="admin-outline-action hidden items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold sm:flex"><Globe2 className="h-3.5 w-3.5" /> View site</a><button onClick={signOut} className="admin-signout flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold"><LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Sign out</span></button></div></header>
      <nav className="admin-mobile-nav flex gap-2 overflow-x-auto px-5 py-3 lg:hidden">{navItems.map(({ href, label, Icon }) => <a key={href} href={href} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${window.location.pathname === href ? 'is-active' : ''}`}><Icon className="h-3.5 w-3.5" />{label}</a>)}</nav>
      <motion.main initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto max-w-[1380px] px-5 py-7 sm:px-8 lg:px-10">{isJobs ? <JobsPanel jobs={jobs} setJobs={setJobs} /> : isContacts ? <RequestsPanel requests={requests} onStatusChange={updateStatus} /> : isCaseStudies ? <CaseStudiesPanel items={caseStudies} setItems={setCaseStudies} /> : isInsights ? <InsightsPanel items={insights} setItems={setInsights} /> : isPartners ? <PartnersPanel items={partners} setItems={setPartners} /> : isPerspectives ? <ClientPerspectivesPanel items={perspectives} setItems={setPerspectives} /> : isMedia ? <MediaLibraryPanel /> : isSubscribers ? <SubscribersPanel /> : isUpdates ? <EmailUpdatesPanel /> : isUsers ? <UsersPanel /> : isActivity ? <ActivityPanel /> : <Overview hero={hero} setHero={setHero} saveSettings={saveSettings} saving={saving} message={message} requests={requests} caseStudies={caseStudies} insights={insights} />}</motion.main>
    </div>
  </div></motion.div>;
}

function Overview({ hero, setHero, saveSettings, saving, message, requests, caseStudies, insights }: { hero: HeroSettings; setHero: (hero: HeroSettings) => void; saveSettings: (event: FormEvent) => void; saving: boolean; message: string; requests: RequestRow[]; caseStudies: CaseStudy[]; insights: InsightPost[] }) {
  const newCount = requests.filter((request) => request.status === 'new').length;
  const latestRequest = requests[0];
  const activity = [
    { title: 'Homepage is live', detail: 'The main website message is published', Icon: CheckCircle2, time: 'Live now' },
    ...requests.slice(0, 3).map((request) => ({ title: `New enquiry from ${request.name}`, detail: request.service_area || 'Consultation request', Icon: Inbox, time: new Date(request.created_at).toLocaleDateString() })),
  ];
  const content = [...insights.map((item) => ({ title: item.title, type: 'Insight', href: '/admin/insights' })), ...caseStudies.map((item) => ({ title: item.title, type: 'Case study', href: '/admin/case-studies' }))].slice(0, 4);
  return <section className="admin-overview">
    <div className="admin-welcome"><div><p className="admin-eyebrow">Dashboard</p><h2>Good morning, Admin</h2><p>Manage your EdriSync website from one place. Keep your content current and your client conversations moving.</p><a href="/" className="admin-welcome-button">View website <ArrowUpRight className="h-4 w-4" /></a></div><div className="admin-welcome-art"><Globe2 /></div></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><Metric icon={FileText} label="Published pages" value="1" detail="Homepage live" accent="blue" /><Metric icon={FileEdit} label="Drafts" value="0" detail="Ready to publish" accent="yellow" /><Metric icon={Briefcase} label="Services" value="4" detail="On your website" accent="indigo" /><Metric icon={FileText} label="Case studies" value={caseStudies.length} detail="Published work" accent="mint" /><Metric icon={Lightbulb} label="Insights" value={insights.length} detail="Published articles" accent="purple" /><Metric icon={Inbox} label="New messages" value={newCount} detail={newCount ? 'Needs attention' : 'Inbox is clear'} accent="red" /></div>
    <div className="mt-8"><h3 className="admin-section-title">Quick actions</h3><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><a href="#homepage-editor" className="admin-quick-action"><Home /><span>Edit homepage</span></a><a href="/admin/case-studies" className="admin-quick-action"><FileText /><span>Add case study</span></a><a href="/admin/insights" className="admin-quick-action"><Lightbulb /><span>Write insight</span></a><a href="/admin/contacts" className="admin-quick-action"><Inbox /><span>View messages</span></a><a href="/" className="admin-quick-action"><Globe2 /><span>View website</span></a><a href="#homepage-editor" className="admin-quick-action"><Upload /><span>Update content</span></a></div></div>
    <div className="mt-8 grid gap-6 lg:grid-cols-2"><section className="admin-card"><header className="admin-panel-header"><h3>Recent activity</h3></header><div className="divide-y divide-slate-100">{activity.map(({ title, detail, Icon, time }, index) => <div key={`${title}-${index}`} className="admin-activity-row"><span className="admin-activity-icon"><Icon className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="font-medium text-slate-800">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><span className="text-xs text-slate-400">{time}</span></div>)}</div><div className="admin-panel-footer"><a href="/admin/contacts">View all activity →</a></div></section><section className="admin-card"><header className="admin-panel-header flex items-center justify-between"><h3>Recent content</h3><span className="admin-content-filter">All content</span></header><div className="p-4 space-y-3">{content.map((item) => <a key={`${item.type}-${item.title}`} href={item.href} className="admin-content-row"><div className="min-w-0"><p className="truncate font-medium text-slate-800">{item.title}</p><span>{item.type} · Published</span></div><Edit className="h-4 w-4" /></a>)}{content.length === 0 && <p className="p-4 text-sm text-slate-500">Your published content will appear here.</p>}</div><div className="admin-panel-footer"><a href="/admin/insights">View all content →</a></div></section></div>
    <div id="homepage-editor" className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <form onSubmit={saveSettings} className="admin-card overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="admin-section-icon"><Sparkles className="h-5 w-5" /></div><div><h3 className="font-semibold">Homepage hero</h3><p className="mt-0.5 text-xs text-slate-500">Update the message visitors see first.</p></div></div><button disabled={saving} className="admin-primary-action flex items-center justify-center gap-2"><Save className="h-3.5 w-3.5" />{saving ? 'Saving...' : 'Save changes'}</button></div>
        <div className="grid gap-5 p-6"><label className="text-xs font-semibold text-slate-600">Eyebrow<input value={hero.eyebrow} onChange={(event) => setHero({ ...hero, eyebrow: event.target.value })} className="admin-input" /></label><label className="text-xs font-semibold text-slate-600">Headline<input value={hero.title} onChange={(event) => setHero({ ...hero, title: event.target.value })} className="admin-input" /></label><label className="text-xs font-semibold text-slate-600">Supporting copy<textarea rows={5} value={hero.description} onChange={(event) => setHero({ ...hero, description: event.target.value })} className="admin-input resize-y leading-6" /></label><label className="admin-colour-field">Overlay colour<input type="color" value={hero.overlayColor} onChange={(event) => setHero({ ...hero, overlayColor: event.target.value })} className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent p-0" /></label>{message && <p className="flex items-center gap-2 text-xs text-emerald-700"><Check className="h-3.5 w-3.5" />{message}</p>}</div>
      </form>
      <aside className="space-y-4">
        <div className="admin-card p-5"><div className="flex items-center justify-between"><div><p className="admin-eyebrow">Next action</p><h3 className="mt-2 font-semibold">{newCount ? `${newCount} lead${newCount === 1 ? '' : 's'} to review` : 'Your inbox is clear'}</h3></div><Inbox className="h-5 w-5 text-[#087FD1]" /></div><p className="mt-3 text-sm leading-6 text-slate-500">{latestRequest ? `${latestRequest.name} from ${latestRequest.organisation || 'a new organisation'} is waiting for a response.` : 'New consultation requests will appear here as they arrive.'}</p><a href="/admin/contacts" className="admin-text-link mt-5 inline-flex items-center gap-1.5">Open inbox <ArrowUpRight className="h-3.5 w-3.5" /></a></div>
        <div className="admin-preview"><div className="flex items-center justify-between"><p>Live preview</p><Globe2 className="h-4 w-4" /></div><div className="mt-9"><span>{hero.eyebrow || 'Your eyebrow'}</span><h3>{hero.title || 'Your headline'}</h3><p>{hero.description || 'Your supporting copy will appear here.'}</p></div><div className="mt-8 border-t border-white/10 pt-4 text-xs text-blue-100/60">Changes save directly to your live website.</div></div>
      </aside>
    </div>
  </section>;
}

function Metric({ icon: Icon, label, value, detail, accent }: { icon: any; label: string; value: string | number; detail: string; accent: string }) { const styles: Record<string, string> = { blue: 'bg-blue-50 text-blue-600', yellow: 'bg-amber-50 text-amber-600', indigo: 'bg-indigo-50 text-indigo-600', mint: 'bg-emerald-50 text-emerald-600', purple: 'bg-violet-50 text-violet-600', red: 'bg-rose-50 text-rose-600' }; return <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ y: -3 }} transition={{ duration: 0.32 }} className="admin-stat-card"><div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles[accent]}`}><Icon className="h-5 w-5" /></div><TrendingUp className="h-4 w-4 text-emerald-500" /></div><p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-sm font-medium text-slate-700">{label}</p><p className="mt-1 text-[11px] text-slate-400">{detail}</p></motion.div>; }

const emptyJob = (): JobInput => ({ title: '', slug: '', share_code: String(Math.floor(10000 + Math.random() * 90000)), department: 'Technology', location: 'Remote', employment_type: 'Full-time', summary: '', responsibilities: [], requirements: [], application_email: 'info@edrisync.com', application_url: null, application_instructions: '', pre_application_question: '', status: 'draft', posted_at: new Date().toISOString() });
const makeSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function JobsPanel({ jobs, setJobs }: { jobs: Job[]; setJobs: (jobs: Job[]) => void }) {
  const [draft, setDraft] = useState<JobInput>(emptyJob);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const selectJob = (job: Job) => { setSelectedId(job.id); setDraft({ ...job }); setMessage(''); };
  const startNew = () => { setSelectedId(null); setDraft(emptyJob()); setMessage(''); };
  const update = (values: Partial<JobInput>) => setDraft((current) => ({ ...current, ...values }));

  async function save() {
    if (!draft.title.trim() || !draft.summary.trim()) { setMessage('A job title and summary are required.'); return; }
    setSaving(true); setMessage('');
    try {
      const saved = await saveJob({ ...draft, id: selectedId || undefined, slug: draft.slug || makeSlug(draft.title), title: draft.title.trim(), summary: draft.summary.trim(), application_email: draft.application_email.trim() || 'info@edrisync.com', application_url: draft.application_url?.trim() || null, application_instructions: draft.application_instructions?.trim() || null, pre_application_question: draft.pre_application_question?.trim() || null });
      setJobs([saved, ...jobs.filter((job) => job.id !== saved.id)]);
      setSelectedId(saved.id); setDraft({ ...saved }); setMessage('Job saved successfully.');
    } catch (error: any) { setMessage(error.message || 'Could not save this job.'); }
    finally { setSaving(false); }
  }

  async function remove() {
    if (!selectedId || !window.confirm('Delete this job permanently?')) return;
    try { await deleteJob(selectedId); setJobs(jobs.filter((job) => job.id !== selectedId)); startNew(); }
    catch (error: any) { setMessage(error.message || 'Could not delete this job.'); }
  }

  const published = jobs.filter((job) => job.status === 'published').length;
  const drafts = jobs.filter((job) => job.status === 'draft').length;
  return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Careers</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">Jobs and applications</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Create vacancies, publish open roles, and give candidates a clear way to apply.</p></div><div className="flex gap-2"><a href="/careers" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-[#087FD1] hover:text-[#087FD1]"><Globe2 className="h-3.5 w-3.5" /> View careers page</a><button onClick={startNew} className="flex items-center gap-2 rounded-lg bg-[#000741] px-4 py-2.5 text-xs font-semibold text-white"><Plus className="h-3.5 w-3.5" /> New job</button></div></div><div className="mt-7 grid gap-3 sm:grid-cols-3"><JobCount label="Total jobs" value={jobs.length} tone="text-slate-700" /><JobCount label="Live on website" value={published} tone="text-emerald-700" /><JobCount label="Drafts to review" value={drafts} tone="text-amber-700" /></div><div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(7,21,47,.03)]"><p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">All jobs · {jobs.length}</p><div className="space-y-1">{jobs.length === 0 ? <p className="px-3 py-6 text-center text-xs leading-5 text-slate-400">No jobs created yet.</p> : jobs.map((job) => <button key={job.id} onClick={() => selectJob(job)} className={`w-full rounded-xl px-3 py-3 text-left transition-colors ${selectedId === job.id ? 'bg-[#000741] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><div className="flex items-center justify-between gap-2"><span className="truncate text-xs font-semibold">{job.title}</span><span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${selectedId === job.id ? 'bg-white/15 text-white' : job.status === 'published' ? 'bg-emerald-50 text-emerald-700' : job.status === 'closed' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-700'}`}>{job.status}</span></div><p className={`mt-1 truncate text-[10px] ${selectedId === job.id ? 'text-white/60' : 'text-slate-400'}`}>{job.department} · {job.location}</p></button>)}</div></aside><div className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(7,21,47,.03)]"><div className="flex items-center justify-between border-b border-slate-100 px-6 py-5"><div><h3 className="font-semibold text-slate-900">{selectedId ? 'Edit job' : 'Create a new job'}</h3><p className="mt-0.5 text-xs text-slate-500">Set the job status when you are ready to control whether candidates can see it.</p></div>{selectedId && <button onClick={remove} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600" aria-label="Delete job"><Trash2 className="h-4 w-4" /></button>}</div><div className="grid gap-5 p-6"><div className="grid gap-5 md:grid-cols-2"><AdminField label="Job title" value={draft.title} onChange={(value) => update({ title: value })} /><AdminField label="Department" value={draft.department} onChange={(value) => update({ department: value })} /><AdminField label="Location" value={draft.location} onChange={(value) => update({ location: value })} /><AdminSelect label="Employment type" value={draft.employment_type} options={['Full-time', 'Part-time', 'Contract', 'Internship']} onChange={(value) => update({ employment_type: value as JobInput['employment_type'] })} /></div><JobStatusControl value={draft.status} onChange={(status) => update({ status })} /><RichTextField label="Role summary" help="Write the short introduction candidates read first." value={draft.summary} onChange={(value) => update({ summary: value })} /><div className="grid gap-5 md:grid-cols-2"><RichListField label="Responsibilities" help="Each bullet is one responsibility." value={draft.responsibilities} onChange={(value) => update({ responsibilities: value })} /><RichListField label="Requirements" help="Each bullet is one requirement." value={draft.requirements} onChange={(value) => update({ requirements: value })} /></div><div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"><p className="text-xs font-semibold text-slate-700">How candidates apply</p><p className="mt-1 text-[11px] leading-5 text-slate-500">Use an email address, or add an external application link. When a link is provided, candidates go there first.</p><div className="mt-4 grid gap-5 md:grid-cols-2"><AdminField label="Application email" value={draft.application_email} type="email" onChange={(value) => update({ application_email: value })} /><AdminField label="External application link (optional)" value={draft.application_url || ''} type="url" onChange={(value) => update({ application_url: value })} /></div></div><RichTextField label="Application instructions (optional)" help="For example, tell candidates what to include with their application." value={draft.application_instructions || ''} onChange={(value) => update({ application_instructions: value })} /><div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5"><button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#000741] px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"><Save className="h-3.5 w-3.5" />{saving ? 'Saving…' : selectedId ? 'Save changes' : 'Create job'}</button>{message && <p className={`text-xs font-medium ${message.includes('success') ? 'text-emerald-700' : 'text-red-600'}`}>{message}</p>}</div></div></div></div></section>;
}

function JobCount({ label, value, tone }: { label: string; value: number; tone: string }) { return <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-[0_6px_18px_rgba(7,21,47,.025)]"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{label}</p><p className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</p></div>; }
function JobStatusControl({ value, onChange }: { value: JobInput['status']; onChange: (status: JobInput['status']) => void }) {
  const choices: Array<[JobInput['status'], string, string]> = [
    ['draft', 'Draft', 'Only admins can see it.'],
    ['published', 'Publish', 'Visible on the careers page.'],
    ['closed', 'Closed', 'No longer accepting applications.'],
  ];
  const selectedLabel = choices.find(([status]) => status === value)?.[1] ?? 'Draft';
  const activeClasses = (status: JobInput['status']) => status === 'published'
    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
    : status === 'draft'
      ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20'
      : 'border-slate-500 bg-slate-100 text-slate-950 ring-2 ring-slate-500/20';

  return <fieldset>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <legend className="text-xs font-semibold text-slate-700">Job status</legend>
      <p className="text-[11px] font-medium text-slate-500">Currently selected: <span className="font-bold text-slate-800">{selectedLabel}</span></p>
    </div>
    <div className="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Job status">
      {choices.map(([status, label, description]) => {
        const isSelected = value === status;
        return <button key={status} type="button" role="radio" aria-checked={isSelected} onClick={() => onChange(status)} className={`relative min-h-28 rounded-xl border-2 p-4 pr-11 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087FD1] focus-visible:ring-offset-2 ${isSelected ? activeClasses(status) : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'}`}>
          {isSelected && <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[9px] font-bold uppercase tracking-wide shadow-sm"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Selected</span>}
          <span className="block text-sm font-bold">{label}</span>
          <span className={`mt-2 block text-[11px] leading-5 ${isSelected ? 'text-current opacity-75' : 'text-slate-500'}`}>{description}</span>
        </button>;
      })}
    </div>
  </fieldset>;
}

function AdminField({ label, value, onChange, multiline = false, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; type?: string }) { return <label className="text-xs font-semibold text-slate-600">{label}{multiline ? <textarea rows={5} value={value} onChange={(event) => onChange(event.target.value)} className="admin-input mt-2 resize-y leading-6" /> : <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="admin-input mt-2" />}</label>; }
function AdminSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="text-xs font-semibold text-slate-600">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="admin-input mt-2">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }

function RichTextField({ label, help, value, onChange }: { label: string; help: string; value: string; onChange: (value: string) => void }) {
  const editor = useRef<HTMLDivElement>(null);
  useEffect(() => { if (editor.current && document.activeElement !== editor.current && editor.current.innerHTML !== value) editor.current.innerHTML = value; }, [value]);
  const format = (command: string, argument?: string) => { editor.current?.focus(); document.execCommand(command, false, argument); onChange(editor.current?.innerHTML || ''); };
  return <div><div className="flex flex-wrap items-baseline justify-between gap-2"><label className="text-xs font-semibold text-slate-600">{label}</label><p className="text-[10px] text-slate-400">{help}</p></div><div className="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-[#087FD1] focus-within:ring-2 focus-within:ring-[#087FD1]/10"><div className="flex flex-wrap gap-1 border-b border-slate-100 bg-slate-50 px-2 py-1.5"><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('formatBlock', '<p>')} className="rounded px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-white" title="Paragraph">Paragraph</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('bold')} className="rounded px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-white" title="Bold">B</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('underline')} className="rounded px-2 py-1 text-[10px] font-semibold underline text-slate-600 hover:bg-white" title="Underline">U</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('hiliteColor', '#FEF08A')} className="rounded bg-yellow-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-yellow-300" title="Highlight">Highlight</button><span className="mx-1 h-5 w-px bg-slate-200" /><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('insertUnorderedList')} className="rounded px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-white" title="Bullet list">• List</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('insertOrderedList')} className="rounded px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-white" title="Numbered list">1. List</button></div><div ref={editor} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" onInput={() => onChange(editor.current?.innerHTML || '')} className="min-h-32 px-3 py-3 text-sm leading-6 text-slate-700 outline-none [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5" /></div></div>;
}

function RichListField({ label, help, value, onChange }: { label: string; help: string; value: string[]; onChange: (value: string[]) => void }) {
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor.current || document.activeElement === editor.current) return;
    const items = value.length ? value : [''];
    const markup = items.map((item) => `<div>${item}</div>`).join('');
    if (editor.current.innerHTML !== markup) editor.current.innerHTML = markup;
  }, [value]);

  const format = (command: string, argument?: string) => {
    editor.current?.focus();
    document.execCommand(command, false, argument);
    saveItems();
  };
  const saveItems = () => {
    if (!editor.current) return;
    const items = Array.from(editor.current.children)
      .map((item) => item.innerHTML.trim())
      .filter((item) => item && item !== '<br>');
    onChange(items);
  };

  return <div><div className="flex flex-wrap items-baseline justify-between gap-2"><label className="text-xs font-semibold text-slate-600">{label}</label><p className="text-[10px] text-slate-400">{help}</p></div><div className="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-[#087FD1] focus-within:ring-2 focus-within:ring-[#087FD1]/10"><div className="flex flex-wrap gap-1 border-b border-slate-100 bg-slate-50 px-2 py-1.5"><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('bold')} className="rounded px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-white" title="Bold">B</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('underline')} className="rounded px-2 py-1 text-[10px] font-semibold underline text-slate-600 hover:bg-white" title="Underline">U</button><button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => format('hiliteColor', '#FEF08A')} className="rounded bg-yellow-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-yellow-300" title="Highlight">Highlight</button></div><div ref={editor} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" onInput={saveItems} className="min-h-32 px-3 py-3 text-sm leading-7 text-slate-700 outline-none [&>div]:relative [&>div]:pl-5 [&>div]:before:absolute [&>div]:before:left-0 [&>div]:before:text-[#087FD1] [&>div]:before:content-['•'] [&_mark]:rounded [&_mark]:bg-yellow-100 [&_mark]:px-1" /></div><p className="mt-1 text-[10px] text-slate-400">Press Enter to add another checklist item.</p></div>;
}

function RequestsPanel({ requests, onStatusChange }: { requests: RequestRow[]; onStatusChange: (id: string, status: RequestRow['status']) => void }) { return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Leads from your public contact form</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">Consultation inbox</h2></div><span className="text-xs font-medium text-slate-500">{requests.length} total request{requests.length === 1 ? '' : 's'}</span></div><div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(7,21,47,0.04)]"><div className="hidden grid-cols-[1.2fr_1fr_1.2fr_150px] gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:grid"><span>Contact</span><span>Service</span><span>Message</span><span>Status</span></div>{requests.map((request) => <article key={request.id} className="grid gap-4 border-b border-slate-100 px-6 py-5 last:border-0 md:grid-cols-[1.2fr_1fr_1.2fr_150px] md:items-start"><div><h3 className="text-sm font-semibold">{request.name}</h3><p className="mt-1 text-xs text-slate-500">{request.organisation}</p><a href={`mailto:${request.email}`} className="mt-2 block text-xs text-[#087FD1] hover:underline">{request.email}</a></div><div><span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-[#087FD1]">{request.service_area}</span><p className="mt-2 text-xs text-slate-400">Prefers {request.contact_method}</p></div><p className="line-clamp-3 text-sm leading-6 text-slate-600">{request.challenge}</p><div><select value={request.status} onChange={(event) => onStatusChange(request.id, event.target.value as RequestRow['status'])} className={`w-full rounded-lg border px-3 py-2 text-xs font-semibold outline-none ${request.status === 'new' ? 'border-amber-200 bg-amber-50 text-amber-700' : request.status === 'closed' ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-blue-200 bg-blue-50 text-blue-700'}`}><option value="new">New</option><option value="in_progress">In progress</option><option value="closed">Closed</option></select><time className="mt-2 block text-[10px] text-slate-400">{new Date(request.created_at).toLocaleDateString()}</time></div></article>)}{requests.length === 0 && <div className="px-6 py-16 text-center"><Inbox className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm font-medium text-slate-600">Your inbox is clear</p><p className="mt-1 text-xs text-slate-400">New consultation requests will appear here.</p></div>}</div></section>; }

function Login({ authError, setAuthError }: { authError: string; setAuthError: (value: string) => void }) {
  async function signInWithGoogle() {
    if (!supabase) return;
    setAuthError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/admin` } });
    if (error) setAuthError(error.message);
  }
  return <main className="flex min-h-screen bg-[#000741]"><div className="hidden flex-1 flex-col justify-between p-12 lg:flex"><a href="/" className="flex items-center gap-3 text-white"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a9c7ff] text-sm font-bold text-[#000741]">E</span><span className="font-semibold tracking-tight">EDRISYNC</span></a><div className="max-w-lg"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a9c7ff]">Edrisync administration</p><h1 className="mt-5 text-6xl font-light leading-[1.02] tracking-tight text-white">The work behind<br /><span className="text-blue-200/55">better outcomes.</span></h1><p className="mt-7 max-w-md text-sm leading-7 text-blue-100/55">A secure space to shape your site, respond to enquiries, and stay close to the work that matters.</p></div><p className="text-xs text-blue-100/35">Edrisync Limited · Admin workspace</p></div><div className="flex w-full items-center justify-center bg-[#f4f6f8] px-6 py-16 lg:max-w-[520px]"><div className="w-full max-w-sm"><div className="mb-10 lg:hidden"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000741] text-sm font-bold text-white">E</span></div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087FD1]">Secure access</p><h1 className="mt-3 text-3xl font-light tracking-tight text-[#000741]">Sign in to your workspace</h1><p className="mt-3 text-sm leading-6 text-slate-500">Use the Google account that has been approved as an Edrisync administrator.</p>{authError && <p role="alert" className="mt-5 text-xs text-red-600">{authError}</p>}<button type="button" onClick={signInWithGoogle} className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#000741] shadow-sm transition-colors hover:bg-slate-50"><span className="text-base font-bold text-[#4285F4]">G</span> Continue with Google</button><p className="mt-5 text-center text-xs leading-5 text-slate-500">An authenticator-app code is required after Google sign-in.</p></div></div></main>;
}

function MfaGate({ onVerified }: { onVerified: () => void }) {
  const [factor, setFactor] = useState<any>(null); const [qrCode, setQrCode] = useState(''); const [code, setCode] = useState(''); const [message, setMessage] = useState(''); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { if (!supabase) return; const { data, error } = await supabase.auth.mfa.listFactors(); if (error) { setMessage(error.message); setLoading(false); return; } const verified = data?.totp?.find((item: any) => item.status === 'verified'); if (verified) setFactor(verified); else { const enrolled = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Edrisync admin' }); if (enrolled.error) setMessage(enrolled.error.message); else { setFactor(enrolled.data); setQrCode(enrolled.data.totp.qr_code); } } setLoading(false); })(); }, []);
  async function verify(event: FormEvent) { event.preventDefault(); if (!supabase || !factor) return; setMessage(''); const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: factor.id }); if (challengeError) { setMessage(challengeError.message); return; } const { error } = await supabase.auth.mfa.verify({ factorId: factor.id, challengeId: challenge.id, code: code.replace(/\s/g, '') }); if (error) setMessage('That code was not accepted. Try the current code from your authenticator app.'); else onVerified(); }
  return <main className="flex min-h-screen items-center justify-center bg-[#000741] px-6"><section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087FD1]">Second verification</p><h1 className="mt-3 text-3xl font-light tracking-tight text-[#000741]">Secure your workspace</h1>{loading ? <p className="mt-5 text-sm text-slate-500">Preparing verification…</p> : <>{qrCode && <><p className="mt-4 text-sm leading-6 text-slate-600">Scan this QR code in Google Authenticator, Authy, or 1Password, then enter its six-digit code.</p><img src={qrCode} alt="Authenticator setup QR code" className="mx-auto mt-6 h-48 w-48" /></>} {!qrCode && <p className="mt-4 text-sm leading-6 text-slate-600">Enter the current six-digit code from your authenticator app.</p>}<form onSubmit={verify} className="mt-6"><label className="block text-xs font-semibold text-slate-600">Authenticator code<input required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-center text-lg tracking-[0.35em] outline-none focus:border-[#087FD1]" /></label>{message && <p role="alert" className="mt-3 text-xs text-red-600">{message}</p>}<button className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#000741] px-5 py-3.5 text-sm font-semibold text-white">Verify and continue</button></form></>}</section></main>;
}

function SetupNotice() { return <main className="flex min-h-screen items-center justify-center bg-[#f4f6f8] px-6"><div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087FD1]">Admin setup required</p><h1 className="mt-4 text-3xl font-light text-[#000741]">Connect Supabase before signing in</h1><p className="mt-4 text-sm leading-7 text-slate-600">Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your local environment, run the SQL migration, and create an admin Auth user.</p><a href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#087FD1]">Return to site <ChevronRight className="h-4 w-4" /></a></div></main>; }

function ContentPanel({ type, items, setItems }: { type: 'caseStudies' | 'insights'; items: CaseStudy[] | InsightPost[]; setItems: (items: any[]) => void }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const isCaseStudies = type === 'caseStudies';

  async function save() {
    setSaving(true); setMessage('');
    try { await saveManagedContent(isCaseStudies ? 'case_studies' : 'insights', items); setMessage('Published to the public site.'); }
    catch (error: any) { setMessage(error.message || 'Could not save content.'); }
    finally { setSaving(false); }
  }

  function addItem() {
    const next = isCaseStudies
      ? { title: 'New case study', category: 'Cybersecurity', desc: 'Describe the outcome and value delivered.', image: '', tags: ['New'], year: new Date().getFullYear().toString(), accent: '#087FD1' }
      : { category: 'Cybersecurity', date: 'New article', readTime: '5 min read', title: 'New insight article', excerpt: 'Add a concise summary for this insight.', image: '', accent: '#087FD1' };
    setItems([...items, next]);
  }

  return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Published content</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">{isCaseStudies ? 'Case studies' : 'Insights'}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Edit what visitors see on the public {isCaseStudies ? 'case studies' : 'insights'} page. Changes stay in draft until you publish.</p></div><div className="flex gap-2"><button onClick={addItem} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-[#087FD1] hover:text-[#087FD1]"><Plus className="h-3.5 w-3.5" /> Add item</button><button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#000741] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"><Save className="h-3.5 w-3.5" />{saving ? 'Publishing...' : 'Publish changes'}</button></div></div><div className="mt-8 space-y-4">{items.map((item: any, index) => <ContentEditor key={`${type}-${index}`} type={type} item={item} onChange={(next) => setItems(items.map((current, currentIndex) => currentIndex === index ? next : current))} onDelete={() => setItems(items.filter((_current, currentIndex) => currentIndex !== index))} />)}</div>{message && <p className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-700"><Check className="h-3.5 w-3.5" />{message}</p>}</section>;
}

function CaseStudiesPanel({ items, setItems }: { items: CaseStudy[]; setItems: (items: CaseStudy[]) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const selected = items[selectedIndex];

  async function publish() {
    setSaving(true); setMessage('');
    try { await saveManagedContent('case_studies', items); setMessage('Published to the public site.'); }
    catch (error: any) { setMessage(error.message || 'Could not publish case studies.'); }
    finally { setSaving(false); }
  }

  function addStudy() {
    const next: CaseStudy = { title: 'New case study', category: 'Cybersecurity', desc: 'Describe the outcome and value delivered.', image: '', tags: ['New'], year: new Date().getFullYear().toString(), accent: '#087FD1' };
    setItems([...items, next]);
    setSelectedIndex(items.length);
  }

  function updateSelected(next: CaseStudy) { setItems(items.map((item, index) => index === selectedIndex ? next : item)); }
  function deleteSelected() { const next = items.filter((_item, index) => index !== selectedIndex); setItems(next); setSelectedIndex(Math.max(0, Math.min(selectedIndex, next.length - 1))); }

  return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Published content</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">Case studies</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Select a numbered study to view and edit its complete content.</p></div><div className="flex gap-2"><button onClick={addStudy} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-[#087FD1] hover:text-[#087FD1]"><Plus className="h-3.5 w-3.5" /> Add study</button><button onClick={publish} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#000741] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"><Save className="h-3.5 w-3.5" />{saving ? 'Publishing...' : 'Publish changes'}</button></div></div><div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">All case studies</p><div className="space-y-1">{items.map((item, index) => <button key={`${item.title}-${index}`} onClick={() => setSelectedIndex(index)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${index === selectedIndex ? 'bg-[#000741] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${index === selectedIndex ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span><span className="min-w-0"><span className="block truncate text-xs font-semibold">{item.title || 'Untitled case study'}</span><span className={`mt-0.5 block truncate text-[10px] ${index === selectedIndex ? 'text-white/65' : 'text-slate-400'}`}>{item.category}</span></span></button>)}</div></aside><div>{selected ? <ContentEditor type="caseStudies" item={selected} onChange={updateSelected} onDelete={deleteSelected} /> : <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500">Add a case study to begin.</div>}{message && <p className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-700"><Check className="h-3.5 w-3.5" />{message}</p>}</div></div></section>;
}

function ClientPerspectivesPanel({ items, setItems }: { items: any[]; setItems: (items: any[]) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const selected = items[selectedIndex];
  const update = (next: any) => setItems(items.map((item, index) => index === selectedIndex ? next : item));
  const remove = () => { const next = items.filter((_item, index) => index !== selectedIndex); setItems(next); setSelectedIndex(Math.max(0, Math.min(selectedIndex, next.length - 1))); };
  const add = () => { setItems([...items, { id: `perspective-${Date.now()}`, title: 'New client story', quote: 'Add the client quote here.', author: 'Client name', role: 'Role', client: 'Organisation', status: 'Published' }]); setSelectedIndex(items.length); };
  async function publish() { setSaving(true); setMessage(''); try { await saveManagedContent('client_perspectives', items); setMessage('Published to the public site.'); } catch (error: any) { setMessage(error.message || 'Could not publish client perspectives.'); } finally { setSaving(false); } }
  return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Homepage content</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">Client perspectives</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Select a numbered story to view and edit its complete content.</p></div><div className="flex gap-2"><button onClick={add} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-[#087FD1] hover:text-[#087FD1]"><Plus className="h-3.5 w-3.5" /> Add story</button><button onClick={publish} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#000741] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"><Save className="h-3.5 w-3.5" />{saving ? 'Publishing...' : 'Publish changes'}</button></div></div><div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">All client stories</p><div className="space-y-1">{items.map((item, index) => <button key={item.id || index} onClick={() => setSelectedIndex(index)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${index === selectedIndex ? 'bg-[#000741] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${index === selectedIndex ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span><span className="min-w-0"><span className="block truncate text-xs font-semibold">{item.title || item.client || 'Untitled story'}</span><span className={`mt-0.5 block truncate text-[10px] ${index === selectedIndex ? 'text-white/65' : 'text-slate-400'}`}>{item.author || 'Client perspective'}</span></span></button>)}</div></aside><div>{selected ? <PerspectiveEditor item={selected} onChange={update} onDelete={remove} /> : <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500">Add a client story to begin.</div>}{message && <p className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-700"><Check className="h-3.5 w-3.5" />{message}</p>}</div></div></section>;
}

function InsightsPanel({ items, setItems }: { items: InsightPost[]; setItems: (items: InsightPost[]) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0); const [saving, setSaving] = useState(false); const [message, setMessage] = useState(''); const selected = items[selectedIndex];
  const update = (next: InsightPost) => setItems(items.map((item, index) => index === selectedIndex ? next : item));
  const remove = () => { const next = items.filter((_item, index) => index !== selectedIndex); setItems(next); setSelectedIndex(Math.max(0, Math.min(selectedIndex, next.length - 1))); };
  const add = () => { setItems([...items, { category: 'Cybersecurity', date: 'New article', readTime: '5 min read', title: 'New insight article', excerpt: 'Add a concise summary for this insight.', content: '', image: '', accent: '#087FD1' }]); setSelectedIndex(items.length); };
  async function publish() { setSaving(true); setMessage(''); try { await saveManagedContent('insights', items); setMessage('Published to the public site.'); } catch (error: any) { setMessage(error.message || 'Could not publish insights.'); } finally { setSaving(false); } }
  return <SelectablePanel title="Insights" caption="All insights" description="Select a numbered insight to view and edit its complete content." items={items} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} addLabel="Add insight" onAdd={add} saving={saving} onPublish={publish} message={message} itemLabel={(item) => item.title} itemMeta={(item) => item.category}>{selected && <ContentEditor type="insights" item={selected} onChange={update} onDelete={remove} />}</SelectablePanel>;
}

function PartnersPanel({ items, setItems }: { items: any[]; setItems: (items: any[]) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0); const [saving, setSaving] = useState(false); const [message, setMessage] = useState(''); const selected = items[selectedIndex];
  const update = (next: any) => setItems(items.map((item, index) => index === selectedIndex ? next : item));
  const remove = () => { const next = items.filter((_item, index) => index !== selectedIndex); setItems(next); setSelectedIndex(Math.max(0, Math.min(selectedIndex, next.length - 1))); };
  const add = () => { setItems([...items, { id: `partner-${Date.now()}`, title: 'New partner', image: '', website: '', description: '', status: 'Published' }]); setSelectedIndex(items.length); };
  async function publish() { setSaving(true); setMessage(''); try { await saveManagedContent('partners', items); setMessage('Published to the public site.'); } catch (error: any) { setMessage(error.message || 'Could not publish partners.'); } finally { setSaving(false); } }
  return <SelectablePanel title="Partners" caption="All partners" description="Select a numbered partner to view and edit its complete content." items={items} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} addLabel="Add partner" onAdd={add} saving={saving} onPublish={publish} message={message} itemLabel={(item) => item.title} itemMeta={(item) => item.status}>{selected && <PartnerEditor item={selected} onChange={update} onDelete={remove} />}</SelectablePanel>;
}

function SelectablePanel({ title, caption, description, items, selectedIndex, setSelectedIndex, addLabel, onAdd, saving, onPublish, message, itemLabel, itemMeta, children }: any) { return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Published content</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">{title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{description}</p></div><div className="flex gap-2"><button onClick={onAdd} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700"><Plus className="h-3.5 w-3.5" /> {addLabel}</button><button onClick={onPublish} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#000741] px-4 py-2.5 text-xs font-semibold text-white"><Save className="h-3.5 w-3.5" />{saving ? 'Publishing...' : 'Publish changes'}</button></div></div><div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{caption}</p><div className="space-y-1">{items.map((item: any, index: number) => <button key={item.id || `${item.title}-${index}`} onClick={() => setSelectedIndex(index)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${index === selectedIndex ? 'bg-[#000741] text-white' : 'text-slate-600 hover:bg-slate-50'}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${index === selectedIndex ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span><span className="min-w-0"><span className="block truncate text-xs font-semibold">{itemLabel(item)}</span><span className={`mt-0.5 block truncate text-[10px] ${index === selectedIndex ? 'text-white/65' : 'text-slate-400'}`}>{itemMeta(item)}</span></span></button>)}</div></aside><div>{children || <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500">Add an item to begin.</div>}{message && <p className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-700"><Check className="h-3.5 w-3.5" />{message}</p>}</div></div></section>; }

function PartnerEditor({ item, onChange, onDelete }: { item: any; onChange: (item: any) => void; onDelete: () => void }) { const update = (key: string, value: string) => onChange({ ...item, [key]: value }); return <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><p className="text-xs font-semibold text-slate-700">{item.title || 'Untitled partner'}</p><p className="mt-1 text-[11px] text-slate-400">{item.status || 'Published'}</p></div><button onClick={onDelete} aria-label="Delete partner" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Name" value={item.title} onChange={(value) => update('title', value)} /><Field label="Website URL" value={item.website} onChange={(value) => update('website', value)} /><ImageUploadField label="Logo image" value={item.image} onChange={(value) => update('image', value)} /><Field label="Status (Published or Draft)" value={item.status} onChange={(value) => update('status', value)} /><div className="md:col-span-2"><Field label="Description" value={item.description} multiline onChange={(value) => update('description', value)} /></div></div></motion.article>; }

function PerspectiveEditor({ item, onChange, onDelete }: { item: any; onChange: (item: any) => void; onDelete: () => void }) { const update = (key: string, value: string) => onChange({ ...item, [key]: value }); return <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><p className="text-xs font-semibold text-slate-700">{item.title || item.client || 'Untitled story'}</p><p className="mt-1 text-[11px] text-slate-400">{item.status || 'Published'}</p></div><button onClick={onDelete} aria-label="Delete story" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Story title" value={item.title} onChange={(value) => update('title', value)} /><Field label="Organisation" value={item.client} onChange={(value) => update('client', value)} /><Field label="Author" value={item.author} onChange={(value) => update('author', value)} /><Field label="Role" value={item.role} onChange={(value) => update('role', value)} /><Field label="Status (Published or Draft)" value={item.status} onChange={(value) => update('status', value)} /><div className="md:col-span-2"><Field label="Client quote" value={item.quote} multiline onChange={(value) => update('quote', value)} /></div></div></motion.article>; }

function ContentEditor({ type, item, onChange, onDelete }: { type: 'caseStudies' | 'insights'; item: any; onChange: (item: any) => void; onDelete: () => void }) {
  const isCaseStudy = type === 'caseStudies';
  const update = (key: string, value: string) => onChange({ ...item, [key]: value });
  return <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf3ff] text-xs font-bold text-[#087FD1]">{String(item.title || '').slice(0, 1).toUpperCase()}</span><div><p className="text-xs font-semibold text-slate-700">{item.title || 'Untitled content'}</p><p className="text-[11px] text-slate-400">{isCaseStudy ? item.category : item.date}</p></div></div><button onClick={onDelete} aria-label="Delete content" className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Title" value={item.title} onChange={(value) => update('title', value)} /><Field label="Category" value={item.category} onChange={(value) => update('category', value)} /><Field label={isCaseStudy ? 'Year' : 'Date'} value={isCaseStudy ? item.year : item.date} onChange={(value) => update(isCaseStudy ? 'year' : 'date', value)} />{isCaseStudy ? <ImageUploadField label="Cover image" value={item.image} onChange={(value) => update('image', value)} /> : <Field label="Read time" value={item.readTime} onChange={(value) => update('readTime', value)} />}<div className="md:col-span-2"><Field label={isCaseStudy ? 'Description' : 'Excerpt'} value={isCaseStudy ? item.desc : item.excerpt} onChange={(value) => update(isCaseStudy ? 'desc' : 'excerpt', value)} multiline /></div>{!isCaseStudy && <div className="md:col-span-2"><Field label="Full article content (separate paragraphs with a blank line)" value={item.content || ''} onChange={(value) => update('content', value)} multiline /></div>}{isCaseStudy && <Field label="Tags (comma separated)" value={(item.tags || []).join(', ')} onChange={(value) => update('tags', value.split(',').map((tag: string) => tag.trim()).filter(Boolean))} />}{!isCaseStudy && <ImageUploadField label="Cover image" value={item.image} onChange={(value) => update('image', value)} />}</div></motion.article>;
}

function ManagedCollectionPanel({ title, description, contentKey, items, setItems, kind }: { title: string; description: string; contentKey: string; items: any[]; setItems: (items: any[]) => void; kind: 'partner' | 'perspective' }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fields = kind === 'partner'
    ? [['title', 'Name'], ['website', 'Website URL'], ['description', 'Description'], ['status', 'Status (Published or Draft)']]
    : [['title', 'Story title'], ['quote', 'Quote'], ['author', 'Author'], ['role', 'Role'], ['client', 'Organisation'], ['status', 'Status (Published or Draft)']];

  async function save() {
    setSaving(true); setMessage('');
    try { await saveManagedContent(contentKey, items); setMessage('Published to the public site.'); }
    catch (error: any) { setMessage(error.message || 'Could not save content.'); }
    finally { setSaving(false); }
  }

  function addItem() {
    const item = kind === 'partner'
      ? { id: `partner-${Date.now()}`, title: 'New partner', image: '', website: '', description: '', status: 'Published' }
      : { id: `perspective-${Date.now()}`, title: 'New client story', quote: 'Add the client quote here.', author: 'Client name', role: 'Role', client: 'Organisation', status: 'Published', image: '' };
    setItems([...items, item]);
  }

  return <section><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Homepage content</p><h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">{title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{description}</p></div><div className="flex gap-2"><button onClick={addItem} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-[#087FD1] hover:text-[#087FD1]"><Plus className="h-3.5 w-3.5" /> Add item</button><button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-[#000741] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"><Save className="h-3.5 w-3.5" />{saving ? 'Publishing...' : 'Publish changes'}</button></div></div><div className="mt-8 space-y-4">{items.map((item, index) => <motion.article key={item.id || index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,21,47,0.03)]"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><p className="text-xs font-semibold text-slate-700">{item.title || 'Untitled content'}</p><p className="mt-1 text-[11px] text-slate-400">{item.status || 'Published'}</p></div><button onClick={() => setItems(items.filter((_item, itemIndex) => itemIndex !== index))} aria-label="Delete content" className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2">{kind === 'partner' && <ImageUploadField label="Logo image" value={item.image} onChange={(value) => setItems(items.map((current, itemIndex) => itemIndex === index ? { ...current, image: value } : current))} />}{fields.map(([key, label]) => <div key={key} className={key === 'quote' || key === 'description' ? 'md:col-span-2' : ''}><Field label={label} value={item[key] || ''} multiline={key === 'quote' || key === 'description'} onChange={(value) => setItems(items.map((current, itemIndex) => itemIndex === index ? { ...current, [key]: value } : current))} /></div>)}</div></motion.article>)}</div>{message && <p className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-700"><Check className="h-3.5 w-3.5" />{message}</p>}</section>;
}

function ImageUploadField({ label, value, onChange }: { label: string; value?: string; onChange: (value: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Images must be 5 MB or smaller.'); return; }
    if (!supabase) { setError('Supabase is not configured.'); return; }
    setUploading(true); setError('');
    const extension = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'image';
    const path = `uploads/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from('site-media').upload(path, file, { contentType: file.type });
    if (uploadError) { setError(uploadError.message); setUploading(false); return; }
    const { data } = supabase.storage.from('site-media').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return <label className="block min-w-0 text-xs font-semibold text-slate-600">{label}<span className="mt-2 flex min-h-24 flex-col gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50/40 p-3 sm:flex-row sm:items-center">{value && <img src={value} alt="Current upload" className="h-16 w-16 shrink-0 rounded object-cover" />}<span className="min-w-0 flex-1"><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => upload(event.target.files?.[0])} disabled={uploading} className="block w-full max-w-full overflow-hidden text-xs text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-[#eaf3ff] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#087FD1] hover:file:bg-blue-100" /><small className="mt-1 block break-words font-normal text-slate-400">{uploading ? 'Uploading image…' : 'PNG, JPG, WEBP or GIF · up to 5 MB'}</small></span></span>{error && <small className="mt-1 block font-normal text-red-600">{error}</small>}</label>;
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  const className = 'mt-2 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 py-3 text-sm font-normal text-[#000741] outline-none transition-colors focus:border-[#087FD1] focus:bg-white';
  return <label className="block min-w-0 text-xs font-semibold text-slate-600">{label}{multiline ? <textarea rows={3} value={value || ''} onChange={(event) => onChange(event.target.value)} className={`${className} resize-y`} /> : <input value={value || ''} onChange={(event) => onChange(event.target.value)} className={className} />}</label>;
}

function MediaLibraryPanel() {
  const [files, setFiles] = useState<any[]>([]);
  useEffect(() => { supabase?.storage.from('site-media').list('uploads', { limit: 100 }).then(({ data }) => setFiles(data || [])); }, []);
  return <section><h2 className="text-3xl font-light tracking-tight">Media library</h2><p className="mt-2 text-sm text-slate-500">Images uploaded from the content editors.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{files.map((file) => { const { data } = supabase!.storage.from('site-media').getPublicUrl(`uploads/${file.name}`); return <article key={file.id || file.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><img src={data.publicUrl} alt={file.name} className="h-40 w-full object-cover" /><p className="truncate px-3 py-3 text-xs font-medium text-slate-600">{file.name}</p></article>; })}</div>{!files.length && <p className="mt-8 text-sm text-slate-500">No uploaded images yet.</p>}</section>;
}

function SubscribersPanel() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getNewsletterSubscribers().then(setSubscribers).catch((reason) => setError(reason.message || 'Could not load subscribers.')).finally(() => setLoading(false));
  }, []);

  const activeCount = subscribers.filter((subscriber) => subscriber.status === 'subscribed').length;
  return <section>
    <p className="text-sm text-slate-500">Email updates</p>
    <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-light tracking-tight sm:text-4xl">Subscribers</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">People who opted in through the website. Email sending will be available once an email provider is connected.</p></div><span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#087FD1]">{activeCount} active</span></div>
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(7,21,47,0.03)]">
      <div className="hidden grid-cols-[minmax(220px,1fr)_130px_180px] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:grid"><span>Email</span><span>Status</span><span>Subscribed</span></div>
      {loading && <p className="p-10 text-center text-sm text-slate-500">Loading subscribers…</p>}
      {!loading && error && <p role="alert" className="p-8 text-sm text-red-600">{error}<br /><span className="mt-2 block text-xs text-slate-500">Run migration <code>007_newsletter_subscribers.sql</code> in Supabase, then refresh this page.</span></p>}
      {!loading && !error && subscribers.map((subscriber) => <article key={subscriber.id} className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[minmax(220px,1fr)_130px_180px] sm:items-center sm:gap-4"><p className="break-all text-sm font-medium text-slate-800">{subscriber.email}</p><span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${subscriber.status === 'subscribed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{subscriber.status}</span><p className="text-xs text-slate-600">{new Date(subscriber.subscribed_at).toLocaleString()}</p></article>)}
      {!loading && !error && !subscribers.length && <p className="p-10 text-center text-sm text-slate-500">No subscribers yet.</p>}
    </div>
  </section>;
}

const subjectLimit = 200;
const contentLimit = 5000;
const massSendingEnabled = true;

function EmailUpdatesPanel() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [headerImageUrl, setHeaderImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const testSendInFlight = useRef(false);

  useEffect(() => {
    supabase?.auth.getUser().then(({ data }) => setAdminEmail(data?.user?.email || '')).catch(() => setAdminEmail(''));
    getNewsletterSubscribers().then((subscribers) => setActiveCount(subscribers.filter((subscriber) => subscriber.status === 'subscribed').length)).catch(() => setActiveCount(null));
  }, []);

  const cleanSubject = subject.trim();
  const cleanContent = content.trim();
  const subjectValid = Boolean(cleanSubject) && cleanSubject.length <= subjectLimit;
  const contentValid = Boolean(cleanContent) && cleanContent.length <= contentLimit;
  const canSend = subjectValid && contentValid && !sending && !uploadingImage;

  async function uploadHeaderImage(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      setError('Choose an image file (PNG, JPEG, GIF, or WebP) smaller than 5 MB.');
      return;
    }
    if (!supabase) { setError('Media uploads are not configured yet.'); return; }
    setUploadingImage(true); setError('');
    try {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
      const path = `newsletter/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('site-media').upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('site-media').getPublicUrl(path);
      setHeaderImageUrl(data.publicUrl);
    } catch (reason: any) {
      setError(reason.message || 'Could not upload the newsletter image.');
    } finally { setUploadingImage(false); }
  }

  async function sendTest(event: FormEvent) {
    event.preventDefault();
    if (!canSend || testSendInFlight.current) return;
    testSendInFlight.current = true;
    setSending(true); setMessage(''); setError('');
    try {
      await sendNewsletterTest(cleanSubject, cleanContent, headerImageUrl || undefined);
      setError('');
      setMessage(`Test email sent to ${adminEmail || 'your admin address'}. Check your inbox, then review the live preview.`);
    } catch (reason: any) {
      setMessage('');
      setError(reason.message || 'Could not send the test email.');
    } finally { testSendInFlight.current = false; setSending(false); }
  }

  async function sendCampaign() {
    if (!canSend || !massSendingEnabled) return;
    const recipientLabel = activeCount === null ? 'all active subscribers' : `${activeCount} active subscriber${activeCount === 1 ? '' : 's'}`;
    if (!window.confirm(`Send this email to ${recipientLabel}? This cannot be undone.`)) return;
    setSending(true); setMessage(''); setError('');
    try {
      const result = await sendNewsletterCampaign(cleanSubject, cleanContent, headerImageUrl || undefined);
      setMessage(`Campaign complete: ${result.accepted} accepted by Resend${result.failed ? `, ${result.failed} failed` : ''}.`);
    } catch (reason: any) {
      setError(reason.message || 'Could not send the campaign.');
    } finally { setSending(false); }
  }

  const inputClass = 'mt-2 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 py-3 text-sm font-normal text-[#000741] outline-none transition-colors focus:border-[#087FD1] focus:bg-white';

  return <section>
    <p className="text-sm text-slate-500">Email updates</p>
    <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-3xl font-light tracking-tight sm:text-4xl">Compose an update</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Write the newsletter, optionally add a header image, preview it, and send a test to your own inbox.</p></div><span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#087FD1]">{activeCount === null ? 'Loading' : `${activeCount} active`}</span></div>

    <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <form onSubmit={sendTest} className="admin-card overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><div className="admin-section-icon"><Send className="h-5 w-5" /></div><div><h3 className="font-semibold">Email content</h3><p className="mt-0.5 text-xs text-slate-500">Plain text. Line breaks are kept in the email.</p></div></div><button disabled={!canSend} className="admin-primary-action flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"><Send className="h-3.5 w-3.5" />{sending ? 'Sending…' : 'Send test to me'}</button></div>
        <div className="grid gap-5 p-6">
          <label className="block min-w-0 text-xs font-semibold text-slate-600">Subject<span className="mt-0.5 ml-2 font-normal text-slate-400">{subject.length}/{subjectLimit}</span><input value={subject} maxLength={subjectLimit} onChange={(event) => setSubject(event.target.value)} placeholder="What is this update about?" className={inputClass} /></label>
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold text-slate-700">Header image <span className="font-normal text-slate-400">(optional)</span></p><p className="mt-1 text-[11px] text-slate-500">Appears above the newsletter content. PNG, JPEG, GIF, or WebP; up to 5 MB.</p></div><label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#087FD1] bg-white px-3 py-2 text-xs font-semibold text-[#087FD1] hover:bg-blue-50"><Upload className="h-3.5 w-3.5" />{uploadingImage ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/png,image/jpeg,image/gif,image/webp" className="sr-only" disabled={uploadingImage} onChange={(event) => { void uploadHeaderImage(event.target.files?.[0]); event.currentTarget.value = ''; }} /></label></div>{headerImageUrl && <div className="mt-4 flex items-start gap-3"><img src={headerImageUrl} alt="Newsletter header preview" className="h-20 w-32 rounded-lg border border-slate-200 object-cover" /><div><p className="text-xs font-medium text-emerald-700">Header image ready</p><button type="button" onClick={() => setHeaderImageUrl('')} className="mt-2 text-xs font-semibold text-red-600 hover:underline">Remove image</button></div></div>}</div>
          <label className="block min-w-0 text-xs font-semibold text-slate-600">Message<span className="mt-0.5 ml-2 font-normal text-slate-400">{content.length}/{contentLimit}</span><textarea rows={14} value={content} maxLength={contentLimit} onChange={(event) => setContent(event.target.value)} placeholder="Write the update your subscribers will receive." className={`${inputClass} resize-y leading-6`} /></label>
          {!subjectValid && <p className="text-xs text-slate-500">Add a subject of {subjectLimit} characters or fewer.</p>}
          {!contentValid && <p className="text-xs text-slate-500">Add a message of {contentLimit} characters or fewer.</p>}
          {message && <p role="status" className="flex items-start gap-2 text-xs text-emerald-700"><Check className="mt-px h-3.5 w-3.5 shrink-0" />{message}</p>}
          {error && <p role="alert" className="text-xs leading-5 text-red-600">{error}<br /><span className="mt-1 block text-slate-500">If this continues, check the latest newsletter Edge Function invocation in Supabase for its status and error detail.</span></p>}
        </div>
        <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">Test sends go to <span className="font-semibold text-slate-700">{adminEmail || 'your signed-in admin address'}</span> only.</p>
          <button type="button" onClick={sendCampaign} disabled={!massSendingEnabled || !canSend || sending} className="flex w-fit items-center gap-2 rounded-lg border border-[#087FD1] bg-white px-4 py-2.5 text-xs font-semibold text-[#087FD1] disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400" title="Sends only to active subscribers after confirmation.">{!massSendingEnabled && <Lock className="h-3.5 w-3.5" />} Send to all subscribers</button>
        </div>
      </form>

      <aside className="space-y-4">
        <div className="admin-preview"><div className="flex items-center justify-between"><p>Inbox preview</p><Mail className="h-4 w-4" /></div><div className="mt-9"><span>Subject</span><h3>{cleanSubject || 'Your subject appears here'}</h3><p className="whitespace-pre-line">{cleanContent || 'Your message appears here exactly as subscribers will read it.'}</p></div><div className="mt-8 border-t border-white/10 pt-4 text-xs text-blue-100/60">Test emails arrive with a “[Test]” prefix so they are never confused with live sends.</div></div>
        <div className="admin-card p-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><Check className="h-4 w-4" /></span><div><h3 className="text-sm font-semibold text-slate-800">Sending to all subscribers</h3><p className="text-xs text-slate-500">Campaign sending is ready after Resend is configured.</p></div></div><p className="mt-4 text-sm leading-6 text-slate-500">Every campaign requires confirmation, reaches only active subscribers, records accepted and failed messages, and includes a one-click unsubscribe link.</p><ol className="mt-4 space-y-2 text-xs leading-5 text-slate-500"><li>1. Verify the Resend sending domain.</li><li>2. Set <code>RESEND_API_KEY</code> and <code>RESEND_FROM_EMAIL</code> in Supabase Edge Function secrets.</li><li>3. Run migration <code>009_newsletter_campaigns.sql</code> and deploy the campaign functions.</li></ol></div>
      </aside>
    </div>
  </section>;
}

function UsersPanel() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminAccounts().then(setAccounts).catch((reason) => setError(reason.message || 'Could not load dashboard accounts.')).finally(() => setLoading(false));
  }, []);

  return <section>
    <p className="text-sm text-slate-500">Dashboard access</p>
    <h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">Users & roles</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Only accounts approved as administrators appear here. Sensitive authentication data, such as passwords and tokens, is never shown.</p>
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(7,21,47,0.03)]">
      <div className="hidden grid-cols-[minmax(180px,1.3fr)_110px_120px_150px_160px] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 lg:grid"><span>Account</span><span>Role</span><span>MFA</span><span>Last sign-in</span><span>Access since</span></div>
      {loading && <p className="p-10 text-center text-sm text-slate-500">Loading approved accounts…</p>}
      {!loading && error && <AdminDataError error={error} />}
      {!loading && !error && accounts.map((account) => <article key={account.id} className="grid gap-3 border-b border-slate-100 px-5 py-5 last:border-0 lg:grid-cols-[minmax(180px,1.3fr)_110px_120px_150px_160px] lg:items-center lg:gap-4"><div><p className="font-semibold text-slate-800">{account.display_name || account.email}</p><p className="mt-1 text-xs text-slate-500">{account.email} · {account.provider || 'Email'} sign-in</p></div><span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-[#087FD1]">{account.role}</span><span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${account.mfa_enrolled ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{account.mfa_enrolled ? 'Verified' : 'Not enrolled'}</span><p className="text-xs text-slate-600">{account.last_sign_in_at ? new Date(account.last_sign_in_at).toLocaleString() : 'Not signed in yet'}</p><p className="text-xs text-slate-600">{new Date(account.created_at).toLocaleDateString()}</p></article>)}
      {!loading && !error && !accounts.length && <p className="p-10 text-center text-sm text-slate-500">No administrator accounts have been approved yet.</p>}
    </div>
    <p className="mt-5 text-xs leading-5 text-slate-500">To grant access, create the account in Supabase Authentication and set <code>app_metadata.role = 'admin'</code>. Administrators must also enroll MFA before they can use the dashboard.</p>
  </section>;
}

function ActivityPanel() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminActivity().then(setActivities).catch((reason) => setError(reason.message || 'Could not load activity history.')).finally(() => setLoading(false));
  }, []);

  return <section>
    <p className="text-sm text-slate-500">Security and change history</p>
    <h2 className="mt-1 text-3xl font-light tracking-tight sm:text-4xl">Activity log</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Records dashboard sign-ins and sign-outs, published content changes, homepage edits, and consultation status updates.</p>
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(7,21,47,0.03)]">
      {loading && <p className="p-10 text-center text-sm text-slate-500">Loading activity history…</p>}
      {!loading && error && <AdminDataError error={error} />}
      {!loading && !error && activities.map((activity) => <article key={activity.id} className="flex gap-4 border-b border-slate-100 p-5 last:border-0"><span className="admin-activity-icon"><Activity className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{activity.summary}</p><p className="mt-1 text-xs text-slate-500">{activity.actor_email || 'System'} · {new Date(activity.occurred_at).toLocaleString()}</p>{activity.metadata?.previous_status !== undefined && <p className="mt-2 text-xs text-slate-600">Status: {String(activity.metadata.previous_status)} → {String(activity.metadata.new_status)}</p>}</div><span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:inline-flex">{activity.action}</span></article>)}
      {!loading && !error && !activities.length && <p className="p-10 text-center text-sm text-slate-500">No dashboard activity has been recorded yet.</p>}
    </div>
  </section>;
}

function AdminDataError({ error }: { error: string }) {
  const migrationMissing = /PGRST202|42P01|schema cache|could not find (the )?(table|function)/i.test(error);
  const accessDenied = /42501|administrator access with mfa is required/i.test(error);
  const guidance = migrationMissing
    ? <>Run migration <code>006_admin_accounts_and_activity_log.sql</code> in Supabase, then refresh this page.</>
    : accessDenied
      ? <>This account needs the <code>admin</code> app role and a fresh MFA-verified sign-in. Sign out, sign in again, and complete MFA.</>
      : <>Check the Supabase connection and your administrator access, then refresh the page.</>;
  return <p role="alert" className="p-8 text-sm text-red-600">{error}<br /><span className="mt-2 block text-xs text-slate-500">{guidance}</span></p>;
}
