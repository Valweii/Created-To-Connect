'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface ModernStepMembershipProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  isMember?: boolean;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export default function ModernStepMembership({ register, errors, isMember }: ModernStepMembershipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 md:space-y-8"
    >
      <div className="bg-sunshine/10 border-2 md:border-3 border-sunshine p-4 md:p-6">
        <div className="flex items-center gap-3 md:gap-4">
          <input
            id="isMember"
            type="checkbox"
            {...register('isMember')}
            className="w-6 h-6 md:w-8 md:h-8 text-electric bg-cream border-2 md:border-3 border-midnight rounded focus:ring-2 md:focus:ring-4 focus:ring-electric/20 cursor-pointer"
          />
          <label htmlFor="isMember" className="text-midnight font-inter font-semibold text-sm md:text-lg cursor-pointer">
            I'm already a member of the community
          </label>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isMember ? (
          <motion.div
            key="member"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="memberId" className="block text-midnight font-inter font-semibold mb-2 text-xs md:text-sm uppercase tracking-wider">
              Member ID *
            </label>
            <input
              id="memberId"
              type="text"
              {...register('memberId')}
              className="w-full px-4 py-3 md:px-6 md:py-4 border-2 md:border-3 border-midnight bg-cream text-midnight font-inter text-base md:text-lg focus:outline-none focus:border-electric focus:ring-2 md:focus:ring-4 focus:ring-electric/20 transition-all"
              placeholder="MEMBER-12345"
              aria-describedby={errors.memberId ? 'memberId-error' : undefined}
            />
            {errors.memberId && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                id="memberId-error"
                className="mt-2 text-sm text-flame font-inter font-medium"
              >
                {errors.memberId.message}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="new"
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
              <option value="">Select one...</option>
              <option value="friend">Friend or Family</option>
              <option value="social">Social Media</option>
              <option value="church">Church/Community Group</option>
              <option value="website">Website</option>
              <option value="other">Other</option>
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
    </motion.div>
  );
}

