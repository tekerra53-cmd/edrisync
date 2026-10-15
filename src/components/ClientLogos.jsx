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
  return null;
}
