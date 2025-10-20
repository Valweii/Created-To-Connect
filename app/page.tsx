'use client';

import { useRef, useState, useEffect } from 'react';
import ModernHero from './components/Hero/ModernHero';
import SimpleModernLedger from './components/FormLedger/SimpleModernLedger';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import TicketCarousel from './components/FormLedger/TicketCarousel';
import { ticketStorage } from '../lib/ticketStorage';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingTickets, setHasExistingTickets] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldAutoDownload, setShouldAutoDownload] = useState(false);

  // Check for existing tickets on mount
  useEffect(() => {
    const existingTickets = ticketStorage.hasExistingTickets();
    setHasExistingTickets(existingTickets);
  }, []);

  const scrollToForm = () => {
    // Show form if we're currently showing tickets
    if (hasExistingTickets && !showForm) {
      setShowForm(true);
      // Scroll to form after state update
      setTimeout(() => {
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
      }, 100);
      return;
    }
    
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

  const handleBackToHome = () => {
    // Reset to tickets view
    setShowForm(false);
    setShouldAutoDownload(false); // Reset auto-download flag
  };

  const handleRegistrationComplete = (shouldDownload?: boolean) => {
    setHasExistingTickets(true);
    setShowForm(false);
    setShouldAutoDownload(shouldDownload || false); // Set auto-download flag
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* JESUS REVISI - Body level element */}
      <div className="fixed bottom-0 left-0 right-0 -z-10 opacity-30 pointer-events-none">
        <div className="relative">
          <div className="relative mix-blend-overlay">
            <img
              src="/assets/JESUS REVISI.webp"
              alt="Jesus"
              className="w-full h-auto"
              decoding="async"
              style={{
                scale: 1.2,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-out`}>
        {/* Hero Section - Always visible */}
        <section id="hero">
          <ModernHero 
            onRegisterClick={scrollToForm} 
            hasExistingTickets={hasExistingTickets}
          />
        </section>

        {/* Conditional Content Section */}
        {hasExistingTickets && !showForm ? (
          <TicketCarousel 
            onBackToHome={handleBackToHome} 
            onRegisterAnother={scrollToForm}
            shouldAutoDownload={shouldAutoDownload}
          />
        ) : (
          <section ref={formRef} id="registration">
            <SimpleModernLedger onRegistrationComplete={handleRegistrationComplete} />
          </section>
        )}
      </main>
    </>
  );
}
