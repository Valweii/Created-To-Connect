'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface ModernStepLogisticsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export default function ModernStepLogistics({ register, errors }: ModernStepLogisticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 md:space-y-6"
    >
      {/* <div>
        <label htmlFor="dietaryRestrictions" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
          Dietary Restrictions *
        </label>
        <textarea
          id="dietaryRestrictions"
          {...register('dietaryRestrictions')}
          rows={3}
          className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-4 focus:ring-electric/20 resize-none transition-all"
          placeholder="List any dietary restrictions or allergies, or write 'None'"
          aria-describedby={errors.dietaryRestrictions ? 'dietary-error' : undefined}
        />
        {errors.dietaryRestrictions && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="dietary-error"
            className="mt-2 text-sm text-flame font-inter font-medium"
          >
            {errors.dietaryRestrictions.message}
          </motion.p>
        )}
      </div> */}

      <div className="bg-flame/10 border-2 md:border-3 border-flame p-4 md:p-6 space-y-3 md:space-y-4">
        <h3 className="font-bebas text-xl md:text-2xl text-midnight mb-2 md:mb-4">EMERGENCY CONTACT</h3>
        
        <div>
          <label htmlFor="emergencyContactName" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
            Contact Name *
          </label>
          <input
            id="emergencyContactName"
            type="text"
            {...register('emergencyContactName')}
            className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-flame focus:ring-2 md:focus:ring-4 focus:ring-flame/20 transition-all"
            placeholder="Jane Doe"
            aria-describedby={errors.emergencyContactName ? 'emergency-name-error' : undefined}
          />
          {errors.emergencyContactName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="emergency-name-error"
              className="mt-2 text-sm text-flame font-inter font-medium"
            >
              {errors.emergencyContactName.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="emergencyContactPhone" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
            Contact Phone *
          </label>
          <input
            id="emergencyContactPhone"
            type="tel"
            {...register('emergencyContactPhone')}
            className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-flame focus:ring-2 md:focus:ring-4 focus:ring-flame/20 transition-all"
            placeholder="+1 (555) 000-0000"
            aria-describedby={errors.emergencyContactPhone ? 'emergency-phone-error' : undefined}
          />
          {errors.emergencyContactPhone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="emergency-phone-error"
              className="mt-2 text-sm text-flame font-inter font-medium"
            >
              {errors.emergencyContactPhone.message}
            </motion.p>
          )}
        </div>
      </div>

      <div className="bg-electric/10 border-2 md:border-3 border-electric p-4 md:p-6">
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
            className="mt-3 text-sm text-flame font-inter font-medium ml-12"
          >
            {errors.consent.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

