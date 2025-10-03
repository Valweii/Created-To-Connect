'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { RegistrationFormData, CG_NUMBERS, HEARD_FROM_OPTIONS } from './types';

interface StepCGInfoProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export default function StepCGInfo({ register, errors, watch, setValue }: StepCGInfoProps) {
  const isCGMember = watch('isCGMember');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 md:space-y-6"
    >
      {/* CG Member Checkbox */}
      <div className="bg-electric/10 border-2 md:border-3 border-electric p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <input
            id="isCGMember"
            type="checkbox"
            {...register('isCGMember')}
            onChange={(e) => {
              setValue('isCGMember', e.target.checked);
              // Clear the opposite field when toggling
              if (e.target.checked) {
                setValue('heardFrom', undefined);
              } else {
                setValue('cgNumber', undefined);
              }
            }}
            className="w-6 h-6 md:w-8 md:h-8 mt-1 text-electric bg-cream border-2 md:border-3 border-midnight rounded focus:ring-2 md:focus:ring-4 focus:ring-electric/20 cursor-pointer"
          />
          <label htmlFor="isCGMember" className="text-midnight font-inter font-semibold text-sm md:text-lg cursor-pointer">
            I&apos;m a part of a Connect Group (CG)
          </label>
        </div>
      </div>

      {/* Conditional Dropdown */}
      <AnimatePresence mode="wait">
        {isCGMember ? (
          /* CG Number Dropdown */
          <motion.div
            key="cg-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="cgNumber" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
              Select Your CG Number *
            </label>
            <select
              id="cgNumber"
              {...register('cgNumber')}
              className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-sunshine focus:ring-2 md:focus:ring-4 focus:ring-sunshine/20 transition-all cursor-pointer"
              aria-describedby={errors.cgNumber ? 'cgNumber-error' : undefined}
            >
              <option value="">-- Select CG Number --</option>
              {CG_NUMBERS.map((cg) => (
                <option key={cg} value={cg}>
                  {cg}
                </option>
              ))}
            </select>
            {errors.cgNumber && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="cgNumber-error"
                className="mt-2 text-sm text-flame font-inter font-medium"
              >
                {errors.cgNumber.message}
              </motion.p>
            )}
          </motion.div>
        ) : (
          /* Heard From Dropdown */
          <motion.div
            key="heard-from-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="heardFrom" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
              How did you hear about us? *
            </label>
            <select
              id="heardFrom"
              {...register('heardFrom')}
              className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-sunshine focus:ring-2 md:focus:ring-4 focus:ring-sunshine/20 transition-all cursor-pointer"
              aria-describedby={errors.heardFrom ? 'heardFrom-error' : undefined}
            >
              <option value="">-- Select an option --</option>
              {HEARD_FROM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.heardFrom && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="heardFrom-error"
                className="mt-2 text-sm text-flame font-inter font-medium"
              >
                {errors.heardFrom.message}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consent */}
      <div className="bg-flame/10 border-2 md:border-3 border-flame p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <input
            id="consent"
            type="checkbox"
            {...register('consent')}
            className="w-6 h-6 md:w-8 md:h-8 mt-1 text-electric bg-cream border-2 md:border-3 border-midnight rounded focus:ring-2 md:focus:ring-4 focus:ring-electric/20 cursor-pointer"
            aria-describedby={errors.consent ? 'consent-error' : undefined}
          />
          <label htmlFor="consent" className="text-midnight font-inter text-sm md:text-lg cursor-pointer flex-1">
            I consent to receive event updates and agree to follow camp guidelines *
          </label>
        </div>
        {errors.consent && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="consent-error"
            className="mt-3 text-sm text-flame font-inter font-medium ml-10 md:ml-12"
          >
            {errors.consent.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

