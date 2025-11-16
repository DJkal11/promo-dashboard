 
 
 export function filterPromotions(list, { category, status, start, end }) {
    return (list || []).filter(p => {
      if (category && p.category !== category) return false;
      if (status === 'active' && !p.active) return false;
      if (status === 'inactive' && p.active) return false;
      if (start && p.startDate < start) return false;
      if (end && p.endDate > end) return false;
      return true;
    });
  }