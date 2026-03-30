import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

const T = {
  es: {
    label: '03. // EXPERIENCIA',
    heading: 'Trayectoria Profesional',
    experiences: [
      {
        role: 'Full Stack Developer',
        company: 'Hirably',
        period: 'Sep 2025 - Presente',
        description: 'Angular 17 & Rendimiento: Arquitectura con Angular 17 implementando Control Flow y OnPush para maximizar la velocidad de renderizado. Booking & Serverless: Motor de reservas con la API de Cal.com y Vercel Serverless, eliminando el uso de iframes. Seguridad & IA: Configuración de hardening (CSP, HSTS) e integración de chatbot con Claude AI para automatizar el screening de candidatos. Growth: SEO dinámico y analítica avanzada con GA4/GTM para conversiones.',
        tech: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Cal.com', 'Claude AI', 'Vercel', 'GA4/GTM'],
      },
      {
        role: 'Full Stack Developer & Fundador',
        company: 'BSTabs — Proyecto Personal',
        period: '2025 - Presente',
        description: 'Diseñé y desarrollé desde cero una plataforma de tablaturas musicales (bstabs.com) con Angular 18 y NestJS. Implementé búsqueda full-text con Elasticsearch, sistema de autenticación, caché con Redis y base de datos en PostgreSQL. Desplegué la infraestructura con Docker y Cloudflare Workers/Pages, con pipeline de CI/CD automatizado vía GitHub Actions. La app incluye PWA y 4 modos de tema.',
        tech: ['Angular 18', 'NestJS', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Docker', 'Cloudflare', 'GitHub Actions'],
      },
      {
        role: 'Web Developer',
        company: 'Icatson — Gobierno del Estado de Sonora',
        period: '2023 - 2024',
        description: 'Liderazgo técnico en mantenimiento, mejora y optimización del sitio web oficial (icatson.sonora.gob.mx) y herramientas institucionales internas. Desarrollo Full Stack de nuevos módulos web y actualización de contenidos a través de Joomla!, gestionando frontend y backend del CMS. Optimización de rendimiento frontend, resolviendo problemas críticos de gestión de memoria en módulos JavaScript y mejorando tiempos de carga. Coordinación con equipos internos usando Jira y GitHub para control de versiones y despliegues.',
        tech: ['JavaScript', 'Joomla', 'HTML/CSS', 'Git', 'Jira'],
      },
      {
        role: 'Full Stack Developer',
        company: 'Freelance',
        period: '2021 - Presente',
        description: 'Desarrollo de sitios web personalizados para clientes usando React, Vue.js, Angular, Node.js y TypeScript. Configuración de Webpack y Babel para compatibilidad cross-browser. Diseños responsive mobile-first con Tailwind CSS, SCSS y Bootstrap.',
        tech: ['React', 'Vue.js', 'Angular', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      },
      {
        role: 'CNC Engineer',
        company: 'Martinrea Automotive Structures',
        period: '2021 - 2022',
        description: 'Operación y optimización de maquinaria CNC en líneas de producción automatizadas de la industria automotriz, aplicando principios de ingeniería mecatrónica en diagnóstico de fallas, mantenimiento preventivo y mejora continua de procesos de manufactura.',
        tech: ['Automatización', 'CNC', 'Manufactura', 'Mantenimiento Preventivo'],
      },
    ] as Experience[],
  },
  en: {
    label: '03. // EXPERIENCE',
    heading: 'Professional Experience',
    experiences: [
      {
        role: 'Full Stack Developer',
        company: 'Hirably',
        period: 'Sep 2025 - Present',
        description: 'Angular 17 & Performance: Led architecture with Angular 17, implementing Control Flow and OnPush to maximize rendering speed. Custom Booking & Serverless: Developed a booking engine using the Cal.com API and Vercel Serverless, eliminating the use of iframes. Security & AI: Configured security hardening (CSP, HSTS) and integrated a chatbot with Claude AI to automate candidate screening. Growth: Optimized dynamic SEO and advanced analytics with GA4/GTM for conversion tracking.',
        tech: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Cal.com', 'Claude AI', 'Vercel', 'GA4/GTM'],
      },
      {
        role: 'Full Stack Developer & Founder',
        company: 'BSTabs — Personal Project',
        period: '2025 - Present',
        description: 'Designed and built from scratch a music tablature platform (bstabs.com) with Angular 18 and NestJS. Implemented full-text search with Elasticsearch, authentication system, Redis cache and PostgreSQL database. Deployed infrastructure with Docker and Cloudflare Workers/Pages, with automated CI/CD pipeline via GitHub Actions. The app includes PWA support and 4 theme modes.',
        tech: ['Angular 18', 'NestJS', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Docker', 'Cloudflare', 'GitHub Actions'],
      },
      {
        role: 'Web Developer',
        company: 'Icatson — Government of Sonora',
        period: '2023 - 2024',
        description: 'Technical leadership in the maintenance, improvement, and optimization of the official government website (icatson.sonora.gob.mx) and internal institutional tools. Full Stack development of new web modules and content updates through Joomla!, managing both frontend and backend of the CMS. Frontend performance optimization, resolving critical memory management issues in JavaScript modules and improving load times. Coordination with internal teams using Jira and GitHub for version control, task tracking, and deployment of updates.',
        tech: ['JavaScript', 'Joomla', 'HTML/CSS', 'Git', 'Jira', 'Trello'],
      },
      {
        role: 'Full Stack Developer',
        company: 'Freelance',
        period: '2021 - Present',
        description: 'Custom websites for clients using React, Vue.js, Angular, Node.js and TypeScript deployed to Vercel. Configured Webpack and Babel for cross-browser compatibility and production bundling. Responsive mobile-first designs with Tailwind CSS, SCSS and Bootstrap.',
        tech: ['React', 'Vue.js', 'Angular', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      },
      {
        role: 'CNC Engineer',
        company: 'Martinrea Automotive Structures',
        period: '2021 - 2022',
        description: 'Operation and optimization of CNC machinery on automated production lines for the automotive industry, applying mechatronics engineering principles in fault diagnosis, preventive maintenance, and continuous improvement of manufacturing processes.',
        tech: ['Automation', 'CNC', 'Manufacturing', 'Preventive Maintenance'],
      },
    ] as Experience[],
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-experience',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="experience" class="py-32 px-6" style="background-color:#0a0a0a; position:relative; z-index:1;">
      <div class="max-w-4xl mx-auto">

        <!-- Header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-16">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">03.</span> {{ t().label.substring(2) }}
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">
            {{ t().heading }}
          </h2>
          <div class="mt-4 h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical line -->
          <div
            class="absolute left-4 top-0 bottom-0 w-px hidden sm:block"
            style="background:linear-gradient(to bottom, #00ff41, rgba(0,255,65,0.1));"
          ></div>

          <div class="space-y-10">
            @for (exp of t().experiences; track exp.company; let i = $index) {
              <div appInView [inViewThreshold]="0.15" [inViewDelay]="i * 120" class="fade-up relative sm:pl-14">
                <!-- Timeline dot -->
                <div
                  class="absolute left-2 top-6 w-5 h-5 rounded-full border-2 items-center justify-center hidden sm:flex"
                  style="background-color:#0a0a0a; border-color:#00ff41; box-shadow:0 0 10px rgba(0,255,65,0.5);"
                >
                  <div class="w-2 h-2 rounded-full" style="background-color:#00ff41;"></div>
                </div>

                <!-- Card -->
                <div
                  class="p-6 rounded-lg border transition-all duration-300"
                  style="background-color:#0d1117; border-color:rgba(0,255,65,0.1);"
                  onmouseenter="this.style.borderColor='rgba(0,255,65,0.3)'; this.style.boxShadow='0 0 24px rgba(0,255,65,0.06)'"
                  onmouseleave="this.style.borderColor='rgba(0,255,65,0.1)'; this.style.boxShadow='none'"
                >
                  <!-- Role -->
                  <h3 class="text-lg font-bold mb-3" style="font-family:'Orbitron',sans-serif; color:#00ff41;">{{ exp.role }}</h3>

                  <!-- Company & date row -->
                  <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                      </svg>
                      <span class="text-sm" style="font-family:'JetBrains Mono',monospace; color:#c9d1d9;">{{ exp.company }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span class="text-sm" style="font-family:'JetBrains Mono',monospace; color:#00e5ff;">{{ exp.period }}</span>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-sm leading-relaxed mb-5 text-justify" style="font-family:'JetBrains Mono',monospace; color:#8b949e;">{{ exp.description }}</p>

                  <!-- Tech tags -->
                  <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
                    <span style="opacity:0.5;">{{ '{' }}</span>
                    @for (tag of exp.tech; track tag; let last = $last) {
                      <span>{{ tag }}</span>
                      @if (!last) {
                        <span style="opacity:0.35;">·</span>
                      }
                    }
                    <span style="opacity:0.5;">{{ '}' }}</span>
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
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);
}
