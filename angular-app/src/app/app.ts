import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Promotion } from './promotion.model';
import { PromotionService } from './promotion.service';
import { filterPromotions } from './promotion-filters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  title = 'Promo Dashboard (Angular)';

  // Raw data from API
  promotions: Promotion[] = [];

  // Data after filters are applied
  filteredPromotions: Promotion[] = [];

  // Filter state (bound to form controls)
  categoryFilter = '';
  statusFilter: '' | 'active' | 'inactive' = '';
  startDateFilter = '';
  endDateFilter = '';

  // UI state
  loading = false;
  error: string | null = null;

  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  /**
   * Calls the service to load promotions from the API.
   * Handles loading and error states, then applies filters.
   */
  loadPromotions(): void {
    this.loading = true;
    this.error = null;

    this.promotionService.getPromotions().subscribe({
      next: (data) => {
        this.promotions = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load promotions', err);
        this.error = 'Failed to load promotions. Please try again.';
        this.loading = false;
      },
    });
  }

  /**
   * Recomputes filteredPromotions using the current filter state.
   * This is the Angular version of your React filter helper usage.
   */
  applyFilters(): void {
    this.filteredPromotions = filterPromotions(this.promotions, {
      category: this.categoryFilter,
      status: this.statusFilter,
      startDate: this.startDateFilter,
      endDate: this.endDateFilter,
    });
  }

  /**
   * Reset filters back to "show everything".
   */
  resetFilters(): void {
    this.categoryFilter = '';
    this.statusFilter = '';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.applyFilters();
  }

  /**
   * Mirrors the React opt-in/opt-out toggle:
   *  - toggles both `optedIn` and `active`
   *  - sends PATCH to /promotions/:id
   *  - replaces the item locally and re-applies filters
   */
  toggleOptIn(promotion: Promotion): void {
    const updated = {
      optedIn: !promotion.optedIn,
      active: !promotion.active,
    };

    this.promotionService.updatePromotion(promotion.id, updated).subscribe({
      next: (saved) => {
        this.promotions = this.promotions.map((p) =>
          p.id === saved.id ? saved : p
        );
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to update promotion', err);
        this.error = 'Failed to update promotion. Please try again.';
      },
    });
  }
}
