import { Promotion } from './promotion.model';

export interface PromotionFilters {
  category: string;
  status: '' | 'active' | 'inactive';
  startDate: string;
  endDate: string;
}

export function filterPromotions(
  list: Promotion[],
  filters: PromotionFilters
): Promotion[] {
  return (list || []).filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.status === 'active' && !p.active) return false;
    if (filters.status === 'inactive' && p.active) return false;
    if (filters.startDate && p.startDate < filters.startDate) return false;
    if (filters.endDate && p.endDate > filters.endDate) return false;
    return true;
  });
}
