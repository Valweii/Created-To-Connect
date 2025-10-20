import { z } from 'zod';

export const registrationSchema = z.object({
  // Basic Information
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  instagram: z.string().min(1, 'Instagram username is required').regex(/^@?[a-zA-Z0-9._]+$/, 'Invalid Instagram username format'),
  phonenumber: z.string().min(10, 'Valid phone number required'),
  
  // CG Membership
  isCGMember: z.boolean().default(false),
  cgNumber: z.string().optional(),
  heardFrom: z.string().optional(),
  
}).refine(
  (data) => {
    // If CG member, must select a CG number
    if (data.isCGMember && !data.cgNumber) return false;
    // If not CG member, must select where they heard from
    if (!data.isCGMember && !data.heardFrom) return false;
    return true;
  },
  {
    message: 'Please provide required information',
    path: ['cgNumber'],
  }
);

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// CG Numbers list
export const CG_NUMBERS = ['CG 47 - Diandra', 'CG 61 - Yulius', 'CG 75 - Janice', 'CG 79 - Alvin Liem', 'CG 88 - Cindy', 'CG 102 - Josephine'] as const;

// Heard From options
export const HEARD_FROM_OPTIONS = [
  'Social Media',
  'Friend/Family',
  'Church',
  'School',
  'Event',
  'Other',
] as const;


