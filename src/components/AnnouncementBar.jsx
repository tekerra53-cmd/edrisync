import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AnnouncementBar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="announcement-fixed fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 text-center px-3 sm:px-6 py-2"
          style={{ backgroundColor: '#061153' }}
        >
          {/* Center content — wraps cleanly on small screens, never hidden behind the X */}
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

          {/* Dismiss — flex sibling so it can never overlap the text */}
          <button
            onClick={onClose}
            aria-label="Dismiss announcement"
            className="shrink-0 text-white/60 hover:text-white transition-colors p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
