import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-experience',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="experience" class="py-32 px-6" style="background-color: #0a0a0a;">
      <div class="max-w-4xl mx-auto">

        <!-- Header -->
        <div
          appInView
          [inViewThreshold]="0.1"
          class="fade-up mb-16"
        >
          <p
            class="text-sm tracking-widest mb-3"
            style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
          >03. // EXPERIENCIA</p>
          <h2
            class="text-3xl sm:text-4xl font-bold"
            style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
          >Trayectoria Profesional</h2>
          <div class="mt-4 h-px w-24" style="background: linear-gradient(90deg, #00ff41, transparent);"></div>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div
            class="absolute left-4 top-0 bottom-0 w-px hidden sm:block"
            style="background: linear-gradient(to bottom, #00ff41, rgba(0,255,65,0.1));"
          ></div>

          <div class="space-y-10">
            @for (exp of experiences; track exp.role; let i = $index) {
              <div
                appInView
                [inViewThreshold]="0.15"
                [inViewDelay]="i * 120"
                class="fade-up relative sm:pl-14"
              >
                <!-- Timeline dot -->
                <div
                  class="absolute left-2 top-6 w-5 h-5 rounded-full border-2 items-center justify-center hidden sm:flex"
                  style="background-color: #0a0a0a; border-color: #00ff41; box-shadow: 0 0 10px rgba(0,255,65,0.5);"
                >
                  <div class="w-2 h-2 rounded-full" style="background-color: #00ff41;"></div>
                </div>

                <!-- Card -->
                <div
                  class="p-6 rounded-lg border transition-all duration-300"
                  style="background-color: #0d1117; border-color: rgba(0,255,65,0.1);"
                  onmouseenter="this.style.borderColor='rgba(0,255,65,0.3)'; this.style.boxShadow='0 0 24px rgba(0,255,65,0.06)'"
                  onmouseleave="this.style.borderColor='rgba(0,255,65,0.1)'; this.style.boxShadow='none'"
                >
                  <!-- Role -->
                  <h3
                    class="text-lg font-bold mb-3"
                    style="font-family: 'Orbitron', sans-serif; color: #00ff41;"
                  >{{ exp.role }}</h3>

                  <!-- Company & date row -->
                  <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center gap-2">
                      <!-- Briefcase icon -->
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                      </svg>
                      <span
                        class="text-sm"
                        style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                      >{{ exp.company }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <!-- Calendar icon -->
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span
                        class="text-sm"
                        style="font-family: 'JetBrains Mono', monospace; color: #00e5ff;"
                      >{{ exp.period }}</span>
                    </div>
                  </div>

                  <!-- Description -->
                  <p
                    class="text-sm leading-relaxed mb-5"
                    style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                  >{{ exp.description }}</p>

                  <!-- Tech tags -->
                  <div class="flex flex-wrap gap-2">
                    @for (tag of exp.tech; track tag) {
                      <span
                        class="px-2 py-1 text-xs rounded"
                        style="
                          font-family: 'JetBrains Mono', monospace;
                          background-color: rgba(0,255,65,0.07);
                          color: #00ff41;
                          border: 1px solid rgba(0,255,65,0.2);
                        "
                      >{{ tag }}</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class ExperienceComponent {
  readonly experiences: Experience[] = [
    {
      role: 'Full Stack Developer',
      company: 'Hirably',
      period: '2025 - Presente',
      description:
        'Construcción completa de la landing page corporativa con Angular y Tailwind CSS. Integración de chatbot HubSpot con Claude AI para interacciones automatizadas con clientes. Configuración de scaffolding, arquitectura de routing y pipelines de build. Despliegue y mantenimiento del entorno de producción en Vercel.',
      tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'HubSpot', 'Claude AI', 'Vercel'],
    },
    {
      role: 'Web Developer',
      company: 'Icatson — Gobierno del Estado de Sonora',
      period: '2023 - 2024',
      description:
        'Mantenimiento y optimización del sitio web oficial del gobierno, mejorando el rendimiento para miles de usuarios. Desarrollo de módulos front-end con Joomla, HTML, CSS y JavaScript. Propuesta e integración de mejoras UX, creando nuevas rutas y páginas. Optimización del codebase eliminando boilerplate y mejorando uso de memoria.',
      tech: ['JavaScript', 'Joomla', 'HTML/CSS', 'Git', 'Trello'],
    },
    {
      role: 'CNC Engineer',
      company: 'Martinrea Automotive Structures',
      period: '2021 - 2022',
      description:
        'Operación y optimización de maquinaria CNC en líneas de producción automatizadas. Mantenimiento y troubleshooting, fortaleciendo habilidades de resolución de problemas y trabajo en equipo.',
      tech: ['Automatización', 'CNC', 'Manufactura', 'Problem Solving'],
    },
  ];
}
