'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress Component
 * Ultra-thin progress bar that shows reading progress
 * Perfect for blog posts and long-form content
 */
export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Spring animation for smooth progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Show progress bar after scrolling a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-gradient-to-r from-accent-cloud via-accent-ai to-accent-gamedev origin-left"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    />
  );
}
