export interface Promotion {
    id: number;
    title: string;
    category: string;
    active: boolean;
    startDate: string; // ISO date string (e.g. "2025-08-01")
    endDate: string;
    optedIn: boolean;
  }
  