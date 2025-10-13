'use client';

import { useRef, useState } from 'react';
import ModernHero from './components/Hero/ModernHero';
import SimpleModernLedger from './components/FormLedger/SimpleModernLedger';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToForm = () => {
    // Scroll to form and focus on first input
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Focus on first input after scroll completes
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input');
        firstInput?.focus();
      }, 1000);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* JESUS REVISI - Body level element */}
      <div className="fixed bottom-0 left-0 right-0 -z-10 opacity-30 md:scale-[1.5] md:origin-bottom pointer-events-none">
        <div className="relative md:mb-[10rem]">
          <div className="relative mix-blend-overlay">
            <img
              src="/assets/JESUS REVISI.webp"
              alt="Jesus"
              className="w-full h-auto"
              decoding="async"
              style={{
                // filter: 'contrast(1.2) saturate(1.3) brightness(0.9)',
                // mixBlendMode: 'overlay',
                scale: 1.2,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-out`}>
        {/* Stacked Layout for All Screen Sizes */}
        <div>
          {/* Hero Section */}
          <section id="hero">
            <ModernHero onRegisterClick={scrollToForm} />
          </section>

          {/* Registration Form Section */}
          <section ref={formRef} id="registration" className="bg-cream">
            <SimpleModernLedger />
          </section>
        </div>
      </main>
    </>
  );
}
