'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ModernHeroProps {
  onRegisterClick: () => void;
  onViewTicketsClick?: () => void;
  hasExistingTickets?: boolean;
  showViewTickets?: boolean; // When true, shows "VIEW TICKETS" instead of "REGISTER"
}

export default function ModernHero({ 
  onRegisterClick, 
  onViewTicketsClick,
  hasExistingTickets = false,
  showViewTickets = false
}: ModernHeroProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleButtonClick = () => {
    // If showing view tickets button, navigate to tickets
    if (showViewTickets && onViewTicketsClick) {
      onViewTicketsClick();
      return;
    }
    
    // Otherwise, handle registration
    if (hasExistingTickets) {
      setShowConfirmDialog(true);
    } else {
      onRegisterClick();
    }
  };

  const handleConfirmYes = () => {
    setShowConfirmDialog(false);
    onRegisterClick();
  };

  const handleConfirmNo = () => {
    setShowConfirmDialog(false);
  };

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
          {/* BRUSH NOISE ORANGE */}
          <motion.div 
            className="absolute will-change-transform"
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
              src="/assets/BRUSH NOISE ORANGE.webp"
              alt="Brush stroke"
              className="opacity-80"
              decoding="async"
            />
          </motion.div>

          {/* BRUSH NOISE BIRU MUDA 2 */}
          <motion.div 
            className="absolute will-change-transform"
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
              src="/assets/BRUSH NOISE BIRU MUDA 2.webp"
              alt="Brush stroke"
              className="opacity-70"
              decoding="async"
            />
          </motion.div>

          {/* CREATED ATAS */}
          <div className="absolute top-0">
            <img
              src="/assets/CREATED ATAS.webp"
              alt="Created Atas"
              decoding="async"
            />
          </div>

          {/* CG - Top of screen */}
          <div className="absolute top-0 z-[10]">
            <img
              src="/assets/CG.webp"
              alt="CG"
              decoding="async"
            />
          </div>

          {/* ELEMENT 3 */}
          <motion.div 
            className="absolute will-change-transform"
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
              src="/assets/ELEMENT 3.webp"
              alt="Element 3"
              decoding="async"
              style={{ transform: 'translateZ(0)' }}
            />
          </motion.div>

          {/* SHAPE OREN */}
          <motion.div 
            className="absolute will-change-transform"
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
              src="/assets/SHAPE OREN.webp"
              alt="Shape Oren"
              decoding="async"
              style={{ opacity: 0.9 }}
            />
          </motion.div>

          {/* OVERLAY AUDIO */}
          <motion.div 
            className="absolute z-[2] will-change-transform"
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
              src="/assets/OVERLAY AUDIO.webp"
              alt="Overlay Audio"
              decoding="async"
            />
          </motion.div>

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
              src="/assets/ELEMENT 2.webp"
              alt="Element 2"
              decoding="async"
              style={{ transform: 'translateZ(0)' }}
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
              src="/assets/ELEMENT DOODLE 1.webp"
              alt="Element Doodle 1"
              decoding="async"
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
              src="/assets/BRUSH NOISE BIRU MUDA 1.webp"
              alt="Brush stroke"
              className="opacity-80"
              decoding="async"
            />
          </motion.div>

          {/* BRUSH NOISE YELLOW */}
          <div className="absolute">
            <img
              src="/assets/BRUSH NOISE YELLOW.webp"
              alt="Brush stroke"
              className="opacity-80"
              decoding="async"
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
              src="/assets/SHAPE BIRU TUA.webp"
              alt="Shape Biru Tua"
              decoding="async"
              style={{ opacity: 0.95 }}
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
              src="/assets/SHAPE BIRU GRAD.webp"
              alt="Shape Biru Grad"
              decoding="async"
              style={{ opacity: 0.9 }}
            />
          </motion.div>

          {/* CREATED BAWAH */}
          <div className="absolute bottom-0">
            <img
              src="/assets/CREATED BAWAH.webp"
              alt="Created Bawah"
              decoding="async"
            />
          </div>

          {/* INFO 1 DETAIL elements - In front of all other elements except logo */}
          {/* TRANSPARANT HITAM 2 */}
          <div className="absolute z-[5] mb-6">
            <img
              src="/assets/INFO 1 DETAIL/TRANSPARANT HITAM 2.webp"
              alt="Transparant Hitam 2"
              decoding="async"
            />
          </div>

          {/* THU */}
          <div className="absolute z-[5] mb-6">
            <img
              src="/assets/INFO 1 DETAIL/THU.webp"
              alt="THU"
              decoding="async"
            />
          </div>

          {/* 20 NOVEMBER 2025 */}
          <div className="absolute z-[5]">
            <img
              src="/assets/INFO 1 DETAIL/20 NOVEMBER 2025.webp"
              alt="20 November 2025"
              decoding="async"
            />
          </div>

          {/* CHAPEL 1 */}
          <div className="absolute z-[5] mb-6">
            <img
              src="/assets/INFO 1 DETAIL/CHAPEL 1.webp"
              alt="Chapel 1"
              decoding="async"
            />
          </div>

          {/* GMS ALAM SUTERA */}
          <div className="absolute z-[5] mb-6">
            <img
              src="/assets/GMS ALAM SUTERA.webp"
              alt="GMS Alam Sutera"
              decoding="async"
            />
          </div>
        </div>

        {/* Main content - logo and register button */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-4 max-w-full mx-auto will-change-transform">
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
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <img
              src="/assets/LOGO.webp"
              alt="Logo"
              decoding="async"
              style={{ 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </motion.div>
        </div>

        {/* Register/View Tickets Button - Sticky to bottom */}
        <div className="absolute bottom-[7rem] left-0 right-0 z-10 flex justify-center pt-4">
          <motion.button
            onClick={handleButtonClick}
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
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-1">
              {showViewTickets ? 'VIEW TICKETS' : 'REGISTER'}
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>


        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleConfirmNo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream border-4 border-midnight neo-shadow p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bebas text-2xl text-midnight mb-4 text-center">
                Register Another Person?
              </h3>
              <p className="font-inter text-midnight/70 mb-6 text-center">
                Do you want to register another person for the event?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmNo}
                  className="flex-1 px-4 py-2 border-3 border-midnight text-midnight font-bebas text-sm tracking-wider hover:bg-midnight hover:text-cream transition-all"
                >
                  NO
                </button>
                <button
                  onClick={handleConfirmYes}
                  className="flex-1 px-4 py-2 bg-midnight text-cream font-bebas text-sm tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  YES
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

