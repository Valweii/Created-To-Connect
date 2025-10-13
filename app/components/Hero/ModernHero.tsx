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
    <div 
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat flex justify-center"
      style={{ 
        backgroundImage: 'url(/assets/BAGROUND.png)',
        height: '100dvh',
        minHeight: '100vh',
        maxHeight: '100dvh'
      }}
    >
      {/* Content container with max-width */}
      <div className="relative w-full max-w-[500px]">
      {/* Brush stroke decorations centered */}
      <div className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center">
        {/* BRUSH NOISE BIRU */}
        <motion.div 
          className="absolute will-change-transform"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/BRUSH NOISE BIRU.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE ORANGE - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -1, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <img
            src="/assets/BRUSH NOISE ORANGE.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE YELLOW */}
        <motion.div 
          className="absolute"
        >
          <img
            src="/assets/BRUSH NOISE YELLOW.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE BIRU MUDA 1 */}
        <motion.div 
          className="absolute will-change-transform"
          animate={{ 
            y: [0, 7, 0],
            x: [0, -4, 0]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        >
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 1.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE BIRU MUDA 2 - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden"
          animate={{ 
            y: [0, -9, 0],
            rotate: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 2.png"
            alt="Brush stroke"
            className="opacity-70"
          />
        </motion.div>

        {/* CREATED ATAS - Hidden on desktop/tablet, shown on mobile */}
        <div className="absolute top-0 md:hidden">
          <img
            src="/assets/CREATED ATAS.png"
            alt="Created Atas"
          />
        </div>

        {/* CG - Top of screen */}
        <div className="absolute top-0">
          <img
            src="/assets/CG.png"
            alt="CG"
          />
        </div>

        {/* CREATED BAWAH */}
        <div className="absolute bottom-0">
          <img
            src="/assets/CREATED BAWAH.png"
            alt="Created Bawah"
          />
        </div>

        {/* ELEMENT 2 */}
        <motion.div 
          className="absolute animate-optimized"
          animate={{ 
            rotate: [0, 2, -2, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/ELEMENT 2.png"
            alt="Element 2"
          />
        </motion.div>

        {/* ELEMENT 3 - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden"
          animate={{ 
            rotate: [0, -2, 2, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        >
          <img
            src="/assets/ELEMENT 3.png"
            alt="Element 3"
          />
        </motion.div>

        {/* ELEMENT DOODLE 1 */}
        <motion.div 
          className="absolute will-change-transform"
          animate={{ 
            rotate: [0, 1.5, -1.5, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 8.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        >
          <img
            src="/assets/ELEMENT DOODLE 1.png"
            alt="Element Doodle 1"
          />
        </motion.div>

        {/* SHAPE OREN - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/SHAPE OREN.png"
            alt="Shape Oren"
          />
        </motion.div>

        {/* SHAPE BIRU TUA */}
        <motion.div 
          className="absolute animate-optimized"
          animate={{ 
            scale: [1, 1.04, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <img
            src="/assets/SHAPE BIRU TUA.png"
            alt="Shape Biru Tua"
          />
        </motion.div>

        {/* SHAPE BIRU GRAD */}
        <motion.div 
          className="absolute animate-optimized"
          animate={{ 
            scale: [1, 1.06, 1],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <img
            src="/assets/SHAPE BIRU GRAD.png"
            alt="Shape Biru Grad"
          />
        </motion.div>

        {/* OVERLAY AUDIO - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute z-[2] md:hidden"
          animate={{ 
            scale: [1, 1.08, 1],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/OVERLAY AUDIO.png"
            alt="Overlay Audio"
          />
        </motion.div>

        {/* INFO 1 DETAIL elements - In front of all other elements except logo */}
        {/* TRANSPARANT HITAM 2 */}
        <div className="absolute z-[5] mb-6">
          <img
            src="/assets/INFO 1 DETAIL/TRANSPARANT HITAM 2.png"
            alt="Transparant Hitam 2"
          />
        </div>

        {/* THU */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/THU.png"
            alt="THU"
          />
        </div>

        {/* 20 NOVEMBER 2025 */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/20 NOVEMBER 2025.png"
            alt="20 November 2025"
          />
        </div>

        {/* JESUS with complex visual effects */}
        <div className="absolute -z-10 opacity-30">
          {/* Base halftone background */}
              <div className="relative">
            {/* Halftone pattern background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)`,
                backgroundSize: '8px 8px'
              }}
            />
            
            {/* Graffiti layer with blend mode */}
            <div className="relative mix-blend-overlay">
              <img
                src="/assets/JESUS.png"
                alt="Jesus"
                className="w-full h-auto"
                style={{
                  filter: 'contrast(1.2) saturate(1.3) brightness(0.9)',
                  mixBlendMode: 'overlay'
                }}
              />
              </div>
            
            {/* Blurred colored glow layer */}
            <div 
              className="absolute inset-0 mix-blend-screen opacity-60"
              style={{
                filter: 'blur(20px) brightness(1.5) saturate(1.8)',
                background: 'linear-gradient(45deg, rgba(0,100,255,0.6), rgba(255,100,0,0.4), rgba(255,255,0,0.3))'
              }}
            />
            
            {/* Duplicate layer for enhanced glow */}
            <div 
              className="absolute inset-0 mix-blend-screen opacity-40"
              style={{
                filter: 'blur(40px) brightness(2) saturate(2)',
                background: 'radial-gradient(ellipse at center, rgba(0,150,255,0.8) 0%, rgba(255,150,0,0.6) 50%, transparent 100%)'
              }}
            />
            
            {/* Soft vertical mask for top fade */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 100%)'
              }}
            />
              </div>
            </div>
          </div>

      {/* Main content - logo and register button */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="flex justify-center flex-shrink-0 mb-4"
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/LOGO.png"
            alt="Logo"
          />
        </motion.div>
      </div>

      {/* Register Button - Sticky to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-20 pt-4">
        <motion.button
          onClick={onRegisterClick}
          className="group relative w-full max-w-xs py-2 bg-sunshine text-midnight font-bebas text-sm tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 overflow-hidden"
          animate={{ 
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-1">
            REGISTER NOW
            <motion.span 
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
      </div>

      {/* Right-side decorative elements for desktop/tablet */}
      <div className="hidden md:block pointer-events-none">
        {/* CREATED ATAS - Right positioned - Static for performance */}
        <div className="fixed top-0 right-0 z-[1] animate-optimized">
          <img
            src="/assets/CREATED ATAS.png"
            alt="Created Atas"
            className="w-full h-auto"
          />
        </div>

        {/* ELEMENT 3 - Right positioned - Desktop only animation */}
        <motion.div 
          className="fixed right-0 top-[-60%] z-[1] will-change-transform"
          animate={{ 
            rotate: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
          data-tablet-optimize="true"
        >
          <img
            src="/assets/ELEMENT 3.png"
            alt="Element 3"
            className="w-full h-auto lg:animate-optimized"
          />
        </motion.div>

        {/* SHAPE OREN - Right positioned - Simplified for tablet */}
        <motion.div 
          className="fixed right-0 top-[-60%] z-[1] will-change-opacity"
          animate={{ 
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/assets/SHAPE OREN.png"
            alt="Shape Oren"
            className="w-full h-auto"
          />
        </motion.div>

        {/* OVERLAY AUDIO - Right positioned - Desktop only animation */}
        <motion.div 
          className="fixed right-0 top-[-50%] z-[2] will-change-transform lg:animate-optimized"
          animate={{ 
            rotate: [0, 3, -3, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          data-tablet-optimize="true"
        >
          <img
            src="/assets/OVERLAY AUDIO.png"
            alt="Overlay Audio"
            className="w-full h-auto"
          />
        </motion.div>

        {/* BRUSH NOISE BIRU MUDA 2 - Right positioned - Simplified for tablet */}
        <motion.div 
          className="fixed right-0 top-[-70%] z-[1] will-change-transform"
          animate={{ 
            y: [0, -9, 0]
          }}
          transition={{ 
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 2.png"
            alt="Brush stroke"
            className="opacity-70 w-full h-auto"
          />
        </motion.div>

        {/* BRUSH NOISE ORANGE - Right positioned - Simplified for tablet */}
        <motion.div 
          className="fixed right-0 top-[-60%] z-[1] will-change-transform"
          animate={{ 
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <img
            src="/assets/BRUSH NOISE ORANGE.png"
            alt="Brush stroke"
            className="opacity-80 w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}

