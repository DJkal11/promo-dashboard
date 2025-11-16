import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PromotionService } from './promotion.service';
import { Promotion } from './promotion.model';
import { environment } from '../environments/environment';

describe('PromotionService', () => {
  let service: PromotionService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl.replace(/\/+$/, '');

  const mockPromotions: Promotion[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PromotionService],
    });

    service = TestBed.inject(PromotionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET all promotions from /promotions', () => {
    service.getPromotions().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].title).toBe('Welcome Bonus');
    });

    const req = httpMock.expectOne(`${baseUrl}/promotions`);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockPromotions);
  });

  it('should PATCH a promotion to /promotions/:id with changes', () => {
    const changes = { optedIn: true, active: true };

    service.updatePromotion(1, changes).subscribe((updated) => {
      expect(updated.id).toBe(1);
      expect(updated.optedIn).toBeTrue();
      expect(updated.active).toBeTrue();
    });

    const req = httpMock.expectOne(`${baseUrl}/promotions/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(changes);

    // Simulate backend returning the updated promotion
    req.flush({
      ...mockPromotions[0],
      ...changes,
    });
  });
});
