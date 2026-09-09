import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AnnouncementBar({ onDismiss }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="announcement-fixed fixed top-0 left-0 right-0 z-[60] flex items-center justify-center text-center px-10 sm:px-12 py-2"
      style={{ backgroundColor: '#061153' }}
    >
      {/* Center content, wrapping cleanly on small screens */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-3 text-[11px] sm:text-sm text-white">
        <span className="opacity-90 leading-snug">
          Cloud Security Playbook is live, grab the free guide
        </span>
        <a
          href="#"
          className="text-white font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap"
          onClick={(e) => e.preventDefault()}
        >
          Download free →
        </a>
      </div>

      {/* Dismiss button, letting users remove the announcement */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
