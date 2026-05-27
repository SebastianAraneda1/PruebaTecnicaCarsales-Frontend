import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Character,
  CharacterFilters,
} from '../../../../core/models/character.model';
import { PaginatedResponse } from '../../../../core/models/paginated-response.model';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { getErrorMessage } from '../../../../shared/utils/error-message.util';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-list',
  imports: [
    FormsModule,
    ErrorMessageComponent,
    LoadingStateComponent,
    PaginationComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  private readonly characterService = inject(CharacterService);

  characters = signal<Character[]>([]);
  currentPage = signal(1);
  totalPages = signal(0);
  hasNextPage = signal(false);
  hasPreviousPage = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  nameFilter = signal('');
  statusFilter = signal('');
  speciesFilter = signal('');
  genderFilter = signal('');

  hasResults = computed(() => this.characters().length > 0);

  ngOnInit(): void {
    this.loadCharacters();
  }

  /**
   * Carga los personajes usando los filtros establecidos y la página actual,
   * además de manejar el estado de carga y errores.
   * @param page Página a cargar, si no se proporciona se usará la página actual.
   * @returns void
   */
  loadCharacters(page = this.currentPage()): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filters: CharacterFilters = {
      page,
      name: this.nameFilter(),
      status: this.statusFilter(),
      species: this.speciesFilter(),
      gender: this.genderFilter(),
    };

    this.characterService.getCharacters(filters).subscribe({
      next: (response) => this.updateState(response),
      error: (error) => {
        this.errorMessage.set(getErrorMessage(error));
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Realiza una búsqueda usando los filtros establecidos,
   * regresa a la primera página y recarga los personajes.
   * @returns void
   */
  search(): void {
    this.currentPage.set(1);
    this.loadCharacters(1);
  }

  /**
   * Elimina los filtros de búsqueda, regresa a la primera página y recarga los personajes.
   * @returns void
   */
  clearFilters(): void {
    const hasActiveFilters =
      this.nameFilter().trim() !== '' ||
      this.statusFilter().trim() !== '' ||
      this.speciesFilter().trim() !== '' ||
      this.genderFilter().trim() !== '';

    const isNotFirstPage = this.currentPage() !== 1;

    if (!hasActiveFilters && !isNotFirstPage) {
      return;
    }

    this.nameFilter.set('');
    this.statusFilter.set('');
    this.speciesFilter.set('');
    this.genderFilter.set('');
    this.currentPage.set(1);
    this.loadCharacters(1);
  }

  /**
   * Se cambia la página usando el componente de paginación,
   * además de recargar los personajes.
   * @param page Número de la página a cargar.
   * @returns void
   */
  changePage(page: number): void {
    this.currentPage.set(page);
    this.loadCharacters(page);
  }

  /**
   * Actualiza el estado del componente con la respuesta que se obtiene de la API.
   * @param response Respuesta de la API
   * @returns void
   */
  private updateState(response: PaginatedResponse<Character>): void {
    this.characters.set(response.results);
    this.currentPage.set(response.currentPage);
    this.totalPages.set(response.pages);
    this.hasNextPage.set(response.hasNextPage);
    this.hasPreviousPage.set(response.hasPreviousPage);
    this.isLoading.set(false);
  }
}
