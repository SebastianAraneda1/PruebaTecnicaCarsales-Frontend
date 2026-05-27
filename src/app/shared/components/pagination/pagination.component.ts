import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  hasNextPage = input.required<boolean>();
  hasPreviousPage = input.required<boolean>();

  pageChange = output<number>();

  /// <summary>
  /// Navega a la página anterior si es que existe.
  /// </summary>
  goToPreviousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }

    this.pageChange.emit(this.currentPage() - 1);
  }

  /// <summary>
  /// Navega a la siguiente página si es que existe.
  /// </summary>
  goToNextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }

    this.pageChange.emit(this.currentPage() + 1);
  }
}