'use client';

import { useRef, useState, useEffect } from 'react';
import ModernHero from './components/Hero/ModernHero';
import SimpleModernLedger from './components/FormLedger/SimpleModernLedger';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import TicketCarousel from './components/FormLedger/TicketCarousel';
import StickyRegisterButton from './components/StickyRegisterButton/StickyRegisterButton';
import { ticketStorage } from '../lib/ticketStorage';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ticketCarouselRef = useRef<HTMLDivElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingTickets, setHasExistingTickets] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldAutoDownload, setShouldAutoDownload] = useState(false);
  
  // Sticky button states
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [isCompactButton, setIsCompactButton] = useState(false);

  // Initialize ticket storage and check for expired tickets
  useEffect(() => {
    // Trigger cleanup of expired tickets on app startup
    ticketStorage.initialize().catch(() => {
      // Silent error handling
    });
  }, []);

  // Check for existing tickets on mount
  useEffect(() => {
    const existingTickets = ticketStorage.hasExistingTickets();
    setHasExistingTickets(existingTickets);
  }, []);

  // Intersection Observer for sticky button behavior
  useEffect(() => {
    if (isLoading) return;

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show sticky button when hero section is out of view
          // But not if user is on form page with no tickets
          const shouldShow = !entry.isIntersecting;
          setShowStickyButton(shouldShow);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px 0px 0px', // Trigger before completely out of view
      }
    );

    const ticketObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Compact button when ticket carousel is in view
          if (entry.isIntersecting && hasExistingTickets && !showForm) {
            setIsCompactButton(true);
          } else {
            setIsCompactButton(false);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    if (ticketCarouselRef.current) {
      ticketObserver.observe(ticketCarouselRef.current);
    }

    return () => {
      heroObserver.disconnect();
      ticketObserver.disconnect();
    };
  }, [isLoading, hasExistingTickets, showForm]);

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

  const handleViewTickets = () => {
    // Navigate from form to tickets view
    setShowForm(false);
    setShouldAutoDownload(false);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Sticky Register Button */}
      <StickyRegisterButton
        onRegisterClick={scrollToForm}
        onViewTicketsClick={handleViewTickets}
        hasExistingTickets={hasExistingTickets}
        isVisible={showStickyButton && hasExistingTickets}
        isCompact={isCompactButton}
        showViewTickets={showForm && hasExistingTickets}
      />

      {/* Main Content */}
      <main className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-out`}>
        {/* Hero Section - Always visible */}
        <section ref={heroRef} id="hero">
          <ModernHero 
            onRegisterClick={scrollToForm} 
            hasExistingTickets={hasExistingTickets}
          />
        </section>

        {/* Conditional Content Section */}
        {hasExistingTickets && !showForm ? (
          <div ref={ticketCarouselRef}>
            <TicketCarousel 
              onBackToHome={handleBackToHome} 
              onRegisterAnother={scrollToForm}
              shouldAutoDownload={shouldAutoDownload}
            />
          </div>
        ) : (
          <section ref={formRef} id="registration">
            <SimpleModernLedger onRegistrationComplete={handleRegistrationComplete} />
          </section>
        )}
      </main>
    </>
  );
}
