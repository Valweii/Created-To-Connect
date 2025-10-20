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
  };
}

const STORAGE_KEY = 'kkr_tickets';

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
      console.error('Error saving ticket to localStorage:', error);
    }
  },

  // Get all tickets from localStorage
  getAllTickets: (): SavedTicket[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving tickets from localStorage:', error);
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
      console.error('Error clearing tickets from localStorage:', error);
    }
  },

  // Get ticket by ID
  getTicketById: (ticketId: string): SavedTicket | null => {
    const tickets = ticketStorage.getAllTickets();
    return tickets.find(ticket => ticket.ticketId === ticketId) || null;
  }
};
