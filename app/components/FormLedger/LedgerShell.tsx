'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { registrationSchema, RegistrationFormData } from './types';
import StepIdentity from './StepIdentity';
import StepMembership from './StepMembership';
import StepLogistics from './StepLogistics';
import ConfirmationTicket from './ConfirmationTicket';

export default function LedgerShell() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const isMember = watch('isMember');

  const validateStep = async (step: number) => {
    const fields: (keyof RegistrationFormData)[][] = [
      ['fullName', 'email'],
      isMember ? ['memberId'] : ['heardFrom'],
      ['dietaryRestrictions', 'emergencyContactName', 'emergencyContactPhone', 'consent'],
    ];
    
    return await trigger(fields[step - 1]);
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setTicketData(result);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ticketData) {
    return <ConfirmationTicket ticketId={ticketData.ticketId} qrUrl={ticketData.qrUrl} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative">
      {/* Wooden background */}
      <div className="absolute inset-0 bg-gradient-to-br from-lodgeWood via-[#2a1810] to-[#1a0f08] opacity-90" />
      
      {/* Ledger container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-lodgeWood/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-warmGold to-yellow-500"
            initial={{ width: '33.33%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Parchment paper */}
        <div className="bg-parchment rounded-lg shadow-2xl parchment-shadow p-8 mt-6">
          <h2 className="text-3xl font-barlow font-bold text-lodgeWood text-center mb-2 uppercase tracking-wider">
            Registration Ledger
          </h2>
          <p className="text-center text-lodgeWood/60 mb-8 font-barlow">
            Step {currentStep} of 3
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StepIdentity key="step1" register={register} errors={errors} />
              )}
              {currentStep === 2 && (
                <StepMembership 
                  key="step2" 
                  register={register} 
                  errors={errors} 
                  isMember={isMember}
                  setValue={setValue}
                />
              )}
              {currentStep === 3 && (
                <StepLogistics key="step3" register={register} errors={errors} />
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-lodgeWood/20 text-lodgeWood font-barlow font-semibold rounded embossed-tab hover:bg-lodgeWood/30 transition-colors"
                >
                  ← Back
                </motion.button>
              )}
              
              <div className="flex-1" />
              
              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-lodgeWood text-parchment font-barlow font-semibold rounded embossed-tab hover:bg-lodgeWood/80 transition-colors"
                >
                  Next →
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`px-8 py-2 font-barlow font-semibold rounded transition-all ${
                    isSubmitting
                      ? 'bg-warmGold/50 text-parchment cursor-wait animate-pulse'
                      : 'bg-gradient-to-r from-warmGold to-yellow-500 text-lodgeWood hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}


