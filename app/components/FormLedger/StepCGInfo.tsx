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
      <div className="bg-electric/10 border-3 md:border-4 border-electric p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(242,187,5,1)] hover:shadow-[6px_6px_0px_0px_rgba(242,187,5,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="relative flex-shrink-0">
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
              className="peer sr-only"
            />
            <label 
              htmlFor="isCGMember" 
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-cream border-3 md:border-4 border-midnight cursor-pointer transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(31,31,31,1)] hover:shadow-[4px_4px_0px_0px_rgba(31,31,31,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[2px_2px_0px_0px_rgba(31,31,31,1)] active:translate-x-[1px] active:translate-y-[1px] peer-checked:bg-electric peer-checked:border-electric peer-focus-visible:ring-4 peer-focus-visible:ring-electric/40 rounded-sm"
            >
              <svg 
                className="w-5 h-5 md:w-6 md:h-6 text-cream transition-all duration-200"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                style={{ opacity: isCGMember ? 1 : 0, transform: isCGMember ? 'scale(1.1)' : 'scale(1)' }}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </label>
          </div>
          <label htmlFor="isCGMember" className="text-midnight font-inter font-bold text-sm md:text-lg cursor-pointer uppercase tracking-wide pt-1">
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
              className="w-full px-4 py-3 md:px-6 md:py-4 border-3 md:border-4 border-midnight bg-cream text-midnight font-inter font-bold text-base md:text-lg focus:outline-none focus:border-electric focus:ring-4 md:focus:ring-6 focus:ring-electric/30 transition-all cursor-pointer hover:bg-electric/5 hover:border-electric shadow-[4px_4px_0px_0px_rgba(31,31,31,1)] hover:shadow-[6px_6px_0px_0px_rgba(242,187,5,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231f1f1f%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-[right_1rem_center] bg-no-repeat pr-12"
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
              className="w-full px-4 py-3 md:px-6 md:py-4 border-3 md:border-4 border-midnight bg-cream text-midnight font-inter font-bold text-base md:text-lg focus:outline-none focus:border-electric focus:ring-4 md:focus:ring-6 focus:ring-electric/30 transition-all cursor-pointer hover:bg-electric/5 hover:border-electric shadow-[4px_4px_0px_0px_rgba(31,31,31,1)] hover:shadow-[6px_6px_0px_0px_rgba(242,187,5,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231f1f1f%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:24px_24px] bg-[right_1rem_center] bg-no-repeat pr-12"
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
    </motion.div>
  );
}