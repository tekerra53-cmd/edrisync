import { supabase } from '../lib/supabase';

export type HeroSettings = {
  eyebrow: string;
  title: string;
  description: string;
  overlayColor: string;
};

export const defaultHeroSettings: HeroSettings = {
  eyebrow: 'Innovative Solutions',
  title: 'EdriSync',
  description:
    'We are a Cybersecurity, GRC, Microsoft Enablement, and Digital Transformation advisory and implementation firm, helping organizations position technology as a strategic business enabler rather than a point-solution vendor.',
  overlayColor: '#000741',
};

export async function getHeroSettings(): Promise<HeroSettings> {
  if (!supabase) return defaultHeroSettings;

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'hero')
    .maybeSingle();

  if (error || !data?.value) return defaultHeroSettings;
  return { ...defaultHeroSettings, ...data.value };
}

export async function saveHeroSettings(settings: HeroSettings) {
  if (!supabase) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');

  const { error } = await supabase.from('site_settings').upsert({
    key: 'hero',
    value: settings,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}
