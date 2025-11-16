import { filterPromotions, PromotionFilters } from './promotion-filters';
import { Promotion } from './promotion.model';

const mockList: Promotion[] = [
  {
    id: 1,
    title: 'Welcome Bonus',
    category: 'Casino',
    active: true,
    startDate: '2025-08-01',
    endDate: '2025-08-31',
    optedIn: false,
  },
  {
    id: 2,
    title: 'Sports Free Bet',
    category: 'Sports',
    active: true,
    startDate: '2025-11-01',
    endDate: '2025-12-01',
    optedIn: true,
  },
  {
    id: 3,
    title: 'Poker Night',
    category: 'Poker',
    active: false,
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    optedIn: false,
  },
];

describe('filterPromotions', () => {
  it('returns all promotions when filters are empty', () => {
    const filters: PromotionFilters = {
      category: '',
      status: '',
      startDate: '',
      endDate: '',
    };

    const result = filterPromotions(mockList, filters);
    expect(result.length).toBe(3);
  });

  it('filters by category', () => {
    const filters: PromotionFilters = {
      category: 'Sports',
      status: '',
      startDate: '',
      endDate: '',
    };

    const result = filterPromotions(mockList, filters);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Sports Free Bet');
  });

  it('filters by status active/inactive', () => {
    const activeOnly: PromotionFilters = {
      category: '',
      status: 'active',
      startDate: '',
      endDate: '',
    };
    const inactiveOnly: PromotionFilters = {
      category: '',
      status: 'inactive',
      startDate: '',
      endDate: '',
    };

    const activeResult = filterPromotions(mockList, activeOnly);
    const inactiveResult = filterPromotions(mockList, inactiveOnly);

    expect(activeResult.map((p) => p.id)).toEqual([1, 2]);
    expect(inactiveResult.map((p) => p.id)).toEqual([3]);
  });

  it('filters by startDate and endDate range', () => {
    const filters: PromotionFilters = {
      category: '',
      status: '',
      startDate: '2025-09-01',
      endDate: '2025-11-30',
    };

    const result = filterPromotions(mockList, filters);

    // Only items fully inside [2025-09-01, 2025-11-30]
    expect(result.map((p) => p.id)).toEqual([3]);
  });
});
