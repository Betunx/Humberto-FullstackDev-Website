import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>('es');

  toggle(): void {
    this.lang.update(l => (l === 'es' ? 'en' : 'es'));
  }
}
