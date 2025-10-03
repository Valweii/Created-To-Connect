'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface StepIdentityProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export default function StepIdentity({ register, errors }: StepIdentityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="fullName" className="block text-lodgeWood font-barlow font-semibold mb-2">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-sm text-red-600 font-barlow">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="preferredName" className="block text-lodgeWood font-barlow font-semibold mb-2">
          Preferred Name
        </label>
        <input
          id="preferredName"
          type="text"
          {...register('preferredName')}
          className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lodgeWood font-barlow font-semibold mb-2">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 font-barlow">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-lodgeWood font-barlow font-semibold mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
        />
      </div>
    </motion.div>
  );
}


