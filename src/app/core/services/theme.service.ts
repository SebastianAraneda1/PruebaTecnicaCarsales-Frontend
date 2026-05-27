import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'rick-morty-theme';

  readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.currentTheme());
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode =
      this.currentTheme() === 'dark' ? 'light' : 'dark';

    this.currentTheme.set(nextTheme);
    this.applyTheme(nextTheme);
    localStorage.setItem(this.storageKey, nextTheme);
  }

  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
