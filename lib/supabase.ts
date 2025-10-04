/**
 * Supabase Client Configuration
 * 
 * Initialized with environment variables from .env.local
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.\n' +
    'Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper function to get current time in Jakarta timezone (UTC+7)
 */
function getJakartaTime(): string {
  const now = new Date();
  // Convert to Jakarta time (UTC+7)
  const jakartaTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  return jakartaTime.toISOString();
}

/**
 * Database Types
 */
export interface Registration {
  id: string;
  ticketid: string;
  name: string;
  instagram: string;
  phonenumber: string;
  is_cg_member: boolean;
  cg_number?: string;
  heard_from?: string;
  dateregistered: string;
  reregistered: boolean;
  datereregistered?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Insert a new registration
 */
export async function insertRegistration(data: {
  ticketid: string;
  name: string;
  instagram: string;
  phonenumber: string;
  is_cg_member: boolean;
  cg_number?: string;
  heard_from?: string;
}) {
  const { data: registration, error } = await supabase
    .from('registrations')
    .insert([
      {
        ticketid: data.ticketid,
        name: data.name,
        instagram: data.instagram,
        phonenumber: data.phonenumber,
        is_cg_member: data.is_cg_member,
        cg_number: data.cg_number || null,
        heard_from: data.heard_from || null,
        dateregistered: getJakartaTime(), // Explicitly set Jakarta time (UTC+7)
        reregistered: false, // Default to false on first registration
        datereregistered: null,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return registration as Registration;
}

/**
 * Check if a registration exists by ticketid
 */
export async function getRegistrationByTicketId(ticketid: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('ticketid', ticketid)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = not found, which is ok
    throw error;
  }

  return data as Registration | null;
}

/**
 * Mark a registration as re-registered
 */
export async function markAsReregistered(ticketid: string) {
  const { data, error } = await supabase
    .from('registrations')
    .update({
      reregistered: true,
      datereregistered: getJakartaTime(), // Use Jakarta time (UTC+7)
    })
    .eq('ticketid', ticketid)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Registration;
}

/**
 * Get all registrations (for admin use)
 */
export async function getAllRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('dateregistered', { ascending: false });

  if (error) {
    throw error;
  }

  return data as Registration[];
}

/**
 * Format date as dd/mm/yyyy, HH:MM (assumes date is already in Jakarta timezone)
 */
export function formatRegistrationDate(isoDate: string): string {
  const date = new Date(isoDate);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year}, ${hours}:${minutes} WIB`;
}

