import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  Character,
  CharacterFilters,
} from '../../../core/models/character.model';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/characters`;

  getCharacters(
    filters: CharacterFilters,
  ): Observable<PaginatedResponse<Character>> {
    const params = this.buildQueryParams(filters);
    return this.http.get<PaginatedResponse<Character>>(this.apiUrl, { params });
  }

  private buildQueryParams(filters: CharacterFilters): HttpParams {
    let params = new HttpParams().set('page', filters.page);

    if (filters.name.trim()) {
      params = params.set('name', filters.name.trim());
    }

    if (filters.status.trim()) {
      params = params.set('status', filters.status.trim());
    }

    if (filters.species.trim()) {
      params = params.set('species', filters.species.trim());
    }

    if (filters.gender.trim()) {
      params = params.set('gender', filters.gender.trim());
    }

    return params;
  }
}
