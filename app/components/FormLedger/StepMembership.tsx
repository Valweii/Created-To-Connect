'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { RegistrationFormData } from './types';

interface StepMembershipProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  isMember?: boolean;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export default function StepMembership({ register, errors, isMember, setValue }: StepMembershipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <label htmlFor="isMember" className="text-lodgeWood font-barlow font-semibold">
          I am already a member
        </label>
        <input
          id="isMember"
          type="checkbox"
          {...register('isMember')}
          className="w-6 h-6 text-warmGold bg-white/50 border-lodgeWood/30 rounded focus:ring-warmGold focus:ring-2"
        />
      </div>

      {isMember ? (
        <div>
          <label htmlFor="memberId" className="block text-lodgeWood font-barlow font-semibold mb-2">
            Member ID <span className="text-red-600">*</span>
          </label>
          <input
            id="memberId"
            type="text"
            {...register('memberId')}
            className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
            aria-describedby={errors.memberId ? 'memberId-error' : undefined}
          />
          {errors.memberId && (
            <p id="memberId-error" className="mt-1 text-sm text-red-600 font-barlow">
              {errors.memberId.message}
            </p>
          )}
        </div>
      ) : (
        <div>
          <label htmlFor="heardFrom" className="block text-lodgeWood font-barlow font-semibold mb-2">
            How did you hear about us? <span className="text-red-600">*</span>
          </label>
          <select
            id="heardFrom"
            {...register('heardFrom')}
            className="w-full px-4 py-2 border border-lodgeWood/30 rounded bg-white/50 text-lodgeWood font-barlow focus:outline-none focus:ring-2 focus:ring-warmGold"
            aria-describedby={errors.heardFrom ? 'heardFrom-error' : undefined}
          >
            <option value="">Select an option</option>
            <option value="friend">Friend or Family</option>
            <option value="social">Social Media</option>
            <option value="church">Church/Community Group</option>
            <option value="website">Website</option>
            <option value="other">Other</option>
          </select>
          {errors.heardFrom && (
            <p id="heardFrom-error" className="mt-1 text-sm text-red-600 font-barlow">
              {errors.heardFrom.message}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}


