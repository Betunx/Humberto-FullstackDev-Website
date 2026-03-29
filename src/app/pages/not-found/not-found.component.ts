import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

const T = {
  es: {
    code: '404',
    label: 'RUTA_NO_ENCONTRADA',
    msg: 'La página que buscas no existe o fue movida.',
    home: 'VOLVER AL INICIO',
    cv: 'VER CV',
  },
  en: {
    code: '404',
    label: 'ROUTE_NOT_FOUND',
    msg: 'The page you are looking for does not exist or has been moved.',
    home: 'BACK TO HOME',
    cv: 'VIEW CV',
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-not-found',
  standalone: true,
  template: `
    <section
      class="min-h-screen flex flex-col items-center justify-center px-6"
      style="background-color:#0a0a0a;"
    >
      <!-- Ambient glow -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background:radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,255,65,0.04) 0%, transparent 70%);"
      ></div>

      <div class="relative z-10 text-center max-w-lg">

        <!-- 404 number -->
        <div
          class="text-8xl sm:text-9xl font-black mb-2 leading-none"
          style="
            font-family:'Orbitron',sans-serif;
            color:#00ff41;
            text-shadow: 0 0 40px rgba(0,255,65,0.4), 0 0 80px rgba(0,255,65,0.15);
          "
        >{{ t().code }}</div>

        <!-- Label -->
        <p
          class="text-xs tracking-widest mb-6"
          style="font-family:'JetBrains Mono',monospace; color:#00e5ff;"
        >// {{ t().label }}</p>

        <!-- Message -->
        <p
          class="text-sm leading-relaxed mb-10"
          style="font-family:'JetBrains Mono',monospace; color:#8b949e;"
        >{{ t().msg }}</p>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            (click)="goHome()"
            class="px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 rounded"
            style="
              font-family:'Orbitron',sans-serif;
              background-color:#00ff41;
              color:#0a0a0a;
              border:2px solid #00ff41;
              box-shadow:0 0 20px rgba(0,255,65,0.3);
            "
            onmouseenter="this.style.boxShadow='0 0 35px rgba(0,255,65,0.6)'"
            onmouseleave="this.style.boxShadow='0 0 20px rgba(0,255,65,0.3)'"
          >{{ t().home }}</button>

          <button
            (click)="goCV()"
            class="px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 rounded"
            style="
              font-family:'Orbitron',sans-serif;
              color:#00ff41;
              border:2px solid rgba(0,255,65,0.4);
              background:transparent;
            "
            onmouseenter="this.style.backgroundColor='rgba(0,255,65,0.08)'; this.style.borderColor='#00ff41'"
            onmouseleave="this.style.backgroundColor='transparent'; this.style.borderColor='rgba(0,255,65,0.4)'"
          >{{ t().cv }}</button>
        </div>

      </div>
    </section>
  `,
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);

  goHome(): void { this.router.navigate(['/']); }
  goCV(): void   { this.router.navigate(['/cv']); }
}
