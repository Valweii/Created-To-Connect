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
      className="relative h-screen max-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/assets/BAGROUND.png)' }}
    >
      {/* Brush stroke decorations centered */}
      <div className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center">
        {/* BRUSH NOISE BIRU */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute"
        >
          <img
            src="/assets/BRUSH NOISE BIRU.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE ORANGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute"
        >
          <img
            src="/assets/BRUSH NOISE ORANGE.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE YELLOW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
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
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute"
        >
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 1.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </motion.div>

        {/* BRUSH NOISE BIRU MUDA 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute"
        >
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 2.png"
            alt="Brush stroke"
            className="opacity-70"
          />
        </motion.div>

        {/* CREATED ATAS - Top of screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-0"
        >
          <img
            src="/assets/CREATED ATAS.png"
            alt="Created Atas"
          />
        </motion.div>

        {/* CG - Top of screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute top-0"
        >
          <img
            src="/assets/CG.png"
            alt="CG"
          />
        </motion.div>

        {/* CREATED BAWAH - Bottom of screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-0"
        >
          <img
            src="/assets/CREATED BAWAH.png"
            alt="Created Bawah"
          />
        </motion.div>

        {/* ELEMENT 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="absolute"
        >
          <img
            src="/assets/ELEMENT 2.png"
            alt="Element 2"
          />
        </motion.div>

        {/* ELEMENT 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute"
        >
          <img
            src="/assets/ELEMENT 3.png"
            alt="Element 3"
          />
        </motion.div>

        {/* ELEMENT DOODLE 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute"
        >
          <img
            src="/assets/ELEMENT DOODLE 1.png"
            alt="Element Doodle 1"
          />
        </motion.div>

        {/* SHAPE OREN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute"
        >
          <img
            src="/assets/SHAPE OREN.png"
            alt="Shape Oren"
          />
        </motion.div>

        {/* SHAPE BIRU TUA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute"
        >
          <img
            src="/assets/SHAPE BIRU TUA.png"
            alt="Shape Biru Tua"
          />
        </motion.div>

        {/* SHAPE BIRU GRAD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute"
        >
          <img
            src="/assets/SHAPE BIRU GRAD.png"
            alt="Shape Biru Grad"
          />
        </motion.div>

        {/* OVERLAY AUDIO - Higher z-index to be in front */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="absolute z-[2]"
        >
          <img
            src="/assets/OVERLAY AUDIO.png"
            alt="Overlay Audio"
          />
        </motion.div>

        {/* INFO 1 DETAIL elements - In front of all other elements except logo */}
        {/* TRANSPARANT HITAM 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/TRANSPARANT HITAM 2.png"
            alt="Transparant Hitam 2"
          />
        </motion.div>

        {/* THU */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/THU.png"
            alt="THU"
          />
        </motion.div>

        {/* PM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/PM.png"
            alt="PM"
          />
        </motion.div>

        {/* jam 7 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/jam 7.png"
            alt="Jam 7"
          />
        </motion.div>

        {/* GMS TANGERANG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/GMS TANGERANG.png"
            alt="GMS Tangerang"
          />
        </motion.div>

        {/* CHAPEL 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/CHAPEL 1.png"
            alt="Chapel 1"
          />
        </motion.div>

        {/* 20 NOVEMBER 2025 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 1 DETAIL/20 NOVEMBER 2025.png"
            alt="20 November 2025"
          />
        </motion.div>

        {/* INFO 2 DETAIL elements - In front of all other elements except logo */}
        {/* YELLOW */}
          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute z-[6]"
        >
          <img
            src="/assets/INFO 2 DETAIL/YELLOW.png"
            alt="Yellow"
          />
          </motion.div>

        {/* TRANSPARAN HITAM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="absolute z-[4]"
        >
          <img
            src="/assets/INFO 2 DETAIL/TRANSPARAN HITAM.png"
            alt="Transparan Hitam"
          />
        </motion.div>
        
        {/* ORANGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.7 }}
          className="absolute z-[6]"
        >
          <img
            src="/assets/INFO 2 DETAIL/ORANGE.png"
            alt="Orange"
          />
        </motion.div>

        {/* DRESSCCODE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="absolute z-[5]"
        >
          <img
            src="/assets/INFO 2 DETAIL/DRESSCCODE.png"
            alt="Dresscode"
          />
        </motion.div>

        {/* BLUE */}
            <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.9 }}
          className="absolute z-[6]"
        >
          <img
            src="/assets/INFO 2 DETAIL/BLUE.png"
            alt="Blue"
          />
            </motion.div>

        {/* JESUS with complex visual effects */}
            <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay: 3.0 }}
          className="absolute -z-10"
        >
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
            </motion.div>
          </div>

      {/* Main content - logo and register button */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-4 sm:py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center flex-shrink-0 mb-4 sm:mb-6 md:mb-8"
        >
          <img
            src="/assets/LOGO.png"
            alt="Logo"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 items-center flex-shrink-0"
        >
          <motion.button
            onClick={onRegisterClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-sunshine text-midnight font-bebas text-xl sm:text-2xl md:text-3xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
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
      </div>
    </div>
  );
}

