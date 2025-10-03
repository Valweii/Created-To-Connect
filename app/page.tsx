'use client';

import { useRef, useState } from 'react';
import ModernHero from './components/Hero/ModernHero';
import ModernLedger from './components/FormLedger/ModernLedger';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      // Scroll to form section, ensuring hero is completely out of view
      if (formRef.current) {
        const yOffset = 0; // No offset, scroll to exact top
        const element = formRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Focus on first input after scroll completes
        setTimeout(() => {
          const firstInput = formRef.current?.querySelector('input');
          firstInput?.focus();
        }, 800);
      }
    }, 100);
  };

  return (
    <main className="relative bg-cream">
      {/* Hero Section */}
      <section id="hero">
        <ModernHero onRegisterClick={scrollToForm} />
      </section>

      {/* Registration Form Section */}
      {showForm && (
        <section ref={formRef} id="registration">
          <ModernLedger />
        </section>
      )}
    </main>
  );
}
