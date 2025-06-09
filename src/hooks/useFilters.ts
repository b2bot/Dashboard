
import { useState, useEffect } from 'react';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DashboardFilters {
  selectedAccount: string;
  searchTerm: string;
  dateRange: DateRange;
}

export const useFilters = () => {
  const [filters, setFilters] = useState<DashboardFilters>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('dashboard-filters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        if (parsed.dateRange) {
          parsed.dateRange = {
            from: parsed.dateRange.from ? new Date(parsed.dateRange.from) : undefined,
            to: parsed.dateRange.to ? new Date(parsed.dateRange.to) : undefined,
          };
        }
        return parsed;
      } catch {
        return {
          selectedAccount: 'all',
          searchTerm: '',
          dateRange: { from: undefined, to: undefined },
        };
      }
    }
    
    return {
      selectedAccount: 'all',
      searchTerm: '',
      dateRange: { from: undefined, to: undefined },
    };
  });

  // Save to localStorage when filters change
  useEffect(() => {
    localStorage.setItem('dashboard-filters', JSON.stringify(filters));
  }, [filters]);

  const updateFilters = (updates: Partial<DashboardFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters({
      selectedAccount: 'all',
      searchTerm: '',
      dateRange: { from: undefined, to: undefined },
    });
  };

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};
