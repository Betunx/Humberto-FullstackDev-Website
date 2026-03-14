import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '@core/services/language.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="py-8 px-6" style="border-top:1px solid rgba(0,255,65,0.1); background-color:#0a0a0a;">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Left: branding -->
        <div class="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"/>
            <line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
          <span class="text-xs" style="font-family:'JetBrains Mono',monospace; color:#8b949e;">
            {{ t().designed }}
            <span style="color:#00ff41;">Humberto López</span>
          </span>
        </div>
        <!-- Right: copyright -->
        <span class="text-xs" style="font-family:'JetBrains Mono',monospace; color:#8b949e;">
          &copy; {{ currentYear }} // {{ t().rights }}
        </span>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => ({
    designed: this.langSvc.lang() === 'es' ? 'Diseñado & Desarrollado por' : 'Designed & Developed by',
    rights: this.langSvc.lang() === 'es' ? 'Todos los derechos reservados' : 'All rights reserved',
  }));
  readonly currentYear = new Date().getFullYear();
}
