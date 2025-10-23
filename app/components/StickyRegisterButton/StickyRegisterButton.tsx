'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StickyRegisterButtonProps {
  onRegisterClick: () => void;
  onViewTicketsClick?: () => void;
  hasExistingTickets?: boolean;
  isVisible: boolean;
  isCompact: boolean;
  showViewTickets?: boolean; // When true, shows "VIEW TICKETS" instead of "REGISTER"
}

export default function StickyRegisterButton({ 
  onRegisterClick, 
  onViewTicketsClick,
  hasExistingTickets = false,
  isVisible,
  isCompact,
  showViewTickets = false
}: StickyRegisterButtonProps) {
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
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 right-0 z-50 flex justify-center px-4 sticky-button-container"
            style={{
              top: 'max(3rem, env(safe-area-inset-top, 3rem))', // iOS safe area support
              WebkitTransform: 'translate3d(0,0,0)', // Force hardware acceleration
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <motion.button
              onClick={handleButtonClick}
              className="group relative bg-sunshine text-midnight font-bebas tracking-wider overflow-hidden sticky-button"
              animate={{ 
                width: isCompact ? '110px' : '100%',
                maxWidth: isCompact ? '110px' : '384px',
                paddingTop: isCompact ? '0.625rem' : '0.5rem',
                paddingBottom: isCompact ? '0.625rem' : '0.5rem',
                paddingLeft: isCompact ? '1rem' : '0',
                paddingRight: isCompact ? '1rem' : '0',
                borderRadius: isCompact ? '9999px' : '0px',
                boxShadow: isCompact 
                  ? '4px 4px 0px rgba(0, 0, 0, 1)' 
                  : '6px 6px 0px rgba(0, 0, 0, 1)',
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                scale: 1.05,
                translateX: 1,
                translateY: 1,
                boxShadow: isCompact 
                  ? '2px 2px 0px rgba(0, 0, 0, 1)' 
                  : '3px 3px 0px rgba(0, 0, 0, 1)',
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitTapHighlightColor: 'transparent', // Remove iOS tap highlight
                touchAction: 'manipulation' // Improve touch responsiveness
              }}
            >
              <motion.span 
                className="relative z-10 flex items-center justify-center gap-1"
                animate={{
                  fontSize: isCompact ? '0.75rem' : '0.875rem',
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {isCompact ? (
                    <motion.span
                      key="compact"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showViewTickets ? 'TICKETS' : 'REGISTER'}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1"
                    >
                      {showViewTickets ? (
                        <>
                          VIEW TICKETS
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
                        </>
                      ) : (
                        <>
                          REGISTER
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
                        </>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <div className="absolute inset-0 bg-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}

