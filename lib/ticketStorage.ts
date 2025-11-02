import { getRegistrationByTicketId } from './supabase';

export interface SavedTicket {
  ticketId: string;
  qrUrl: string;
  name: string;
  timestamp: number;
  registrationData?: {
    instagram: string;
    phonenumber: string;
    isCGMember: boolean;
    cgNumber?: string;
    heardFrom?: string;
    heardFromOther?: string;
  };
}

const STORAGE_KEY = 'kkr_tickets';

// Expiry date: November 22, 2025 00:00:00 WIB (UTC+7)
// This is November 21, 2025 17:00:00 UTC
const EXPIRY_DATE = new Date('2025-11-22T00:00:00+07:00').getTime();

// Check if a ticket has expired
const isTicketExpired = (): boolean => {
  return Date.now() > EXPIRY_DATE;
};

// Remove expired tickets from ALL storage types
const cleanupExpiredTickets = async (): Promise<void> => {
  if (isTicketExpired()) {
    try {
      // 1. Clear localStorage
      localStorage.removeItem(STORAGE_KEY);

      // 2. Clear all Cache Storage (service worker caches)
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // 3. Clear IndexedDB databases
      if ('indexedDB' in window) {
        const databases = await indexedDB.databases();
        await Promise.all(
          databases.map(db => {
            if (db.name) {
              return new Promise<void>((resolve, reject) => {
                const deleteRequest = indexedDB.deleteDatabase(db.name!);
                deleteRequest.onsuccess = () => {
                  resolve();
                };
                deleteRequest.onerror = () => reject(deleteRequest.error);
                deleteRequest.onblocked = () => {
                  resolve(); // Don't reject, just continue
                };
              });
            }
            return Promise.resolve();
          })
        );
      }

      // 4. Clear sessionStorage as well
      sessionStorage.clear();
    } catch (error) {
      // Silent error handling
    }
  }
};

export const ticketStorage = {
  // Save a new ticket to localStorage
  saveTicket: (ticket: Omit<SavedTicket, 'timestamp'>): void => {
    try {
      const existingTickets = ticketStorage.getAllTickets();
      const newTicket: SavedTicket = {
        ...ticket,
        timestamp: Date.now(),
      };
      
      const updatedTickets = [...existingTickets, newTicket];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));
    } catch (error) {
      // Silent error handling
    }
  },

  // Get all tickets from localStorage (automatically filters expired tickets)
  getAllTickets: (): SavedTicket[] => {
    try {
      // If tickets have expired, trigger cleanup and return empty array
      if (isTicketExpired()) {
        // Trigger thorough cleanup in the background (non-blocking)
        cleanupExpiredTickets().catch(() => {
          // Silent error handling
        });
        return [];
      }
      
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  },

  // Check if user has any existing tickets
  hasExistingTickets: (): boolean => {
    return ticketStorage.getAllTickets().length > 0;
  },

  // Get ticket count
  getTicketCount: (): number => {
    return ticketStorage.getAllTickets().length;
  },

  // Clear all tickets (for testing or reset)
  clearAllTickets: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // Silent error handling
    }
  },

  // Get ticket by ID
  getTicketById: (ticketId: string): SavedTicket | null => {
    const tickets = ticketStorage.getAllTickets();
    return tickets.find(ticket => ticket.ticketId === ticketId) || null;
  },

  // Verify all cached tickets against Supabase and remove invalid ones
  verifyAndCleanupTickets: async (): Promise<void> => {
    try {
      // Skip if tickets are expired (cleanup will handle it)
      if (isTicketExpired()) {
        return;
      }

      // Get tickets directly from localStorage to avoid expiry check logic
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }

      let cachedTickets: SavedTicket[];
      try {
        cachedTickets = JSON.parse(stored);
      } catch {
        // If parse fails, clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      // If no tickets, nothing to verify
      if (!Array.isArray(cachedTickets) || cachedTickets.length === 0) {
        return;
      }

      // Verify each ticket against Supabase
      const validTickets: SavedTicket[] = [];
      
      await Promise.all(
        cachedTickets.map(async (ticket) => {
          try {
            const registration = await getRegistrationByTicketId(ticket.ticketId);
            // Only keep tickets that exist in Supabase
            if (registration) {
              validTickets.push(ticket);
            }
          } catch (error) {
            // If verification fails, remove the ticket for safety
            // Silent error handling
          }
        })
      );

      // Update localStorage with only valid tickets
      if (validTickets.length !== cachedTickets.length) {
        if (validTickets.length === 0) {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validTickets));
        }
      }
    } catch (error) {
      // Silent error handling
    }
  },

  // Initialize and check for expired tickets (call this on app startup)
  initialize: async (): Promise<void> => {
    await cleanupExpiredTickets();
    // Verify tickets against Supabase after expiry check
    await ticketStorage.verifyAndCleanupTickets();
  }
};
