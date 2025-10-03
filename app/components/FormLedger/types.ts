import { z } from 'zod';

export const registrationSchema = z.object({
  // Step 1: Identity
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  preferredName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  
  // Step 2: Membership
  isMember: z.boolean().default(false),
  memberId: z.string().optional(),
  heardFrom: z.string().optional(),
  
  // Step 3: Logistics
  dietaryRestrictions: z.string().optional(), // Made optional since field is commented out
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Valid phone number required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to continue'),
}).refine(
  (data) => {
    if (data.isMember && !data.memberId) return false;
    if (!data.isMember && !data.heardFrom) return false;
    return true;
  },
  {
    message: 'Please provide required membership information',
    path: ['memberId'],
  }
);

export type RegistrationFormData = z.infer<typeof registrationSchema>;


