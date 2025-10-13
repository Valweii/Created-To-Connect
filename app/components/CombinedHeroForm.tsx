'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { registrationSchema, RegistrationFormData } from './FormLedger/types';
import StepBasicInfo from './FormLedger/StepBasicInfo';
import StepCGInfo from './FormLedger/StepCGInfo';
import ModernConfirmation from './FormLedger/ModernConfirmation';
import SubmitBlackHole from './SubmitBlackHole/SubmitBlackHole';

interface CombinedHeroFormProps {
  onRegisterClick: () => void;
}

export default function CombinedHeroForm({ onRegisterClick }: CombinedHeroFormProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [ticketData, setTicketData] = useState<{ ticketId: string; qrUrl: string } | null>(null);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

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
        className="relative overflow-hidden flex h-screen"
        style={{ 
          minHeight: '100vh',
        }}
      >
        {/* Left Side - Hero Section */}
        <div className="flex-shrink-0 w-[500px] relative">
          {/* Brush stroke decorations centered */}
          <div className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center">
            {/* BRUSH NOISE BIRU */}
            <motion.div 
              className="absolute will-change-transform"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="/assets/BRUSH NOISE BIRU.png"
                alt="Brush stroke"
                className="opacity-80"
                decoding="async"
              />
            </motion.div>

            {/* BRUSH NOISE YELLOW */}
            <div className="absolute">
              <img
                src="/assets/BRUSH NOISE YELLOW.png"
                alt="Brush stroke"
                className="opacity-80"
                decoding="async"
              />
            </div>

            {/* BRUSH NOISE BIRU MUDA 1 */}
            <motion.div 
              className="absolute will-change-transform"
              animate={{ 
                y: [0, 7, 0],
                x: [0, -4, 0]
              }}
              transition={{ 
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <img
                src="/assets/BRUSH NOISE BIRU MUDA 1.png"
                alt="Brush stroke"
                className="opacity-80"
                decoding="async"
              />
            </motion.div>

            {/* CREATED ATAS - Right positioned */}
            <div className="absolute top-0 right-0">
              <img
                src="/assets/CREATED ATAS.png"
                alt="Created Atas"
                decoding="async"
              />
            </div>

            {/* CG - Top of screen */}
            <div className="absolute top-0 z-[10]">
              <img
                src="/assets/CG.png"
                alt="CG"
                decoding="async"
              />
            </div>

            {/* CREATED BAWAH */}
            <div className="absolute bottom-0">
              <img
                src="/assets/CREATED BAWAH.png"
                alt="Created Bawah"
                decoding="async"
              />
            </div>

            {/* ELEMENT 2 */}
            <motion.div 
              className="absolute will-change-transform"
              animate={{ 
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="/assets/ELEMENT 2.png"
                alt="Element 2"
                decoding="async"
                style={{ transform: 'translateZ(0)' }}
              />
            </motion.div>

            {/* ELEMENT DOODLE 1 */}
            <motion.div 
              className="absolute will-change-transform"
              animate={{ 
                rotate: [0, 1.5, -1.5, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
              }}
            >
              <img
                src="/assets/ELEMENT DOODLE 1.png"
                alt="Element Doodle 1"
                decoding="async"
              />
            </motion.div>

            {/* SHAPE BIRU TUA */}
            <motion.div 
              className="absolute animate-optimized"
              animate={{ 
                scale: [1, 1.04, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              <img
                src="/assets/SHAPE BIRU TUA.png"
                alt="Shape Biru Tua"
                decoding="async"
                style={{ opacity: 0.95 }}
              />
            </motion.div>

            {/* SHAPE BIRU GRAD */}
            <motion.div 
              className="absolute animate-optimized"
              animate={{ 
                scale: [1, 1.06, 1]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <img
                src="/assets/SHAPE BIRU GRAD.png"
                alt="Shape Biru Grad"
                decoding="async"
                style={{ opacity: 0.9 }}
              />
            </motion.div>

            {/* INFO 1 DETAIL elements - In front of all other elements except logo */}
            {/* TRANSPARANT HITAM 2 */}
            <div className="absolute z-[5] mb-6">
              <img
                src="/assets/INFO 1 DETAIL/TRANSPARANT HITAM 2.png"
                alt="Transparant Hitam 2"
                decoding="async"
              />
            </div>

            {/* THU */}
            <div className="absolute z-[5] mb-6">
              <img
                src="/assets/INFO 1 DETAIL/thu.png"
                alt="THU"
                decoding="async"
              />
            </div>

            {/* 20 NOVEMBER 2025 */}
            <div className="absolute z-[5]">
              <img
                src="/assets/INFO 1 DETAIL/20 NOVEMBER 2025.png"
                alt="20 November 2025"
                decoding="async"
              />
            </div>

            {/* CHAPEL 1 */}
            <div className="absolute z-[5] mb-6">
              <img
                src="/assets/INFO 1 DETAIL/CHAPEL 1.png"
                alt="Chapel 1"
                decoding="async"
              />
            </div>

            {/* GMS ALAM SUTERA */}
            <div className="absolute z-[5] mb-6">
              <img
                src="/assets/GMS ALAM SUTERA.png"
                alt="GMS Alam Sutera"
                decoding="async"
              />
            </div>
          </div>

          {/* Main content - logo */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-4 max-w-7xl mx-auto will-change-transform">
            {/* Logo */}
            <motion.div 
              className="flex justify-center flex-shrink-0 mb-4 will-change-transform"
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="/assets/LOGO.png"
                alt="Logo"
                decoding="async"
                style={{ transform: 'translateZ(0)' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex-1 overflow-hidden flex items-center justify-center bg-cream">
          <div className="w-full max-w-4xl px-8">
            {/* Decorative elements */}
            <div className="absolute top-20 right-10 font-bebas text-[8rem] text-midnight/20 pointer-events-none hidden lg:block">
              REGISTER
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full">
              {/* Step indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 md:mb-5 flex items-center justify-center gap-2 md:gap-3"
              >
                {[1, 2].map((step) => (
                  <div key={step} className="flex items-center gap-2 md:gap-3">
                    <motion.div
                      animate={{
                        scale: currentStep === step ? 1.2 : 1,
                        backgroundColor: currentStep >= step ? '#1f1f1f' : '#e0e0e0',
                      }}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center"
                    >
                      <span className={`font-bebas text-sm md:text-base ${currentStep >= step ? 'text-cream' : 'text-midnight'}`}>
                        {step}
                      </span>
                    </motion.div>
                    {step < 2 && (
                      <div className={`w-6 md:w-8 h-1 ${currentStep > step ? 'bg-midnight' : 'bg-midnight/20'}`} />
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Form card */}
              <motion.div
                layout
                className="bg-cream border-2 md:border-4 border-midnight neo-shadow p-4 md:p-5 lg:p-6 md:max-h-[65vh] md:overflow-y-auto"
              >
                {/* Step title */}
                <motion.div
                  key={`title-${currentStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-3 md:mb-4"
                >
                  <div className={`inline-block px-3 py-1 md:px-3 md:py-1 ${stepBg} mb-1 md:mb-2`}>
                    <h2 className="font-bebas text-xl md:text-lg lg:text-xl text-midnight tracking-wider">
                      {currentStep === 1 && 'YOUR INFO'}
                      {currentStep === 2 && 'EXTRAS'}
                    </h2>
                  </div>
                  <p className="font-inter text-xs md:text-xs text-midnight/60 leading-tight">
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
                  <div className="flex justify-between items-center mt-4 md:mt-5 pt-3 md:pt-4 border-t-2 border-midnight/10">
                    {currentStep > 1 ? (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-1 md:gap-1 font-bebas text-base md:text-lg text-midnight hover:text-electric transition-colors"
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
                        className="px-4 md:px-6 py-2 md:py-2 bg-midnight text-cream font-bebas text-base md:text-lg tracking-wider neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        NEXT →
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className={`px-4 md:px-6 py-2 md:py-2 font-bebas text-base md:text-lg tracking-wider transition-all ${
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
                className="mt-3 md:mt-4 text-center"
              >
                <div className="inline-block bg-white rounded-full px-3 py-1.5 border-2 border-midnight neo-shadow">
                  <p className="font-inter text-midnight/40 text-xs leading-tight">
                    Step {currentStep} of 2 — Make it count! 
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right-side decorative elements for desktop/tablet */}
        <div className="hidden md:block pointer-events-none">
          {/* ELEMENT 3 - Right positioned - Desktop only animation */}
          <motion.div 
            className="fixed right-0 top-[-60%] z-[1] will-change-transform"
            animate={{ 
              rotate: [0, -2, 2, 0]
            }}
            transition={{ 
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
            data-tablet-optimize="true"
          >
            <img
              src="/assets/ELEMENT 3.png"
              alt="Element 3"
              className="w-full h-auto"
              decoding="async"
            />
          </motion.div>

          {/* SHAPE OREN - Right positioned - Static opacity for tablet stability */}
          <div 
            className="fixed right-0 top-[-60%] z-[1]"
            style={{ opacity: 0.9 }}
          >
            <img
              src="/assets/SHAPE OREN.png"
              alt="Shape Oren"
              className="w-full h-auto"
              decoding="async"
            />
          </div>

          {/* OVERLAY AUDIO - Right positioned - Desktop only animation */}
          <motion.div 
            className="fixed right-0 top-[-50%] z-[2] will-change-transform"
            animate={{ 
              rotate: [0, 3, -3, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            data-tablet-optimize="true"
          >
            <img
              src="/assets/OVERLAY AUDIO.png"
              alt="Overlay Audio"
              className="w-full h-auto"
              decoding="async"
            />
          </motion.div>

          {/* BRUSH NOISE BIRU MUDA 2 - Right positioned - Simplified for tablet */}
          <motion.div 
            className="fixed right-0 top-[-70%] z-[1] will-change-transform"
            animate={{ 
              y: [0, -9, 0]
            }}
            transition={{ 
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <img
              src="/assets/BRUSH NOISE BIRU MUDA 2.png"
              alt="Brush stroke"
              className="opacity-70 w-full h-auto"
              decoding="async"
            />
          </motion.div>

          {/* BRUSH NOISE ORANGE - Right positioned - Simplified for tablet */}
          <motion.div 
            className="fixed right-0 top-[-60%] z-[1] will-change-transform"
            animate={{ 
              y: [0, 10, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <img
              src="/assets/BRUSH NOISE ORANGE.png"
              alt="Brush stroke"
              className="opacity-80 w-full h-auto"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
