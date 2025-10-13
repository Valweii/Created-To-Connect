'use client';

import { useRef, useState } from 'react';
import ModernHero from './components/Hero/ModernHero';
import SimpleModernLedger from './components/FormLedger/SimpleModernLedger';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToForm = () => {
    // On mobile, scroll to form section
    if (window.innerWidth < 768) {
      if (formRef.current) {
        const yOffset = 0;
        const element = formRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Focus on first input after scroll completes
        setTimeout(() => {
          const firstInput = formRef.current?.querySelector('input');
          firstInput?.focus();
        }, 800);
      }
    } else {
      // On desktop/tablet, just focus on the form
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input');
        firstInput?.focus();
      }, 100);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* Main Content */}
      <main className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-out`}>
        {/* Mobile: Stacked Layout */}
        <div className="md:hidden bg-cream">
        {/* Hero Section */}
        <section id="hero">
          <ModernHero onRegisterClick={scrollToForm} />
        </section>

        {/* Registration Form Section */}
        <section ref={formRef} id="registration" className="bg-cream">
          <SimpleModernLedger />
        </section>
      </div>

      {/* Desktop/Tablet: Side by Side Layout */}
      <div className="hidden md:flex h-screen">
        {/* Hero Section - Left Side, fully aligned left */}
        <section 
          id="hero" 
          className="flex-shrink-0 w-[500px]"
        >
          <ModernHero onRegisterClick={scrollToForm} />
        </section>

        {/* Registration Form Section - Right Side takes remaining space, centered - Always visible on desktop/tablet */}
        <section 
          ref={formRef} 
          id="registration" 
          className="flex-1 overflow-hidden flex items-center justify-center"
        >
          <div className="w-full max-w-4xl px-8">
            <SimpleModernLedger />
          </div>
        </section>
      </div>
      </main>
    </>
  );
}
