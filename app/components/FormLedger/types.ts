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
  heardFromOther: z.string().optional(),
  
}).superRefine((data, ctx) => {
  // If CG member, must select a CG number
  if (data.isCGMember && !data.cgNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select your CG number',
      path: ['cgNumber'],
    });
  }
  
  // If not CG member, must select where they heard from
  if (!data.isCGMember && !data.heardFrom) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select how you heard about us',
      path: ['heardFrom'],
    });
  }
  
  // If "Other" is selected, must provide details
  if (!data.isCGMember && data.heardFrom === 'Other' && (!data.heardFromOther || data.heardFromOther.trim().length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please specify where you heard about this event',
      path: ['heardFromOther'],
    });
  }
  
  // If "Other" is provided, ensure it has at least 3 characters
  if (!data.isCGMember && data.heardFrom === 'Other' && data.heardFromOther && data.heardFromOther.trim().length > 0 && data.heardFromOther.trim().length < 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please provide at least 3 characters',
      path: ['heardFromOther'],
    });
  }
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// CG Numbers list
export const CG_NUMBERS = ['CG 47 - Diandra Astrid Pakaya', 'CG 61 - Yulius', 'CG 75 - Janice Tiffany', 'CG 79 - Alvin Liem', 'CG 88 - Cindy Lians', 'CG 102 - Josephine Esther Budiono'] as const;

// Heard From options
export const HEARD_FROM_OPTIONS = [
  'Social Media',
  'Friend/Family',
  'Church',
  'School',
  'Event',
  'Other',
] as const;


