'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ConfirmationTicketProps {
  ticketId: string;
  qrUrl: string;
}

export default function ConfirmationTicket({ ticketId, qrUrl }: ConfirmationTicketProps) {
  const downloadTicket = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `ticket-${ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Automatically download QR code when component mounts
  useEffect(() => {
    // Small delay to ensure smooth UX
    const timer = setTimeout(() => {
      downloadTicket();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [qrUrl, ticketId]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-lodgeWood via-[#2a1810] to-[#1a0f08] opacity-90" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <div className="bg-parchment rounded-lg shadow-2xl parchment-shadow p-8 max-w-md w-full">
          {/* Ticket header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-warmGold to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-4xl">✓</span>
              </div>
            </motion.div>
            
            <h2 className="text-3xl font-barlow font-bold text-lodgeWood uppercase tracking-wider glow-gold">
              You&apos;re Registered!
            </h2>
            <p className="text-lodgeWood/80 font-barlow mt-2">
              Welcome to Created 2 Connect
            </p>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-lodgeWood/30 my-6" />

          {/* Ticket info */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-lodgeWood/60 font-barlow uppercase tracking-wider">Ticket ID</p>
              <p className="text-xl font-barlow font-bold text-lodgeWood">{ticketId}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center my-6">
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <Image src={qrUrl} alt="Ticket QR Code" width={200} height={200} />
              </div>
            </div>

            <p className="text-center text-sm text-lodgeWood/70 font-barlow">
              Save this QR code for event check-in
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <motion.button
              onClick={downloadTicket}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-warmGold to-yellow-500 text-lodgeWood font-barlow font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Download Ticket (QR)
            </motion.button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-6 py-3 bg-lodgeWood/10 text-lodgeWood font-barlow font-medium rounded-lg hover:bg-lodgeWood/20 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


