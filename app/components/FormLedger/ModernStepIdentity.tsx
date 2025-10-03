'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface ModernStepIdentityProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export default function ModernStepIdentity({ register, errors }: ModernStepIdentityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="fullName" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            {...register('fullName')}
            className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-4 focus:ring-electric/20 transition-all"
            placeholder="John Doe"
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              id="fullName-error"
              className="mt-2 text-sm text-flame font-inter font-medium"
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="preferredName" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
            Preferred Name
          </label>
          <input
            id="preferredName"
            type="text"
            {...register('preferredName')}
            className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-sunshine focus:ring-2 md:focus:ring-4 focus:ring-sunshine/20 transition-all"
            placeholder="Johnny"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-4 focus:ring-electric/20 transition-all"
          placeholder="john@example.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="email-error"
            className="mt-2 text-sm text-flame font-inter font-medium"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-sunshine focus:ring-2 md:focus:ring-4 focus:ring-sunshine/20 transition-all"
          placeholder="+1 (555) 000-0000"
        />
      </div>
    </motion.div>
  );
}

