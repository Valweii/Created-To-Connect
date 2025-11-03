'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { ticketStorage, SavedTicket } from '../../../lib/ticketStorage';
import ModernConfirmation from './ModernConfirmation';
import html2canvas from 'html2canvas';
import { img } from 'framer-motion/client';

interface TicketCarouselProps {
  onBackToHome: () => void;
  onRegisterAnother: () => void;
  shouldAutoDownload?: boolean; // Only auto-download if user just registered
}

export default function TicketCarousel({ onBackToHome, onRegisterAnother, shouldAutoDownload = false }: TicketCarouselProps) {
  const [tickets, setTickets] = useState<SavedTicket[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ticketRef = useRef<HTMLDivElement>(null);

  // Helper function to format name to show only first and last name
  const formatName = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length <= 2) {
      return fullName; // Return as is if 2 names or less
    }
    return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
  };

  const downloadTicket = useCallback(async () => {
    if (!ticketRef.current) {
      return;
    }
    
    try {
      // Fix alignment issues with html2canvas
      const style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
      
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#F5F5DC', // cream color
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: ticketRef.current.scrollWidth,
        height: ticketRef.current.scrollHeight,
      } as any);
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `ticket-${tickets[currentIndex].ticketId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // Silent error handling
    }
  }, [tickets, currentIndex]);

  useEffect(() => {
    const savedTickets = ticketStorage.getAllTickets();
    // Sort tickets by registration time (newest first)
    const sortedTickets = savedTickets.sort((a, b) => {
      return b.timestamp - a.timestamp; // Descending order (newest first)
    });
    setTickets(sortedTickets);
  }, []);

  // Auto-download only if user just registered a new ticket
  const hasDownloadedRef = useRef(false);

  useEffect(() => {
    if (
      shouldAutoDownload &&
      tickets.length > 0 &&
      currentIndex === 0 &&
      !hasDownloadedRef.current
    ) {
      hasDownloadedRef.current = true; // ✅ Prevent future auto-downloads
      const timer = setTimeout(() => {
        downloadTicket();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldAutoDownload, tickets.length, currentIndex, downloadTicket]);
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat ios-min-vh-fix" style={{ 
      height: '100vh',
      minHeight: '100vh',
    }}>
      <div className="absolute top-0 z-[-10] max-w-[500px]">
            <img
              src="/assets/connect bawah.webp"
              alt="CG"
              decoding="async"
            />
      </div>

      {/* Swipeable Ticket Container */}
      <motion.div
        className="w-full max-w-sm mx-auto px-8"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
        style={{ 
          cursor: tickets.length > 1 ? 'grab' : 'default',
          paddingTop: '5vh',
          paddingBottom: '5vh'
        }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Page Indicator Pill - Outside ticketRef so it won't be downloaded */}
            {tickets.length > 1 && (
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-white border-2 border-midnight text-midnight px-3 py-1.5 rounded-full text-xs font-inter font-medium shadow-sm">
                  {currentIndex + 1} of {tickets.length}
                </div>
              </div>
            )}

            <div ref={ticketRef} className="bg-cream border-3 border-midnight neo-shadow w-full" style={{ padding: '3vh 1rem' }}>
              {/* Success header */}
              <div className="text-center">
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
                <p className="font-inter text-sm text-midnight/70 mb-2">
                  Welcome to <span className="font-bold text-electric">Created 2 Connect</span>
                </p>
                <p className="font-inter text-xs text-midnight/50">
                  This ticket belongs to: <span className="font-semibold capitalize">{formatName(currentTicket.name)}</span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-midnight/20" style={{ margin: '1vh 0' }} />

              {/* Ticket details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
                {/* WhatsApp Group Button */}
                <div style={{ padding: '0.5vh 0' }}>
                  <a
                    href="https://chat.whatsapp.com/EvtY191qEO7D8Po4TpEKlO?mode=wwt"
                    target="_blank"
                    rel="noopener noreferrer"
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
                  </a>
                </div>

                <div style={{ padding: '0.5vh 0' }}>
                  <div className="bg-sunshine/20 border-2 border-sunshine" style={{ padding: '1.5vh' }}>
                    <p className="text-xs text-midnight/60 font-inter uppercase tracking-wider mb-1">Your Ticket ID</p>
                    <p className="text-lg font-bebas text-midnight tracking-wide">{currentTicket.ticketId}</p>
                  </div>
                </div>

                {/* QR Code */}
                <div style={{ padding: '0vh 0' }}>
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-midnight"
                      style={{ padding: '1.5vh' }}
                    >
                      <Image src={currentTicket.qrUrl} alt="Ticket QR Code" width={160} height={160} />
                    </motion.div>
                  </div>
                </div>

                <div style={{ padding: '0.5vh 0' }}>
                  <div className="bg-flame/10 border-2 border-flame" style={{ padding: '1vh' }}>
                    <p className="text-center font-inter text-midnight text-xs">
                      <span className="font-bold">Save this QR code</span> for event check-in!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators - positioned below the ticket */}
        {tickets.length > 1 && (
          <div className="flex justify-center" style={{ marginTop: '2vh' }}>
            <div className="bg-midnight/20 rounded-full px-3 py-1 flex gap-1">
              {tickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-cream' 
                      : 'bg-midnight/40 hover:bg-midnight/60'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>

    </div>
  );
}
