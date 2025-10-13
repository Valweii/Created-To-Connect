'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { registrationSchema, RegistrationFormData } from './types';
import StepBasicInfo from './StepBasicInfo';
import StepCGInfo from './StepCGInfo';
import ModernConfirmation from './ModernConfirmation';
import SubmitBlackHole from '../SubmitBlackHole/SubmitBlackHole';

export default function SimpleModernLedger() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [ticketData, setTicketData] = useState<{ ticketId: string; qrUrl: string } | null>(null);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktopOrTablet(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
  });

  const isCGMember = watch('isCGMember');

  const validateStep = async (step: number) => {
    const fields: (keyof RegistrationFormData)[][] = [
      ['name', 'instagram', 'phonenumber'],
      isCGMember ? ['isCGMember', 'cgNumber'] : ['isCGMember', 'heardFrom'],
    ];
    
    return await trigger(fields[step - 1]);
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 2));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('🚀 SUBMIT TRIGGERED!', data);
    setIsSubmitting(true);
    
    // Trigger black-hole animation immediately
    setShowBlackHole(true);
    console.log('🌀 Black hole activated!');
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Wait for black-hole animation to complete before showing confirmation
        setTimeout(() => {
          setTicketData(result);
          setShowBlackHole(false);
        }, 4000); // Show montage for 4s before transitioning
      } else {
        // On error, revert black-hole and show error
        setShowBlackHole(false);
        setIsSubmitting(false);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setShowBlackHole(false);
      setIsSubmitting(false);
      alert('An error occurred. Please try again.');
    }
  };

  const handleBlackHoleComplete = () => {
    // Called when montage finishes
  };

  const handleBlackHoleCancel = () => {
    // User pressed Esc or Close - skip to confirmation
    if (ticketData) {
      setShowBlackHole(false);
    }
  };

  if (ticketData && !showBlackHole) {
    return <ModernConfirmation ticketId={ticketData.ticketId} qrUrl={ticketData.qrUrl} />;
  }

  const stepColors = ['bg-flame', 'bg-sunshine'];
  const stepBg = stepColors[currentStep - 1];

  return (
    <>
      {/* Black-hole submit animation overlay */}
      <SubmitBlackHole
        isActive={showBlackHole}
        videoAssets={[
          '/assets/dummy-montage.mp4',
        ]}
        videoPoster="/assets/dummy-poster.jpg"
        message="We'll be waiting for you"
        pageContentSelector="#page-content"
        onComplete={handleBlackHoleComplete}
        onCancel={handleBlackHoleCancel}
      />

      <div 
        id="page-content" 
        className="min-h-screen py-8 md:py-20 px-4 relative overflow-hidden flex items-center"
        style={{
          backgroundColor: !isDesktopOrTablet ? '#FAF3E0' : 'transparent'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 font-bebas text-[8rem] text-midnight/5 pointer-events-none hidden lg:block">
          REGISTER
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8 flex items-center justify-center gap-2 md:gap-4"
          >
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center gap-2 md:gap-4">
                <motion.div
                  animate={{
                    scale: currentStep === step ? 1.2 : 1,
                    backgroundColor: currentStep >= step ? '#1f1f1f' : '#e0e0e0',
                  }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                >
                  <span className={`font-bebas text-lg md:text-xl ${currentStep >= step ? 'text-cream' : 'text-midnight'}`}>
                    {step}
                  </span>
                </motion.div>
                {step < 2 && (
                  <div className={`w-8 md:w-12 h-1 ${currentStep > step ? 'bg-midnight' : 'bg-midnight/20'}`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Form card */}
          <motion.div
            layout
            className="bg-cream border-2 md:border-4 border-midnight neo-shadow p-4 md:p-6 lg:p-8"
          >
            {/* Step title */}
            <motion.div
              key={`title-${currentStep}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 md:mb-6"
            >
              <div className={`inline-block px-4 py-1 md:px-4 md:py-1.5 ${stepBg} mb-2 md:mb-3`}>
                <h2 className="font-bebas text-2xl md:text-2xl lg:text-2xl text-midnight tracking-wider">
                  {currentStep === 1 && 'YOUR INFO'}
                  {currentStep === 2 && 'EXTRAS'}
                </h2>
              </div>
              <p className="font-inter text-sm md:text-sm text-midnight/60">
                {currentStep === 1 && 'Tell us who you are'}
                {currentStep === 2 && 'Connect Group membership'}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <StepBasicInfo key="step1" register={register} errors={errors} />
                )}
                {currentStep === 2 && (
                  <StepCGInfo 
                    key="step2" 
                    register={register} 
                    errors={errors} 
                    watch={watch}
                    setValue={setValue}
                  />
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-midnight/10">
                {currentStep > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 md:gap-2 font-bebas text-lg md:text-xl text-midnight hover:text-electric transition-colors"
                  >
                    <span>←</span> BACK
                  </motion.button>
                ) : (
                  <div />
                )}
                
                {currentStep < 2 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 md:px-8 py-3 md:py-3 bg-midnight text-cream font-bebas text-lg md:text-xl tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    NEXT →
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`px-6 md:px-8 py-3 md:py-3 font-bebas text-lg md:text-xl tracking-wider transition-all ${
                      isSubmitting
                        ? 'bg-midnight/50 text-cream cursor-wait'
                        : 'bg-electric text-cream neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                    }`}
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Decorative text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 md:mt-6 text-center"
          >
            <p className="font-inter text-midnight/40 text-xs">
              Step {currentStep} of 2 — Make it count! 
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

