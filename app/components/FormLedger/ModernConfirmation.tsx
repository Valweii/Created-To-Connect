'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import html2canvas from 'html2canvas';

interface ModernConfirmationProps {
  ticketId: string;
  qrUrl: string;
  onRegisterAnother?: () => void;
}

export default function ModernConfirmation({ ticketId, qrUrl, onRegisterAnother }: ModernConfirmationProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloadAttempted, setDownloadAttempted] = useState(false);

  const downloadTicket = async () => {
    console.log('🔍 Download function called, ticketRef:', ticketRef.current);
    setDownloadAttempted(true);
    
    if (!ticketRef.current) {
      console.error('❌ No ticketRef found, cannot download');
      return;
    }
    
    try {
      console.log('🎨 Generating canvas...');
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: '#F5F5DC', // cream color
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: ticketRef.current.scrollWidth,
        height: ticketRef.current.scrollHeight,
      } as any);
      
      console.log('📎 Creating download link...');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `ticket-${ticketId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('✅ Download triggered successfully');
    } catch (error) {
      console.error('❌ Error downloading ticket:', error);
    }
  };

  // No auto-download in ModernConfirmation - download happens in carousel

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    >

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Page Indicator Pill - Outside ticketRef so it won't be downloaded */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white border-2 border-midnight text-midnight px-3 py-1.5 rounded-full text-xs font-inter font-medium shadow-sm">
            1 of 1
          </div>
        </div>

        <div ref={ticketRef} className="bg-cream border-4 border-midnight neo-shadow p-8 md:p-12">
          {/* Success header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div 
                className="w-24 h-24 bg-electric rounded-full flex items-center justify-center relative"
                style={{
                  boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span 
                  className="text-6xl"
                  style={{
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '4px'
                  }}
                >
                  ✓
                </span>
              </div>
            </motion.div>
            
            <h1 className="font-bebas text-6xl md:text-8xl text-midnight mb-4 leading-none">
              YOU&apos;RE IN!
            </h1>
            <p className="font-inter text-xl text-midnight/70">
              Welcome to <span className="font-bold text-electric">Created 2 Connect</span>
            </p>
            {downloadAttempted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-electric/20 border-2 border-electric rounded-lg"
              >
                <p className="font-inter text-sm text-midnight text-center">
                  📱 <strong>Ticket downloaded!</strong> Check your downloads folder or gallery.
                </p>
              </motion.div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t-4 border-dashed border-midnight/20 my-8" />

          {/* Ticket details */}
          <div className="space-y-6">
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
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-green-500 text-white font-bebas text-xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              style={{
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)',
                backgroundColor: '#25D366'
              }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              JOIN WHATSAPP GROUP
            </motion.a>

            <div className="bg-sunshine/20 border-3 border-sunshine p-6">
              <p className="text-sm text-midnight/60 font-inter uppercase tracking-wider mb-2">Your Ticket ID</p>
              <p className="text-3xl font-bebas text-midnight tracking-wide">{ticketId}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-midnight p-6 neo-shadow"
              >
                <Image src={qrUrl} alt="Ticket QR Code" width={240} height={240} />
              </motion.div>
            </div>

            <div className="bg-flame/10 border-3 border-flame p-4">
              <p className="text-center font-inter text-midnight">
                <span className="font-bold">Save this QR code</span> for event check-in!
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 space-y-4">
            <motion.button
              onClick={() => {
                console.log('👆 User clicked download button');
                downloadTicket();
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-5 bg-midnight text-cream font-bebas text-2xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {downloadAttempted ? 'DOWNLOAD AGAIN' : 'DOWNLOAD TICKET'}
            </motion.button>

            {onRegisterAnother && (
              <motion.button
                onClick={onRegisterAnother}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-5 bg-sunshine text-midnight font-bebas text-2xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                REGISTER ANOTHER PERSON
              </motion.button>
            )}

            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-8 py-4 border-3 border-midnight text-midnight font-bebas text-xl tracking-wider hover:bg-midnight hover:text-cream transition-all"
            >
              BACK TO HOME
            </button>
          </div>
        </div>

        {/* Decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="font-bebas text-3xl text-cream">
            SEE YOU SOON! 
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}


