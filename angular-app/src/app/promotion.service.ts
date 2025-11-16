import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promotion } from './promotion.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private baseUrl = environment.apiBaseUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  /**
   * Load all promotions from the API.
   * GET /promotions
   */
  getPromotions() {
    return this.http.get<Promotion[]>(`${this.baseUrl}/promotions`);
  }

  /**
   * Update a promotion's fields.
   * PATCH /promotions/:id
   *
   * We pass only the fields we want to update (Partial<Promotion>).
   */
  updatePromotion(id: number, changes: Partial<Promotion>) {
    return this.http.patch<Promotion>(`${this.baseUrl}/promotions/${id}`, changes);
  }
}
