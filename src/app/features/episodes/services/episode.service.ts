import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Episode, EpisodeFilters } from '../../../core/models/episode.model';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/episodes`;

  getEpisodes(filters: EpisodeFilters): Observable<PaginatedResponse<Episode>> {
    const params = this.buildQueryParams(filters);
    return this.http.get<PaginatedResponse<Episode>>(this.apiUrl, { params });
  }

  private buildQueryParams(filters: EpisodeFilters): HttpParams {
    let params = new HttpParams().set('page', filters.page);

    if (filters.name.trim()) {
      params = params.set('name', filters.name.trim());
    }

    if (filters.episode.trim()) {
      params = params.set('episode', filters.episode.trim());
    }

    return params;
  }
}
