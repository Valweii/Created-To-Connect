'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface StepBasicInfoProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export default function StepBasicInfo({ register, errors }: StepBasicInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="space-y-3 md:space-y-3"
      style={{
        willChange: 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-midnight font-inter font-semibold mb-1 text-xs uppercase tracking-wider">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 md:px-3 md:py-2 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-sm md:text-sm focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-3 focus:ring-electric/20 transition-all"
          placeholder="Vincent Wijaya"
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="name-error"
            className="mt-2 text-xs md:text-sm text-flame font-inter font-medium"
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      {/* Instagram */}
      <div>
        <label htmlFor="instagram" className="block text-midnight font-inter font-semibold mb-1 text-xs uppercase tracking-wider">
          Instagram Username *
        </label>
        <input
          id="instagram"
          type="text"
          {...register('instagram')}
          className="w-full px-3 py-2 md:px-3 md:py-2 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-sm md:text-sm focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-3 focus:ring-electric/20 transition-all"
          placeholder="@username or username"
          aria-describedby={errors.instagram ? 'instagram-error' : undefined}
        />
        {errors.instagram && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="instagram-error"
            className="mt-2 text-xs md:text-sm text-flame font-inter font-medium"
          >
            {errors.instagram.message}
          </motion.p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phonenumber" className="block text-midnight font-inter font-semibold mb-1 text-xs uppercase tracking-wider">
          Phone Number *
        </label>
        <input
          id="phonenumber"
          type="tel"
          {...register('phonenumber')}
          className="w-full px-3 py-2 md:px-3 md:py-2 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-sm md:text-sm focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-3 focus:ring-electric/20 transition-all"
          placeholder="0812345678"
          aria-describedby={errors.phonenumber ? 'phonenumber-error' : undefined}
        />
        {errors.phonenumber && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="phonenumber-error"
            className="mt-2 text-xs md:text-sm text-flame font-inter font-medium"
          >
            {errors.phonenumber.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}






