import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  'Growth Through Innovation',
  'Solutions to Empower Your Business',
  'Excellence in Every Line of Code',
];

const wordVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 40 : -40,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction) => ({
    y: direction > 0 ? -40 : 40,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

export default function AnimatedText({
  className = '',
  style = {},
  interval = 3800,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <span className={`inline-block ${className}`} style={style}>
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.span
          key={index}
          custom={direction}
          variants={wordVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            filter: { duration: 0.3 },
          }}
          className="inline-block"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
