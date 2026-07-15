import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-[60] h-10 flex items-center justify-between px-6"
          style={{ backgroundColor: '#061153' }}
        >
          {/* Left spacer */}
          <div className="w-32 hidden md:block" />

          {/* Center content */}
          <div className="flex items-center gap-3 text-sm text-white">
            <span className="hidden sm:inline opacity-80">🚀</span>
            <span className="opacity-90">
              EdriSync 2026 Cloud Security Playbook is live — grab the free guide
            </span>
            <a
              href="#"
              className="text-white font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap ml-1"
              onClick={(e) => e.preventDefault()}
            >
              Download free →
            </a>
          </div>

          {/* Right: dismiss */}
          <div className="w-32 flex justify-end">
            <button
              onClick={() => setVisible(false)}
              className="text-white/60 hover:text-white transition-colors p-1 rounded"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
