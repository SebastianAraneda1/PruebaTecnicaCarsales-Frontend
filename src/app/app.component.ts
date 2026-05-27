import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  readonly currentTheme = this.themeService.currentTheme;

  readonly themeLabel = computed(() =>
    this.currentTheme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  );

  readonly themeIcon = computed(() =>
    this.currentTheme() === 'dark' ? '☀️' : '🌙'
  );

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}