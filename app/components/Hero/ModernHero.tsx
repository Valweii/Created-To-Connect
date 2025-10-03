'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ModernHeroProps {
  onRegisterClick: () => void;
}

export default function ModernHero({ onRegisterClick }: ModernHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-electric overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-sunshine rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -left-32 w-64 h-64 bg-flame rounded-full opacity-20 blur-2xl"
        />
        
        {/* Geometric shapes */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-1/4 w-32 h-32 border-4 border-cream/20"
        />
        <motion.div
          animate={{ rotate: [360, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 left-1/3 w-20 h-20 bg-sunshine/30 rounded-full"
        />
        
        {/* Diagonal lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 -left-20 w-96 h-1 bg-cream/10 transform -rotate-45" />
          <div className="absolute bottom-1/3 -right-20 w-80 h-1 bg-sunshine/10 transform rotate-45" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        
        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute top-20 left-10 hidden lg:block"
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-32 right-10 hidden lg:block"
        >
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-flame text-cream px-4 py-2 font-bebas text-sm transform rotate-3"
          >
            20 NOV
          </motion.div>
        </motion.div>
        
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="w-12 h-1 bg-sunshine" />
          <span className="px-6 py-2 bg-midnight text-cream font-inter font-semibold text-sm uppercase tracking-wider rounded-full neo-shadow-sm">
            Youth Camp 2025
          </span>
          <div className="w-12 h-1 bg-sunshine" />
        </motion.div>

        {/* Main heading - large bold text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-32 sm:mb-40 md:mb-48"
        >
          <h1 className="font-bebas text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[20rem] leading-none tracking-tight text-sunshine mb-4">
            CONNECT
          </h1>
          
          {/* Overlapping text elements */}
          <div className="relative h-32 sm:h-40">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-24 sm:-top-32 left-0 sm:left-4 md:left-10"
            >
              {/* <p className="font-barlow text-3xl sm:text-4xl md:text-6xl font-bold text-cream uppercase tracking-wide">
                GROUP
              </p>
              <p className="font-inter text-sm sm:text-lg text-cream/80">(BARLOW)</p> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -3 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -top-16 sm:-top-20 right-0 sm:right-4 md:right-10 lg:right-20"
            >
              <div className="relative">
                <p className="font-bebas text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-flame transform -rotate-3">
                  #CREATED
                </p>
                <p className="font-bebas text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-cream -mt-2 sm:-mt-4 transform -rotate-3">
                  TO
                </p>
                <p className="font-bebas text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-sunshine -mt-2 sm:-mt-4 transform -rotate-3">
                  CONNECT
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <motion.button
            onClick={onRegisterClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 bg-sunshine text-midnight font-bebas text-3xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              REGISTER NOW
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="inline-block"
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-flame"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

        </motion.div>

        {/* Bottom decorative text with visual element */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-10 hidden md:block"
        >
          <div className="flex items-start gap-4">
            <div className="w-1 h-24 bg-sunshine" />
            <div>
              <p className="font-bebas text-cream text-2xl leading-tight">
                GOOD VIBES<br/>
                ARE COMING<br/>
                YOUR WAY
              </p>
              <div className="mt-2 flex items-center gap-2">
                {/* <div className="w-8 h-8 rounded-full bg-sunshine flex items-center justify-center">
                  <span className="text-midnight">✓</span>
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Character set display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute top-10 left-10 hidden lg:block"
        >
          {/* <div className="bg-midnight text-cream p-4 font-mono text-sm">
            <p>1234567890</p>
            <p>QWERTYUIOP</p>
            <p>ASDFGHJKL</p>
            <p>ZXCVBNM</p>
            <p>!@#$%^&*()'{`</`}'</p>
          </div> */}
        </motion.div>
      </div>

      {/* Scroll indicator - moved to center bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-3 border-cream rounded-full flex items-start justify-center p-1"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-cream rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

