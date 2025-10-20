'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ticketStorage, SavedTicket } from '../../../lib/ticketStorage';
import ModernConfirmation from './ModernConfirmation';

interface TicketCarouselProps {
  onBackToHome: () => void;
  onRegisterAnother: () => void;
}

export default function TicketCarousel({ onBackToHome, onRegisterAnother }: TicketCarouselProps) {
  const [tickets, setTickets] = useState<SavedTicket[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedTickets = ticketStorage.getAllTickets();
    setTickets(savedTickets);
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    
    if (info.offset.x > threshold && currentIndex > 0) {
      // Swipe right - go to previous ticket
      setCurrentIndex(prev => prev - 1);
    } else if (info.offset.x < -threshold && currentIndex < tickets.length - 1) {
      // Swipe left - go to next ticket
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < tickets.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-bebas text-4xl text-midnight mb-4">No Tickets Found</h1>
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-midnight text-cream font-bebas text-lg tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  const currentTicket = tickets[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-2 relative overflow-hidden bg-cover bg-center bg-no-repeat">
      {/* Navigation Arrows */}
      {tickets.length > 1 && (
        <>
          {/* Previous Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-midnight text-cream font-bebas text-lg neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              ←
            </button>
          )}

          {/* Next Arrow */}
          {currentIndex < tickets.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-midnight text-cream font-bebas text-lg neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              →
            </button>
          )}
        </>
      )}

      {/* Ticket Counter */}
      {tickets.length > 1 && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-midnight text-cream font-bebas text-sm px-3 py-1 neo-shadow">
            {currentIndex + 1} of {tickets.length}
          </div>
        </div>
      )}

      {/* Swipeable Ticket Container */}
      <motion.div
        className="w-full max-w-sm mx-auto px-8"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
        style={{ cursor: tickets.length > 1 ? 'grab' : 'default' }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-cream border-3 border-midnight neo-shadow p-4 w-full">
              {/* Success header */}
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block mb-3"
                >
                  <div 
                    className="w-16 h-16 bg-electric rounded-full flex items-center justify-center relative"
                    style={{
                      boxShadow: '3px 3px 0px rgba(0, 0, 0, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span 
                      className="text-4xl"
                      style={{
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '2px'
                      }}
                    >
                      ✓
                    </span>
                  </div>
                </motion.div>
                
                <h1 className="font-bebas text-3xl text-midnight mb-2 leading-none">
                  YOU&apos;RE IN!
                </h1>
                <p className="font-inter text-sm text-midnight/70">
                  Welcome to <span className="font-bold text-electric">Created 2 Connect</span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-midnight/20 my-4" />

              {/* Ticket details */}
              <div className="space-y-3">
                {/* WhatsApp Group Button */}
                <motion.a
                  href="https://wa.me/6281234567890?text=Hi!%20I%20just%20registered%20for%20Created%202%20Connect%20Youth%20Camp%202025%20and%20would%20like%20to%20join%20the%20WhatsApp%20group!"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-green-500 text-white font-bebas text-sm tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  style={{
                    boxShadow: '3px 3px 0px rgba(0, 0, 0, 1)',
                    backgroundColor: '#25D366'
                  }}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  JOIN WHATSAPP GROUP
                </motion.a>

                <div className="bg-sunshine/20 border-2 border-sunshine p-3">
                  <p className="text-xs text-midnight/60 font-inter uppercase tracking-wider mb-1">Your Ticket ID</p>
                  <p className="text-lg font-bebas text-midnight tracking-wide">{currentTicket.ticketId}</p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-midnight p-3 neo-shadow"
                  >
                    <img src={currentTicket.qrUrl} alt="Ticket QR Code" width={160} height={160} />
                  </motion.div>
                </div>

                <div className="bg-flame/10 border-2 border-flame p-2">
                  <p className="text-center font-inter text-midnight text-xs">
                    <span className="font-bold">Save this QR code</span> for event check-in!
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4">
                <button
                  onClick={onBackToHome}
                  className="w-full px-4 py-2 border-2 border-midnight text-midnight font-bebas text-sm tracking-wider hover:bg-midnight hover:text-cream transition-all"
                >
                  BACK TO HOME
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
