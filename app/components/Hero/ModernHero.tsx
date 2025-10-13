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
      className="relative overflow-hidden flex justify-center"
      style={{ 
        height: '100vh',
        minHeight: '100vh',
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
            decoding="async"
          />
        </motion.div>

        {/* BRUSH NOISE ORANGE - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
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
            decoding="async"
          />
        </motion.div>



        {/* BRUSH NOISE BIRU MUDA 2 - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
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
            decoding="async"
          />
        </motion.div>

        {/* CREATED ATAS - Hidden on desktop/tablet, shown on mobile */}
        <div className="absolute top-0 md:hidden">
          <img
            src="/assets/CREATED ATAS.png"
            alt="Created Atas"
            decoding="async"
          />
        </div>

        {/* CG - Top of screen */}
        <div className="absolute top-0 z-[10]">
          <img
            src="/assets/CG.png"
            alt="CG"
            decoding="async"
          />
        </div>



        {/* ELEMENT 3 - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
          animate={{ 
            rotate: [0, -2, 2, 0]
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
            decoding="async"
            style={{ transform: 'translateZ(0)' }}
          />
        </motion.div>


        {/* SHAPE OREN - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
          animate={{ 
            scale: [1, 1.05, 1]
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
            decoding="async"
            style={{ opacity: 0.9 }}
          />
        </motion.div>



        {/* OVERLAY AUDIO - Hidden on desktop/tablet, shown on mobile */}
        <motion.div 
          className="absolute z-[2] md:hidden will-change-transform"
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
            decoding="async"
          />
        </motion.div>

        {/* Mobile versions of left-side decorative elements - Normal positioning */}
        {/* ELEMENT 2 - Mobile version */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
          animate={{ 
            rotate: [0, 2, -2, 0]
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
            decoding="async"
            style={{ transform: 'translateZ(0)' }}
          />
        </motion.div>

        {/* ELEMENT DOODLE 1 - Mobile version */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
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
            decoding="async"
          />
        </motion.div>

        {/* BRUSH NOISE BIRU MUDA 1 - Mobile version */}
        <motion.div 
          className="absolute md:hidden will-change-transform"
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
            decoding="async"
          />
        </motion.div>

        {/* BRUSH NOISE YELLOW - Mobile version */}
        <div className="absolute md:hidden">
          <img
            src="/assets/BRUSH NOISE YELLOW.png"
            alt="Brush stroke"
            className="opacity-80"
            decoding="async"
          />
        </div>

        {/* SHAPE BIRU TUA - Mobile version */}
        <motion.div 
          className="absolute md:hidden animate-optimized"
          animate={{ 
            scale: [1, 1.04, 1]
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
            decoding="async"
            style={{ opacity: 0.95 }}
          />
        </motion.div>

        {/* SHAPE BIRU GRAD - Mobile version */}
        <motion.div 
          className="absolute md:hidden animate-optimized"
          animate={{ 
            scale: [1, 1.06, 1]
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
            decoding="async"
            style={{ opacity: 0.9 }}
          />
        </motion.div>

        {/* CREATED BAWAH - Mobile version */}
        <div className="absolute bottom-0 md:hidden">
          <img
            src="/assets/CREATED BAWAH.png"
            alt="Created Bawah"
            decoding="async"
          />
        </div>

        {/* INFO 1 DETAIL elements - In front of all other elements except logo */}
        {/* TRANSPARANT HITAM 2 */}
        <div className="absolute z-[5] mb-6">
          <img
            src="/assets/INFO 1 DETAIL/TRANSPARANT HITAM 2.png"
            alt="Transparant Hitam 2"
            decoding="async"
          />
        </div>

        {/* THU */}
        <div className="absolute z-[5] mb-6">
          <img
            src="/assets/INFO 1 DETAIL/thu.png"
            alt="THU"
            decoding="async"
          />
        </div>

        {/* 20 NOVEMBER 2025 */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/20 NOVEMBER 2025.png"
            alt="20 November 2025"
            decoding="async"
          />
        </div>

        {/* CHAPEL 1 */}
        <div className="absolute z-[5] mb-6">
          <img
            src="/assets/INFO 1 DETAIL/CHAPEL 1.png"
            alt="Chapel 1"
            decoding="async"
          />
        </div>

        {/* GMS ALAM SUTERA */}
        <div className="absolute z-[5] mb-6">
          <img
            src="/assets/GMS ALAM SUTERA.png"
            alt="GMS Alam Sutera"
            decoding="async"
          />
        </div>

          </div>

      {/* Main content - logo and register button */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-4 max-w-full mx-auto will-change-transform md:justify-center">
        {/* Logo */}
        <motion.div 
          className="flex justify-center flex-shrink-0 mb-4 will-change-transform"
          animate={{ 
            y: [0, -10, 0]
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
            decoding="async"
            style={{ transform: 'translateZ(0)'}}
          />
        </motion.div>
      </div>

      {/* Register Button - Sticky to bottom - All screen sizes */}
      <div className="absolute bottom-40 left-0 right-0 z-10 flex justify-center pt-4">
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

      {/* Left-side decorative elements - Absolute positioning within hero section - Tablet and desktop only */}
      <div className="hidden md:block absolute left-0 top-0 w-full h-full pointer-events-none z-[1]">
        {/* ELEMENT 2 */}
        <motion.div 
          className="absolute will-change-transform"
          animate={{ 
            rotate: [0, 2, -2, 0]
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
            decoding="async"
            style={{ transform: 'translateZ(0)',
              scale: 0.7,
              margin: '-10rem 0 0 -10rem',
            }}
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
            decoding="async"
            style={{
              scale: 0.7,
              margin: '-20rem 0 0 -10rem',
            }}
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
            decoding="async"
            style={{
              scale: 0.5,
              margin: '-5rem 0 0 -15rem'
            }}
          />
        </motion.div>

        {/* BRUSH NOISE YELLOW */}
        <div className="absolute">
          <img
            src="/assets/BRUSH NOISE YELLOW.png"
            alt="Brush stroke"
            className="opacity-80"
            decoding="async"
            style={{
              scale: 0.7,
              margin: '-10rem 0 0 -10rem'
            }}
          />
        </div>

        {/* SHAPE BIRU TUA */}
        <motion.div 
          className="absolute animate-optimized"
          animate={{ 
            scale: [1, 1.04, 1]
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
            decoding="async"
            style={{ opacity: 0.95,
              scale: 0.7,
              margin: '-20rem 0 0 -10rem'
            }}
          />
        </motion.div>

        {/* SHAPE BIRU GRAD */}
        <motion.div 
          className="absolute animate-optimized"
          animate={{ 
            scale: [1, 1.06, 1]
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
            decoding="async"
            style={{ opacity: 0.9,
              scale: 0.7,
              margin: '-10rem 0 0 -10rem'
            }}
          />
        </motion.div>

        {/* CREATED BAWAH */}
        <div className="absolute bottom-0">
          <img
            src="/assets/CREATED BAWAH.png"
            alt="Created Bawah"
            decoding="async"
            style={{
              scale: 0.7,
              margin: '10rem 0 -18rem -10rem'
            }}
          />
        </div>
      </div>

      {/* Right-side decorative elements for desktop/tablet */}
      <div className="hidden md:block pointer-events-none">
        {/* CREATED ATAS - Right positioned - Static for performance */}
        <div className="absolute top-0 right-0 z-[1]">
          <img
            src="/assets/CREATED ATAS.png"
            alt="Created Atas"
            className="w-full h-auto"
            decoding="async"
          />
        </div>

        {/* ELEMENT 3 - Right positioned - Desktop only animation */}
        <motion.div 
          className="absolute right-0 top-[-60%] z-[1] will-change-transform"
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
            className="w-full h-auto"
            decoding="async"
          />
        </motion.div>

        {/* SHAPE OREN - Right positioned - Static opacity for tablet stability */}
        <div 
          className="absolute right-0 top-[-60%] z-[1]"
          style={{ opacity: 0.9 }}
        >
          <img
            src="/assets/SHAPE OREN.png"
            alt="Shape Oren"
            className="w-full h-auto"
            decoding="async"
          />
        </div>

        {/* OVERLAY AUDIO - Right positioned - Desktop only animation */}
        <motion.div 
          className="absolute right-0 top-[-50%] z-[2] will-change-transform"
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
            decoding="async"
          />
        </motion.div>

        {/* BRUSH NOISE BIRU MUDA 2 - Right positioned - Simplified for tablet */}
        <motion.div 
          className="absolute right-0 top-[-70%] z-[1] will-change-transform"
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
            decoding="async"
          />
        </motion.div>

        {/* BRUSH NOISE ORANGE - Right positioned - Simplified for tablet */}
        <motion.div 
          className="absolute right-0 top-[-60%] z-[1] will-change-transform"
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
            decoding="async"
          />
        </motion.div>
      </div>
    </div>
  );
}

