import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app';
import { PromotionService } from './promotion.service';
import { Promotion } from './promotion.model';

class FakePromotionService {
  promotions: Promotion[] = [
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
  ];

  getPromotions() {
    // Simulate observable returning data
    return of(this.promotions);
  }

  updatePromotion(id: number, changes: Partial<Promotion>) {
    const existing = this.promotions.find((p) => p.id === id)!;
    const updated: Promotion = { ...existing, ...changes };
    // Also update the local array so component sees changes if it re-reads
    this.promotions = this.promotions.map((p) =>
      p.id === id ? updated : p
    );
    return of(updated);
  }
}

describe('AppComponent (dashboard behaviour)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockService: FakePromotionService;

  beforeEach(async () => {
    mockService = new FakePromotionService();

    await TestBed.configureTestingModule({
      imports: [AppComponent], // standalone
      providers: [
        { provide: PromotionService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should render promotions from the service', () => {
    fixture.detectChanges(); // triggers ngOnInit + loadPromotions

    const compiled: HTMLElement = fixture.nativeElement;
    const cards = compiled.querySelectorAll('article.item');

    expect(cards.length).toBe(2);
    expect(compiled.textContent).toContain('Welcome Bonus');
    expect(compiled.textContent).toContain('Sports Free Bet');
  });

  it('should filter promotions by category and status', () => {
    fixture.detectChanges(); // load initial data

    // Set filters just like user interaction would
    component.categoryFilter = 'Casino';
    component.statusFilter = 'active';
    component.applyFilters();
    fixture.detectChanges();

    expect(component.filteredPromotions.length).toBe(1);
    expect(component.filteredPromotions[0].title).toBe('Welcome Bonus');

    const compiled: HTMLElement = fixture.nativeElement;
    const cards = compiled.querySelectorAll('article.item');

    // Only one card should be visible in the DOM
    expect(cards.length).toBe(1);
    expect(compiled.textContent).toContain('Welcome Bonus');
    expect(compiled.textContent).not.toContain('Sports Free Bet');
  });

  it('toggleOptIn should flip optedIn and active and call service.updatePromotion', () => {
    fixture.detectChanges(); // load initial data

    const promo = component.filteredPromotions[0];
    expect(promo.optedIn).toBeFalse();
    expect(promo.active).toBeTrue();

    const updateSpy = spyOn(
      mockService,
      'updatePromotion'
    ).and.callThrough();

    component.toggleOptIn(promo);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(promo.id, {
      optedIn: true,
      active: false,
    });

    // Component state should be updated to new values
    const updated = component.promotions.find((p) => p.id === promo.id)!;
    expect(updated.optedIn).toBeTrue();
    expect(updated.active).toBeFalse();
  });
});
