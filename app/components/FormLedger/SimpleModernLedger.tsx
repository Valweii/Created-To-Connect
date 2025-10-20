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
import { ticketStorage } from '../../../lib/ticketStorage';

interface SimpleModernLedgerProps {
  onRegistrationComplete?: () => void;
}

export default function SimpleModernLedger({ onRegistrationComplete }: SimpleModernLedgerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [ticketData, setTicketData] = useState<{ ticketId: string; qrUrl: string } | null>(null);

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
    // Prevent multiple submissions
    if (isSubmitting || showBlackHole) {
      console.log('🚫 Submission already in progress, ignoring...');
      return;
    }
    
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
        // Store the result, black hole will handle the timing
        setTicketData(result);
        
        // Save ticket to localStorage
        ticketStorage.saveTicket({
          ticketId: result.ticketId,
          qrUrl: result.qrUrl,
          name: data.name,
          registrationData: {
            instagram: data.instagram,
            phonenumber: data.phonenumber,
            isCGMember: data.isCGMember,
            cgNumber: data.cgNumber,
            heardFrom: data.heardFrom,
          }
        });
        
        // Notify parent component
        onRegistrationComplete?.();
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
    // Called when progress bar reaches 100%
    console.log('🎉 Black hole animation completed, showing ticket...');
    setShowBlackHole(false);
    setIsSubmitting(false);
  };

  const handleBlackHoleCancel = () => {
    // User pressed Esc or Close - skip to confirmation
    if (ticketData) {
      setShowBlackHole(false);
    }
  };

  if (ticketData && !showBlackHole) {
    // Check if user has multiple tickets
    const allTickets = ticketStorage.getAllTickets();
    if (allTickets.length > 1) {
      // Show carousel for multiple tickets
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-bebas text-4xl text-midnight mb-4">Registration Complete!</h1>
            <p className="font-inter text-midnight/70 mb-6">
              You now have {allTickets.length} tickets. Please refresh the page to view all your tickets.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-midnight text-cream font-bebas text-lg tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              VIEW ALL TICKETS
            </button>
          </div>
        </div>
      );
    } else {
      // Show single ticket confirmation
      return <ModernConfirmation ticketId={ticketData.ticketId} qrUrl={ticketData.qrUrl} onRegisterAnother={() => window.location.reload()} />;
    }
  }

  const stepColors = ['bg-flame', 'bg-sunshine'];
  const stepBg = stepColors[currentStep - 1];

  return (
    <>
      {/* Black-hole submit animation overlay */}
      <SubmitBlackHole
        isActive={showBlackHole}
        message="We'll be waiting for you"
        pageContentSelector="#page-content"
        duration={4000}
        onComplete={handleBlackHoleComplete}
        onCancel={handleBlackHoleCancel}
      />

      <div 
        id="page-content" 
        className="min-h-screen py-8 px-4 relative overflow-hidden flex items-center"
      >

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-2"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: currentStep === step ? 1.2 : 1,
                    backgroundColor: currentStep >= step ? '#1f1f1f' : '#e0e0e0',
                  }}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <span className={`font-bebas text-sm ${currentStep >= step ? 'text-cream' : 'text-midnight'}`}>
                    {step}
                  </span>
                </motion.div>
                {step < 2 && (
                  <div className={`w-6 h-1 ${currentStep > step ? 'bg-midnight' : 'bg-midnight/20'}`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Form card */}
          <motion.div
            layout={true}
            className="bg-cream border-2 border-midnight neo-shadow p-4"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Step title */}
            <motion.div
              key={`title-${currentStep}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-3"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className={`inline-block px-3 py-1 ${stepBg} mb-1`}>
                <h2 className="font-bebas text-xl text-midnight tracking-wider">
                  {currentStep === 1 && 'YOUR INFO'}
                  {currentStep === 2 && 'EXTRAS'}
                </h2>
              </div>
              <p className="font-inter text-xs text-midnight/60 leading-tight">
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
              <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-midnight/10">
                {currentStep > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 font-bebas text-base text-midnight hover:text-electric transition-colors"
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
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
                    className="px-4 py-2 bg-midnight text-cream font-bebas text-base tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    NEXT →
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`px-4 py-2 font-bebas text-base tracking-wider transition-all ${
                      isSubmitting
                        ? 'bg-midnight/50 text-cream cursor-wait'
                        : 'bg-electric text-cream neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                    }`}
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
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
            className="mt-3 text-center"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="inline-block bg-white rounded-full px-3 py-1.5 border-2 border-midnight neo-shadow">
              <p className="font-inter text-midnight/40 text-xs leading-tight">
                Step {currentStep} of 2 — Make it count! 
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

