import { motion } from 'framer-motion';
import edrisyncLogo from '../assests/img/edrisync-logo.png';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #061153 0%, #0a1640 55%, #061153 100%)' }}
    >
      {/* Pulsing glow behind the logo */}
      <motion.div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,83,243,0.30), transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative flex flex-col items-center"
      >
        {/* Logo — gentle float */}
        <motion.img
          src={edrisyncLogo}
          alt="EdriSync"
          className="h-16 w-auto sm:h-20"
          style={{ filter: 'brightness(0) invert(1)' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          draggable={false}
        />

        <span
          className="mt-5 text-white/70 text-xs sm:text-sm tracking-[0.35em] uppercase"
          style={{ fontFamily: 'var(--font-family-heading)' }}
        >
          EdriSync
        </span>

        {/* Progress bar */}
        <div
          className="mt-5 h-1 w-40 sm:w-52 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.14)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #007dc1, #1053F3)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
