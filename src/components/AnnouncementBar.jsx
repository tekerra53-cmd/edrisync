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
          className="fixed top-0 left-0 right-0 z-[60] min-h-10 flex items-center justify-center text-center px-3 sm:px-6 py-2"
          style={{ backgroundColor: '#061153' }}
        >
          {/* Center content — wraps cleanly on small screens */}
          <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-3 text-[11px] sm:text-sm text-white pr-7 sm:pr-0">
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

          {/* Right: dismiss (floated so it never squeezes the text) */}
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1 rounded"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
