import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="about" class="py-32 px-6" style="background-color: #0a0a0a;">
      <div class="max-w-6xl mx-auto">

        <!-- Section header -->
        <div
          appInView
          [inViewThreshold]="0.1"
          class="fade-up mb-16"
        >
          <p
            class="text-sm tracking-widest mb-3"
            style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
          >01. // SOBRE_MÍ</p>
          <h2
            class="text-3xl sm:text-4xl font-bold"
            style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
          >¿Quién soy?</h2>
          <div class="mt-4 h-px w-24" style="background: linear-gradient(90deg, #00ff41, transparent);"></div>
        </div>

        <!-- Two-column grid -->
        <div class="grid lg:grid-cols-2 gap-12 items-start">

          <!-- LEFT: Terminal card -->
          <div
            appInView
            [inViewThreshold]="0.15"
            [inViewDelay]="100"
            class="fade-left"
          >
            <div
              class="rounded-lg overflow-hidden border"
              style="background-color: #0d1117; border-color: rgba(0,255,65,0.15);"
            >
              <!-- Terminal header bar -->
              <div
                class="flex items-center gap-2 px-4 py-3 border-b"
                style="background-color: #161b22; border-color: rgba(0,255,65,0.1);"
              >
                <span class="w-3 h-3 rounded-full" style="background-color: #ff5f57;"></span>
                <span class="w-3 h-3 rounded-full" style="background-color: #ffbd2e;"></span>
                <span class="w-3 h-3 rounded-full" style="background-color: #28c840;"></span>
                <span
                  class="ml-3 text-xs"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >~/about/humberto.md</span>
              </div>

              <!-- Terminal body -->
              <div class="p-6 space-y-5">
                <p style="font-family: 'JetBrains Mono', monospace; color: #c9d1d9; line-height: 1.8; font-size: 0.875rem;">
                  <span style="color: #00ff41;">&gt; </span>
                  Soy un desarrollador Full Stack con pasión por construir productos digitales
                  robustos y elegantes. Me especializo en el ecosistema JavaScript/TypeScript,
                  combinando frontend moderno con backends eficientes.
                </p>
                <p style="font-family: 'JetBrains Mono', monospace; color: #c9d1d9; line-height: 1.8; font-size: 0.875rem;">
                  <span style="color: #00e5ff;">&gt; </span>
                  Disfruto resolver problemas complejos con soluciones simples. Creo firmemente
                  en el código limpio, la arquitectura bien pensada y la experiencia de usuario
                  como pilares de cualquier proyecto exitoso.
                </p>
                <p style="font-family: 'JetBrains Mono', monospace; color: #c9d1d9; line-height: 1.8; font-size: 0.875rem;">
                  <span style="color: #00ff41;">&gt; </span>
                  Siempre en aprendizaje continuo, explorando nuevas tecnologías y patrones
                  para entregar soluciones que marquen la diferencia. Listo para el siguiente
                  desafío.
                </p>
                <!-- Animated cursor -->
                <span
                  class="inline-block w-2 h-4 align-middle"
                  style="background-color: #00ff41; animation: blink-cursor 1s step-end infinite;"
                ></span>
              </div>
            </div>
          </div>

          <!-- RIGHT: 2x2 highlight cards -->
          <div
            appInView
            [inViewThreshold]="0.15"
            [inViewDelay]="200"
            class="fade-right"
          >
            <div class="grid grid-cols-2 gap-4">

              <!-- Frontend -->
              <div
                class="p-5 rounded-lg border transition-all duration-300 group"
                style="background-color: #0d1117; border-color: rgba(0,255,65,0.1);"
                onmouseenter="this.style.borderColor='rgba(0,255,65,0.4)'; this.style.boxShadow='0 0 20px rgba(0,255,65,0.08)'"
                onmouseleave="this.style.borderColor='rgba(0,255,65,0.1)'; this.style.boxShadow='none'"
              >
                <!-- Code icon -->
                <div class="mb-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <h3
                  class="font-bold mb-1 text-sm"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >Frontend</h3>
                <p
                  class="text-xs leading-relaxed"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >Angular, React, TypeScript</p>
              </div>

              <!-- Backend -->
              <div
                class="p-5 rounded-lg border transition-all duration-300"
                style="background-color: #0d1117; border-color: rgba(0,229,255,0.1);"
                onmouseenter="this.style.borderColor='rgba(0,229,255,0.4)'; this.style.boxShadow='0 0 20px rgba(0,229,255,0.08)'"
                onmouseleave="this.style.borderColor='rgba(0,229,255,0.1)'; this.style.boxShadow='none'"
              >
                <!-- Server icon -->
                <div class="mb-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                  </svg>
                </div>
                <h3
                  class="font-bold mb-1 text-sm"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >Backend</h3>
                <p
                  class="text-xs leading-relaxed"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >Node.js, NestJS, Express</p>
              </div>

              <!-- Bases de Datos -->
              <div
                class="p-5 rounded-lg border transition-all duration-300"
                style="background-color: #0d1117; border-color: rgba(168,85,247,0.1);"
                onmouseenter="this.style.borderColor='rgba(168,85,247,0.4)'; this.style.boxShadow='0 0 20px rgba(168,85,247,0.08)'"
                onmouseleave="this.style.borderColor='rgba(168,85,247,0.1)'; this.style.boxShadow='none'"
              >
                <!-- Database icon -->
                <div class="mb-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                </div>
                <h3
                  class="font-bold mb-1 text-sm"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >Bases de Datos</h3>
                <p
                  class="text-xs leading-relaxed"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >PostgreSQL, MongoDB, Redis</p>
              </div>

              <!-- Cloud & DevOps -->
              <div
                class="p-5 rounded-lg border transition-all duration-300"
                style="background-color: #0d1117; border-color: rgba(245,158,11,0.1);"
                onmouseenter="this.style.borderColor='rgba(245,158,11,0.4)'; this.style.boxShadow='0 0 20px rgba(245,158,11,0.08)'"
                onmouseleave="this.style.borderColor='rgba(245,158,11,0.1)'; this.style.boxShadow='none'"
              >
                <!-- Cloud icon -->
                <div class="mb-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
                  </svg>
                </div>
                <h3
                  class="font-bold mb-1 text-sm"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >Cloud & DevOps</h3>
                <p
                  class="text-xs leading-relaxed"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >AWS, Docker, CI/CD</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes blink-cursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `]
})
export class AboutComponent {}
