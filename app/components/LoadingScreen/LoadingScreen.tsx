'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 1500); // Increased delay for smoother transition
          return 100;
        }
        // Random increment for more natural feel
        return prev + Math.random() * 15;
      });
    }, 150);

    // Ensure all images are loaded
    const images = [
      '/assets/BAGROUND.webp',
      '/assets/BRUSH NOISE BIRU MUDA 1.webp',
      '/assets/BRUSH NOISE BIRU MUDA 2.webp',
      '/assets/BRUSH NOISE BIRU.webp',
      '/assets/BRUSH NOISE ORANGE.webp',
      '/assets/BRUSH NOISE YELLOW.webp',
      '/assets/CG.webp',
      '/assets/CREATED ATAS.webp',
      '/assets/CREATED BAWAH.webp',
      '/assets/ELEMENT 2.webp',
      '/assets/ELEMENT 3.webp',
      '/assets/ELEMENT DOODLE 1.webp',
      '/assets/INFO 1.webp',
      '/assets/INFO 2.webp',
      '/assets/JESUS.webp',
      '/assets/LOGO.webp',
      '/assets/OVERLAY AUDIO.webp',
      '/assets/SHAPE BIRU GRAD.webp',
      '/assets/SHAPE BIRU TUA.webp',
      '/assets/SHAPE OREN.webp',
    ];

    let loadedCount = 0;
    const totalImages = images.length;

    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const calculatedProgress = (loadedCount / totalImages) * 100;
          setProgress(calculatedProgress);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(images.map(loadImage))
      .then(() => {
        setProgress(100);
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 1500); // Increased delay for smoother transition
      })
      .catch((error) => {
        console.error('Error loading images:', error);
        // Continue anyway after a delay
        setTimeout(() => {
          setProgress(100);
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 1500); // Increased delay for smoother transition
        }, 1000);
      });

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth fade
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
      >
        <div className="w-full max-w-md px-8">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="font-bebas text-6xl md:text-7xl text-midnight tracking-wider mb-2">
              CREATED
            </h1>
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-bebas text-5xl md:text-6xl text-midnight tracking-wider">
                TO
              </h2>
              <div className="w-12 h-1 bg-electric"></div>
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl text-electric tracking-wider">
              CONNECT
            </h1>
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Progress Bar Background */}
            <div className="w-full h-8 border-4 border-midnight bg-cream shadow-[6px_6px_0px_0px_rgba(31,31,31,1)]">
              {/* Progress Bar Fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-electric relative overflow-hidden"
              >
                {/* Animated pattern overlay */}
                <motion.div
                  animate={{
                    x: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ width: '50%' }}
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center"
            >
              <span className="font-bebas text-3xl text-midnight tracking-wider">
                {Math.round(progress)}%
              </span>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="font-inter text-midnight/60 text-sm uppercase tracking-wider">
                {isComplete ? 'Ready!' : 'Loading...'}
              </p>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-20 left-10 w-16 h-16 border-4 border-electric bg-cream rotate-12"
          />
          <motion.div
            animate={{
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute bottom-20 right-10 w-20 h-20 rounded-full border-4 border-midnight bg-electric/20"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

