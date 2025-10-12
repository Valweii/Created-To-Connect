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
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url(/assets/BAGROUND.png)',
        height: '100dvh',
        minHeight: '100vh',
        maxHeight: '100dvh'
      }}
    >
      {/* Brush stroke decorations centered */}
      <div className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center">
        {/* BRUSH NOISE BIRU */}
        <div className="absolute">
          <img
            src="/assets/BRUSH NOISE BIRU.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </div>

        {/* BRUSH NOISE ORANGE - Right side */}
        <div className="absolute right-0 lg:right-0">
          <img
            src="/assets/BRUSH NOISE ORANGE.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </div>

        {/* BRUSH NOISE YELLOW - Left side */}
        <div className="absolute left-0 lg:left-0">
          <img
            src="/assets/BRUSH NOISE YELLOW.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </div>

        {/* BRUSH NOISE BIRU MUDA 1 - Left side */}
        <div className="absolute left-0 lg:left-0">
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 1.png"
            alt="Brush stroke"
            className="opacity-80"
          />
        </div>

        {/* BRUSH NOISE BIRU MUDA 2 - Right side */}
        <div className="absolute right-0 lg:right-0">
          <img
            src="/assets/BRUSH NOISE BIRU MUDA 2.png"
            alt="Brush stroke"
            className="opacity-70"
          />
        </div>

        {/* CREATED ATAS - Top right */}
        <div className="absolute top-0 right-0 lg:right-0">
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

        {/* CREATED BAWAH - Bottom left */}
        <div className="absolute bottom-0 left-0 lg:left-0">
          <img
            src="/assets/CREATED BAWAH.png"
            alt="Created Bawah"
          />
        </div>

        {/* ELEMENT 2 - Left side */}
        <div className="absolute left-0 lg:left-0">
          <img
            src="/assets/ELEMENT 2.png"
            alt="Element 2"
          />
        </div>

        {/* ELEMENT 3 - Right side */}
        <div className="absolute right-0 lg:right-0">
          <img
            src="/assets/ELEMENT 3.png"
            alt="Element 3"
          />
        </div>

        {/* ELEMENT DOODLE 1 - Left side */}
        <div className="absolute left-0 lg:left-0">
          <img
            src="/assets/ELEMENT DOODLE 1.png"
            alt="Element Doodle 1"
          />
        </div>

        {/* SHAPE OREN - Right side */}
        <div className="absolute right-0 lg:right-0">
          <img
            src="/assets/SHAPE OREN.png"
            alt="Shape Oren"
          />
        </div>

        {/* SHAPE BIRU TUA - Left side */}
        <div className="absolute left-0 lg:left-0">
          <img
            src="/assets/SHAPE BIRU TUA.png"
            alt="Shape Biru Tua"
          />
        </div>

        {/* SHAPE BIRU GRAD - Left side */}
        <div className="absolute left-0 lg:left-0">
          <img
            src="/assets/SHAPE BIRU GRAD.png"
            alt="Shape Biru Grad"
          />
        </div>

        {/* OVERLAY AUDIO - Right side, higher z-index to be in front */}
        <div className="absolute right-0 lg:right-0 z-[2]">
          <img
            src="/assets/OVERLAY AUDIO.png"
            alt="Overlay Audio"
          />
        </div>

        {/* INFO 1 DETAIL elements - In front of all other elements except logo */}
        {/* TRANSPARANT HITAM 2 */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/TRANSPARANT HITAM 2.png"
            alt="Transparant Hitam 2"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
        </div>

        {/* THU */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/THU.png"
            alt="THU"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
        </div>

        {/* PM */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/PM.png"
            alt="PM"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
        </div>

        {/* jam 7 */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/jam 7.png"
            alt="Jam 7"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
        </div>

        {/* GMS TANGERANG */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/GMS TANGERANG.png"
            alt="GMS Tangerang"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
        </div>

        {/* CHAPEL 1 */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/CHAPEL 1.png"
            alt="Chapel 1"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
      </div>

        {/* 20 NOVEMBER 2025 */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 1 DETAIL/20 NOVEMBER 2025.png"
            alt="20 November 2025"
            className=" sm:scale-50 lg:scale-50 xl:scale-50 2xl:scale-50"
          />
        </div>

        {/* INFO 2 DETAIL elements - In front of all other elements except logo */}
        {/* YELLOW */}
        <div className="absolute z-[6]">
          <img
            src="/assets/INFO 2 DETAIL/YELLOW.png"
            alt="Yellow"
          />
        </div>

        {/* TRANSPARAN HITAM */}
        <div className="absolute z-[4]">
          <img
            src="/assets/INFO 2 DETAIL/TRANSPARAN HITAM.png"
            alt="Transparan Hitam"
          />
        </div>

        {/* ORANGE */}
        <div className="absolute z-[6]">
          <img
            src="/assets/INFO 2 DETAIL/ORANGE.png"
            alt="Orange"
          />
        </div>

        {/* DRESSCCODE */}
        <div className="absolute z-[5]">
          <img
            src="/assets/INFO 2 DETAIL/DRESSCCODE.png"
            alt="Dresscode"
          />
        </div>

        {/* BLUE */}
        <div className="absolute z-[6]">
          <img
            src="/assets/INFO 2 DETAIL/BLUE.png"
            alt="Blue"
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-4 sm:py-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center flex-shrink-0 mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16">
          <img
            src="/assets/LOGO.png"
            alt="Logo"
            className="max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[60vw] xl:max-w-[50vw] 2xl:max-w-[40vw]"
          />
        </div>
      </div>

      {/* Register Button - Sticky to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-20 pt-4 sm:pb-16 sm:pt-6 md:pb-12 md:pt-8 lg:py-10 xl:py-12 2xl:py-16">
        <button
          onClick={onRegisterClick}
          className="group relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl py-2 sm:px-6 sm:py-3 md:px-10 md:py-5 lg:px-10 lg:py-5 xl:px-12 xl:py-6 2xl:px-16 2xl:py-8 bg-sunshine text-midnight font-bebas text-sm sm:text-base md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-5 2xl:gap-6">
            REGISTER NOW
            <span className="inline-block">→</span>
          </span>
          <div className="absolute inset-0 bg-flame opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}

