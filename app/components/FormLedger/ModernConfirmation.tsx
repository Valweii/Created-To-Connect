'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ModernConfirmationProps {
  ticketId: string;
  qrUrl: string;
}

export default function ModernConfirmation({ ticketId, qrUrl }: ModernConfirmationProps) {
  const downloadTicket = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `ticket-${ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-electric flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-96 h-96 bg-sunshine/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-flame/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-cream border-4 border-midnight neo-shadow p-8 md:p-12">
          {/* Success header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 bg-electric rounded-full flex items-center justify-center neo-shadow">
                <span className="text-6xl">✓</span>
              </div>
            </motion.div>
            
            <h1 className="font-bebas text-6xl md:text-8xl text-midnight mb-4 leading-none">
              YOU'RE IN!
            </h1>
            <p className="font-inter text-xl text-midnight/70">
              Welcome to <span className="font-bold text-electric">Created 2 Connect</span>
            </p>
          </div>

          {/* Divider */}
          <div className="border-t-4 border-dashed border-midnight/20 my-8" />

          {/* Ticket details */}
          <div className="space-y-6">
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
              onClick={downloadTicket}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-5 bg-midnight text-cream font-bebas text-2xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              DOWNLOAD TICKET
            </motion.button>

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


