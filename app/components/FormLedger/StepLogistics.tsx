'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface StepLogisticsProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export default function StepLogistics({ register, errors }: StepLogisticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* <div>
        <label htmlFor="dietaryRestrictions" className="block text-lodgeWood font-barlow font-semibold mb-2">
          Dietary Restrictions <span className="text-red-600">*</span>
        </label>
        <textarea
          id="dietaryRestrictions"
          {...register('dietaryRestrictions')}
          rows={3}
          className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold resize-none"
          placeholder="List any dietary restrictions or allergies, or write 'None'"
          aria-describedby={errors.dietaryRestrictions ? 'dietary-error' : undefined}
        />
        {errors.dietaryRestrictions && (
          <p id="dietary-error" className="mt-1 text-sm text-red-600 font-barlow">
            {errors.dietaryRestrictions.message}
          </p>
        )}
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emergencyContactName" className="block text-lodgeWood font-barlow font-semibold mb-2">
            Emergency Contact Name <span className="text-red-600">*</span>
          </label>
          <input
            id="emergencyContactName"
            type="text"
            {...register('emergencyContactName')}
            className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
            aria-describedby={errors.emergencyContactName ? 'emergency-name-error' : undefined}
          />
          {errors.emergencyContactName && (
            <p id="emergency-name-error" className="mt-1 text-sm text-red-600 font-barlow">
              {errors.emergencyContactName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="emergencyContactPhone" className="block text-lodgeWood font-barlow font-semibold mb-2">
            Emergency Contact Phone <span className="text-red-600">*</span>
          </label>
          <input
            id="emergencyContactPhone"
            type="tel"
            {...register('emergencyContactPhone')}
            className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
            aria-describedby={errors.emergencyContactPhone ? 'emergency-phone-error' : undefined}
          />
          {errors.emergencyContactPhone && (
            <p id="emergency-phone-error" className="mt-1 text-sm text-red-600 font-barlow">
              {errors.emergencyContactPhone.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3 mt-6">
        <input
          id="consent"
          type="checkbox"
          {...register('consent')}
          className="w-5 h-5 mt-1 text-warmGold bg-white/50 border-lodgeWood/30 rounded focus:ring-warmGold focus:ring-2"
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <label htmlFor="consent" className="text-lodgeWood font-barlow">
          I consent to receive event updates and agree to follow camp guidelines <span className="text-red-600">*</span>
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-sm text-red-600 font-barlow">
          {errors.consent.message}
        </p>
      )}
    </motion.div>
  );
}


