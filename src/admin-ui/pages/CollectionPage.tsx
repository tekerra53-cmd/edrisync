import { Check, Loader2, Pencil, Plus, Save, Trash2, Users, Building2, Quote, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getManagedContent, saveManagedContent } from '../../services/managedContent';
import { defaultPartners } from '../../components/ClientLogos';
import { defaultClientPerspectives } from '../../components/Testimonials';
import { defaultTeamMembers } from '../../components/AboutPage';

type CollectionType = 'team' | 'partners' | 'perspectives';
type Status = 'Published' | 'Draft';
type Item = { id: string; title: string; status: Status; [key: string]: string };

const configs = {
  team: { key: 'team', title: 'Team', description: 'Manage the people and leadership profiles shown across the EdriSync website.', add: 'Add team member', icon: Users, fields: [['title', 'Full name'], ['role', 'Role'], ['image', 'Photo URL'], ['bio', 'Biography']] },
  partners: { key: 'partners', title: 'Partners', description: 'Trusted by forward-thinking companies worldwide.', add: 'Add partner', icon: Building2, fields: [['title', 'Partner name'], ['category', 'Category'], ['website', 'Website URL'], ['image', 'Logo URL'], ['description', 'Description']] },
  perspectives: { key: 'client_perspectives', title: 'Client Perspective', description: 'Curate the client stories, testimonials, and outcomes that build trust.', add: 'Add client perspective', icon: Quote, fields: [['title', 'Story headline'], ['client', 'Client / organisation'], ['author', 'Author name and role'], ['image', 'Photo URL'], ['quote', 'Client quote']] },
} as const;

const defaults: Record<CollectionType, Item[]> = {
  team: defaultTeamMembers.map((member, index) => ({ id: `team-${index + 1}`, title: member.name, role: member.role, image: member.image, bio: member.bio, status: 'Published' as Status })),
  partners: defaultPartners,
  perspectives: defaultClientPerspectives,
};

function newItem(type: CollectionType): Item { return { ...defaults[type][0], id: `${type}-${Date.now()}` }; }

export default function CollectionPage({ type }: { type: CollectionType }) {
  const config = configs[type];
  const Icon = config.icon;
  const [items, setItems] = useState<Item[]>(defaults[type]);
  const [active, setActive] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const hasChanges = useMemo(() => Boolean(active), [active]);

  useEffect(() => { let mounted = true; setLoading(true); getManagedContent<Item[]>(config.key, defaults[type]).then((value) => { if (mounted) { setItems(value); setLoading(false); } }); return () => { mounted = false; }; }, [config.key, type]);
  function edit(item: Item) { setNotice(''); setActive({ ...item }); }
  function create() { setNotice(''); setActive(newItem(type)); }
  function update(key: string, value: string) { setActive((current) => current ? { ...current, [key]: value } : current); }
  function commit() { if (!active) return; setItems((current) => current.some((item) => item.id === active.id) ? current.map((item) => item.id === active.id ? active : item) : [...current, active]); setActive(null); setNotice('Entry updated. Publish changes to make it live.'); }
  function remove(id: string) { setItems((current) => current.filter((item) => item.id !== id)); if (active?.id === id) setActive(null); setNotice('Entry removed. Publish changes to apply it.'); }
  async function publish() { setSaving(true); setNotice(''); try { await saveManagedContent(config.key, items); setNotice('Changes published successfully.'); } catch (error: any) { setNotice(error.message || 'Could not publish changes.'); } finally { setSaving(false); } }

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="text-2xl font-semibold text-gray-900">{config.title}</h2><p className="mt-2 max-w-2xl text-gray-600">{config.description}</p></div><div className="flex gap-3"><button onClick={create} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"><Plus size={17} />{config.add}</button><button onClick={publish} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-700 disabled:opacity-60"><Save size={17} />{saving ? 'Publishing...' : 'Publish changes'}</button></div></div>
    {notice && <p className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"><Check size={16} />{notice}</p>}
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm"><div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4"><span className="rounded-lg bg-blue-50 p-2 text-blue-600"><Icon size={20} /></span><div><h3 className="font-semibold text-gray-900">{config.title} collection</h3><p className="text-xs text-gray-500">{items.length} item{items.length === 1 ? '' : 's'} · use Edit to update every detail</p></div></div>{loading ? <div className="flex justify-center p-14 text-blue-600"><Loader2 className="animate-spin" /></div> : <div className="divide-y divide-gray-100">{items.map((item, index) => <article key={item.id} className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-gray-50"><span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">{String(index + 1).padStart(2, '0')}</span><div className="min-w-0 flex-1"><h4 className="font-medium text-gray-900">{item.title}</h4><p className="mt-1 truncate text-sm text-gray-500">{item.role || item.category || item.client || item.description || item.quote || 'No supporting detail yet'}</p></div><select value={item.status} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, status: event.target.value as Status } : entry))} className="rounded-full border-0 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 outline-none"><option value="Published">Published</option><option value="Draft">Draft</option></select><button onClick={() => edit(item)} aria-label={`Edit ${item.title}`} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white hover:text-blue-600"><Pencil size={17} /></button><button onClick={() => remove(item.id)} aria-label={`Delete ${item.title}`} className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"><Trash2 size={17} /></button></article>)}{items.length === 0 && <div className="px-6 py-14 text-center text-sm text-gray-500">No entries yet. Add your first one to begin.</div>}</div>}</div>
    {active && <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/35 p-4 sm:items-center"><section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"><header className="flex items-start justify-between border-b border-gray-200 px-6 py-5"><div><h3 className="text-lg font-semibold text-gray-900">{active.id.startsWith(type) && !items.some((item) => item.id === active.id) ? config.add : `Edit ${config.title.toLowerCase()}`}</h3><p className="mt-1 text-sm text-gray-500">Complete the fields below, then save this entry.</p></div><button onClick={() => setActive(null)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"><X size={19} /></button></header><div className="grid gap-5 p-6 sm:grid-cols-2">{config.fields.map(([key, label]) => <label key={key} className={`text-sm font-medium text-gray-700 ${key === 'bio' || key === 'description' || key === 'quote' ? 'sm:col-span-2' : ''}`}>{label}{key === 'bio' || key === 'description' || key === 'quote' ? <textarea rows={4} value={active[key] || ''} onChange={(event) => update(key, event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" /> : <input value={active[key] || ''} onChange={(event) => update(key, event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />}</label>)}<label className="text-sm font-medium text-gray-700">Publication status<select value={active.status} onChange={(event) => update('status', event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500"><option value="Draft">Draft</option><option value="Published">Published</option></select></label></div><footer className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4"><button onClick={() => setActive(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">Cancel</button><button onClick={commit} disabled={!hasChanges || !active.title.trim()} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"><Check size={16} />Save entry</button></footer></section></div>}
  </div>;
}
