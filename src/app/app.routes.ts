import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'episodes',
    pathMatch: 'full',
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./features/episodes/pages/episode-list/episode-list.component').then(
        (component) => component.EpisodeListComponent,
      ),
    title: 'Episodios',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/characters/pages/character-list/character-list.component').then(
        (component) => component.CharacterListComponent,
      ),
    title: 'Personajes',
  },
  {
    path: '**',
    redirectTo: 'episodes',
  },
];
