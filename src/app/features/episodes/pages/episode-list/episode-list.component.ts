import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Episode, EpisodeFilters } from '../../../../core/models/episode.model';
import { PaginatedResponse } from '../../../../core/models/paginated-response.model';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { getErrorMessage } from '../../../../shared/utils/error-message.util';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-episode-list',
  imports: [
    FormsModule,
    ErrorMessageComponent,
    LoadingStateComponent,
    PaginationComponent,
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss',
})
export class EpisodeListComponent implements OnInit {
  private readonly episodeService = inject(EpisodeService);

  episodes = signal<Episode[]>([]);
  currentPage = signal(1);
  totalPages = signal(0);
  hasNextPage = signal(false);
  hasPreviousPage = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  nameFilter = signal('');
  episodeFilter = signal('');

  hasResults = computed(() => this.episodes().length > 0);

  ngOnInit(): void {
    this.loadEpisodes();
  }

  /**
   * Carga los episodios usando los filtros establecidos y la página actual,
   * además de manejar el estado de carga y errores.
   * @param page Página a cargar, si no se proporciona se usará la página actual.
   */
  loadEpisodes(page = this.currentPage()): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filters: EpisodeFilters = {
      page,
      name: this.nameFilter(),
      episode: this.episodeFilter(),
    };

    this.episodeService.getEpisodes(filters).subscribe({
      next: (response) => this.updateState(response),
      error: (error) => {
        this.errorMessage.set(getErrorMessage(error));
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Realiza una búsqueda usando los filtros establecidos, regresa a la primera página y recarga los episodios.
   * Este método se llama al hacer clic en el botón de búsqueda o al presionar Enter en los campos de filtro.
   * Resetea la página actual a 1 para asegurar que la búsqueda comience desde la primera página de resultados.
   * Luego llama a loadEpisodes para cargar los episodios con los nuevos filtros.
   * @returns void
   */
  search(): void {
    this.currentPage.set(1);
    this.loadEpisodes(1);
  }

  /**
   * Elimina los filtros de búsqueda, regresa a la primera página y recarga los episodios.
   * @returns void
   */
  clearFilters(): void {
    const hasActiveFilters =
      this.nameFilter().trim() !== '' || this.episodeFilter().trim() !== '';

    const isNotFirstPage = this.currentPage() !== 1;

    if (!hasActiveFilters && !isNotFirstPage) {
      return;
    }

    this.nameFilter.set('');
    this.episodeFilter.set('');
    this.currentPage.set(1);
    this.loadEpisodes(1);
  }

  /**
   * Se cambia la página usando el componente de paginación,
   * además de recargar los episodios.
   * @param page Número de la página a cargar.
   * @returns void
   */
  changePage(page: number): void {
    this.currentPage.set(page);
    this.loadEpisodes(page);
  }

  /**
   * Actualiza el estado del componente con la respuesta que se obtiene de la API
   * @param response Respuesta de la API
   * @returns void
   */
  private updateState(response: PaginatedResponse<Episode>): void {
    this.episodes.set(response.results);
    this.currentPage.set(response.currentPage);
    this.totalPages.set(response.pages);
    this.hasNextPage.set(response.hasNextPage);
    this.hasPreviousPage.set(response.hasPreviousPage);
    this.isLoading.set(false);
  }
}
