import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  status: 'active' | 'completed';
  statusLabel: string;
  featured?: boolean;
}

const T = {
  es: {
    label: '04. // PROYECTOS',
    heading: 'Lo que he construido',
    subtitle: 'Proyectos reales en los que trabajo activamente y otros ya entregados en producción.',
    active: 'PROYECTOS ACTIVOS',
    completed: 'COMPLETADOS & ENTREGADOS',
    visitSite: 'Visitar sitio',
    featured: 'Proyecto Destacado',
  },
  en: {
    label: '04. // PROJECTS',
    heading: "What I've Built",
    subtitle: 'Real projects I actively work on and others already delivered to production.',
    active: 'ACTIVE PROJECTS',
    completed: 'COMPLETED & DELIVERED',
    visitSite: 'Visit site',
    featured: 'Featured Project',
  },
};

const ACTIVE_PROJECTS: Project[] = [
  {
    title: 'BS Tabs',
    description: 'Plataforma web de tablaturas musicales con Angular 18, NestJS, PostgreSQL y Redis. Búsqueda con Elasticsearch, 4 modos de tema, PWA y CI/CD con GitHub Actions. Desplegado en Cloudflare Pages con Workers serverless.',
    tech: ['Angular 18', 'NestJS', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Docker', 'Cloudflare'],
    liveUrl: 'https://www.bstabs.com/',
    image: 'https://images.unsplash.com/photo-1602821485286-4a6520cca299?w=800&q=70',
    status: 'active',
    statusLabel: 'En desarrollo activo',
    featured: true,
  },
  {
    title: 'Hirably — Landing Page',
    description: 'Lideré la arquitectura frontend con Angular 17, aplicando Control Flow y OnPush para optimizar el renderizado. Desarrollé un motor de reservas custom integrando la API de Cal.com con funciones serverless de Vercel, reemplazando iframes. Implementé hardening de seguridad (CSP, HSTS) y un chatbot con Claude AI para automatizar el screening inicial de candidatos. Configuré SEO dinámico con meta tags OG y analítica de conversiones con GA4/GTM.',
    tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'Cal.com', 'Claude AI', 'Vercel', 'GA4', 'GTM'],
    image: '/hirably-preview.jpg',
    liveUrl: 'https://hirablystaffing.com/',
    status: 'active',
    statusLabel: 'Producción',
  },
  {
    title: 'Portfolio Personal',
    description: 'Diseñé y desarrollé este portfolio desde cero con Angular y Tailwind CSS bajo una estética Matrix/Tron. Implementé animaciones de entrada con Intersection Observer, lluvia de código generativa en canvas y sistema de internacionalización EN/ES sin librerías externas. Arquitectura con componentes standalone, OnPush y signals. SEO completo con meta tags Open Graph, sitemap y robots.txt. CV descargable en dos idiomas y despliegue continuo en Vercel.',
    tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://humberto-fullstack-dev-website.vercel.app',
    githubUrl: 'https://github.com/Betunx',
    image: '/hldev-preview.jpg',
    status: 'active',
    statusLabel: 'En mantenimiento',
  },
];

const ACTIVE_PROJECTS_EN: Project[] = [
  {
    ...ACTIVE_PROJECTS[0],
    description: 'Music tablature web platform with Angular 18, NestJS, PostgreSQL and Redis. Elasticsearch search, 4 theme modes, PWA and CI/CD with GitHub Actions. Deployed on Cloudflare Pages with serverless Workers.',
    statusLabel: 'Actively developing',
  },
  {
    ...ACTIVE_PROJECTS[1],
    description: 'Led frontend architecture with Angular 17, applying Control Flow and OnPush strategy to optimize rendering. Built a custom booking engine integrating the Cal.com API with Vercel serverless functions, replacing iframes. Implemented security hardening (CSP, HSTS) and a Claude AI chatbot to automate initial candidate screening. Configured dynamic SEO with OG meta tags and conversion analytics with GA4/GTM.',
    statusLabel: 'Production',
  },
  {
    ...ACTIVE_PROJECTS[2],
    description: 'Designed and built this portfolio from scratch with Angular and Tailwind CSS under a Matrix/Tron aesthetic. Implemented scroll-triggered animations with Intersection Observer, generative code rain on canvas and an EN/ES internationalization system without external libraries. Architecture with standalone components, OnPush and signals. Full SEO with Open Graph meta tags, sitemap and robots.txt. Downloadable CV in two languages and continuous deployment on Vercel.',
    statusLabel: 'Maintained',
  },
];

const COMPLETED_PROJECTS: Project[] = [
  {
    title: 'GeriaCare',
    description: 'Plataforma de gestión de salud geriátrica — proyecto capstone del Máster en Full-Stack. Sistema de monitoreo de pacientes, historiales clínicos y dashboard para personal médico.',
    tech: ['Angular', 'TypeScript', 'Node.js', 'Docker', 'Jest', 'MongoDB'],
    status: 'completed',
    statusLabel: 'Proyecto académico',
  },
  {
    title: 'Icatson — Sitio Oficial',
    description: 'Mantenimiento y optimización del sitio web oficial del gobierno del estado de Sonora. Mejoras de UX, nuevas rutas y optimización de rendimiento.',
    tech: ['JavaScript', 'Joomla', 'HTML/CSS', 'Git'],
    status: 'completed',
    statusLabel: 'Entregado',
  },
];

const COMPLETED_PROJECTS_EN: Project[] = [
  {
    ...COMPLETED_PROJECTS[0],
    description: "Geriatric healthcare management platform — Master's capstone project. Patient monitoring, clinical records and dashboard for medical staff.",
    statusLabel: 'Academic project',
  },
  {
    ...COMPLETED_PROJECTS[1],
    description: "Maintenance and optimization of Sonora's official government website. UX improvements, new routes and performance optimization.",
    statusLabel: 'Delivered',
  },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects',
  standalone: true,
  imports: [InViewDirective, NgTemplateOutlet],
  template: `
    <section id="projects" class="py-32 px-6" style="background-color:#0a0a0a; position:relative; z-index:1;">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-4">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">04.</span> {{ t().label.substring(2) }}
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold mb-4" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().heading }}</h2>
          <p class="text-sm mb-16" style="font-family:'JetBrains Mono',monospace; color:#8b949e; line-height:1.7; max-width:36rem;">{{ t().subtitle }}</p>
          <div class="h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <!-- ── ACTIVE header ── -->
        <div appInView [inViewThreshold]="0.1" class="fade-up flex items-center gap-3 mb-8 mt-10">
          <div class="relative flex items-center justify-center w-3 h-3">
            <span class="absolute w-full h-full rounded-full" style="background-color:#00ff41; opacity:0.4; animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>
            <span class="relative w-2 h-2 rounded-full" style="background-color:#00ff41; box-shadow:0 0 8px #00ff41;"></span>
          </div>
          <h3 class="font-bold tracking-widest text-base" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().active }}</h3>
        </div>

        <!-- ═══ MOBILE / TABLET: carousel 3D (oculto en lg+) ═══ -->
        <div class="lg:hidden mb-10 relative select-none"
             (touchstart)="onTouchStart($event)"
             (touchmove)="onTouchMove($event)"
             (touchend)="onTouchEnd($event)">

          <!-- Stage 3D -->
          <div style="position:relative; perspective:1200px; overflow:hidden;">
            @for (project of activeProjects; track project.title; let i = $index) {
              <div
                style="position:absolute; left:0; top:0; width:100%; height:100%;
                       transition:transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease;"
                [style.transform]="getCarouselTransform(i)"
                [style.opacity]="getCarouselOpacity(i)"
                [style.zIndex]="getCarouselZIndex(i)"
                (click)="activeSlide() !== i ? (i < activeSlide() ? carouselPrev() : carouselNext()) : null"
              >
                <ng-container *ngTemplateOutlet="projectCard; context: { project: project }"></ng-container>
              </div>
            }
            <!-- spacer para que el stage tome la altura del card activo -->
            <div style="visibility:hidden; pointer-events:none;">
              <ng-container *ngTemplateOutlet="projectCard; context: { project: activeProjects[activeSlide()] }"></ng-container>
            </div>
          </div>

          <!-- Flechas -->
          <button (click)="carouselPrev()"
                  class="absolute left-0 z-20 flex items-center justify-center w-8 h-8 transition-opacity duration-200"
                  style="top:240px; color:#00ff41; opacity:0.65; background:none; border:none; cursor:pointer;"
                  onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='0.65'">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button (click)="carouselNext()"
                  class="absolute right-0 z-20 flex items-center justify-center w-8 h-8 transition-opacity duration-200"
                  style="top:240px; color:#00ff41; opacity:0.65; background:none; border:none; cursor:pointer;"
                  onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='0.65'">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>

          <!-- Dots -->
          <div class="flex justify-center items-center gap-2 mt-2">
            @for (project of activeProjects; track project.title; let i = $index) {
              <button
                (click)="activeSlide.set(i)"
                style="border:none; cursor:pointer; padding:0; transition:all 0.3s ease;"
                [style.width]="activeSlide() === i ? '20px' : '6px'"
                [style.height]="'6px'"
                [style.borderRadius]="'3px'"
                [style.background]="activeSlide() === i ? '#00ff41' : 'rgba(0,255,65,0.25)'"
                [style.boxShadow]="activeSlide() === i ? '0 0 6px rgba(0,255,65,0.6)' : 'none'"
              ></button>
            }
          </div>
        </div>

        <!-- ═══ DESKTOP: layout existente (oculto bajo lg) ═══ -->
        <div class="hidden lg:block">

          <!-- Featured: BS Tabs -->
          <div appInView [inViewThreshold]="0.1" [inViewDelay]="100" class="fade-up mb-8">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
              <a
                href="https://www.bstabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="relative group overflow-hidden rounded-lg border transition-all duration-500 block"
                style="border-color:rgba(0,255,65,0.2);"
                onmouseenter="this.style.borderColor='rgba(0,255,65,0.5)'"
                onmouseleave="this.style.borderColor='rgba(0,255,65,0.2)'"
              >
                <div class="relative overflow-hidden" style="aspect-ratio:16/9; background-color:#0d1117; min-height:200px;">
                  <img src="https://images.unsplash.com/photo-1602821485286-4a6520cca299?w=800&q=70" alt="BS Tabs"
                       class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" style="opacity:0.5;" />
                  <div class="absolute inset-0" style="background:linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 50%, transparent 100%);"></div>
                  <div class="absolute inset-0" style="background-color:#00ff41; mix-blend-mode:color; opacity:0.3;"></div>
                  <div class="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border" style="background-color:rgba(10,10,10,0.8); border-color:rgba(0,255,65,0.3);">
                    <span class="relative flex" style="width:8px;height:8px;">
                      <span class="absolute w-full h-full rounded-full" style="background-color:#00ff41; opacity:0.75; animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>
                      <span class="relative w-full h-full rounded-full" style="background-color:#00ff41;"></span>
                    </span>
                    <span style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#00ff41; letter-spacing:0.1em;">EN DESARROLLO</span>
                  </div>
                </div>
              </a>
              <div>
                <div class="flex items-center gap-3 mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 8px rgba(0,255,65,0.5));">
                    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                  </svg>
                  <p style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#00e5ff;">{{ t().featured }} &bull; {{ activeProjects[0].statusLabel }}</p>
                </div>
                <h3 class="text-2xl font-bold mb-4" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">BS Tabs</h3>
                <div class="p-5 rounded-lg border mb-5" style="background-color:#0d1117; border-color:rgba(0,255,65,0.1);">
                  <p class="text-justify" style="font-family:'JetBrains Mono',monospace; font-size:0.82rem; color:#c9d1d9; line-height:1.8;">{{ activeProjects[0].description }}</p>
                </div>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mb-5" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
                  <span style="opacity:0.5;">{{ '{' }}</span>
                  @for (tag of activeProjects[0].tech; track tag; let last = $last) {
                    <span>{{ tag }}</span>
                    @if (!last) { <span style="opacity:0.35;">·</span> }
                  }
                  <span style="opacity:0.5;">{{ '}' }}</span>
                </div>
                <a href="https://www.bstabs.com/" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 transition-colors duration-200"
                   style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#00ff41;"
                   onmouseenter="this.style.color='#c9d1d9'" onmouseleave="this.style.color='#00ff41'">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  {{ t().visitSite }}
                </a>
              </div>
            </div>
          </div>

          <!-- Hirably + Portfolio -->
          <div class="grid md:grid-cols-2 gap-4 mb-10">
            @for (project of activeProjects.slice(1); track project.title; let i = $index) {
              <div appInView [inViewThreshold]="0.1" [inViewDelay]="i * 80" class="fade-up">
                <ng-container *ngTemplateOutlet="projectCard; context: { project: project }"></ng-container>
              </div>
            }
          </div>

        </div>

        <!-- Row 2: completed label -->
        <div appInView [inViewThreshold]="0.1" class="fade-up flex items-center gap-3 mb-5">
          <div class="w-2.5 h-2.5 rounded-full" style="background-color:#00e5ff; box-shadow:0 0 8px #00e5ff;"></div>
          <h3 class="font-bold tracking-widest text-sm" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().completed }}</h3>
        </div>

        <!-- Row 2: GeriaCare + Icatson -->
        <div class="grid md:grid-cols-2 gap-4">
          @for (project of completedProjects; track project.title; let i = $index) {
            <div appInView [inViewThreshold]="0.1" [inViewDelay]="i * 80" class="fade-up">
              <ng-container *ngTemplateOutlet="projectCard; context: { project: project }"></ng-container>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- Reusable card template -->
    <ng-template #projectCard let-project="project">
      <div
        class="p-6 rounded-lg border h-full flex flex-col transition-all duration-300"
        [style.borderColor]="project.status === 'active' ? 'rgba(0,255,65,0.15)' : 'rgba(0,229,255,0.15)'"
        (mouseenter)="onCardEnter($event, project.status)"
        (mouseleave)="onCardLeave($event, project.status)"
        style="background-color:#0d1117;"
      >
        <div class="flex items-center justify-between mb-4">
          <span
            class="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs"
            [style.color]="project.status === 'active' ? '#00ff41' : '#00e5ff'"
            [style.borderColor]="project.status === 'active' ? 'rgba(0,255,65,0.3)' : 'rgba(0,229,255,0.3)'"
            [style.backgroundColor]="project.status === 'active' ? 'rgba(0,255,65,0.08)' : 'rgba(0,229,255,0.08)'"
            style="font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.05em;"
          >
            @if (project.status === 'active') {
              <span class="relative flex" style="width:6px;height:6px;">
                <span class="absolute w-full h-full rounded-full" style="background-color:#00ff41; opacity:0.75; animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></span>
                <span class="relative w-full h-full rounded-full" style="background-color:#00ff41;"></span>
              </span>
            }
            {{ project.statusLabel }}
          </span>
          <div class="flex gap-3">
            @if (project.githubUrl) {
              <a [href]="project.githubUrl" target="_blank" rel="noopener noreferrer" class="transition-colors duration-200" style="color:#8b949e;" onmouseenter="this.style.color='#00ff41'" onmouseleave="this.style.color='#8b949e'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            }
            @if (project.liveUrl) {
              <a [href]="project.liveUrl" target="_blank" rel="noopener noreferrer" class="transition-colors duration-200" style="color:#8b949e;" onmouseenter="this.style.color='#00ff41'" onmouseleave="this.style.color='#8b949e'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            }
          </div>
        </div>

        @if (project.image) {
          <div class="relative overflow-hidden rounded mb-4 border border-[#00ff41]/10" style="aspect-ratio:16/9;">
            <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover" />
          </div>
        }

        <h4 class="font-bold mb-3" style="font-family:'Orbitron',sans-serif; color:#c9d1d9; font-size:0.95rem;">{{ project.title }}</h4>
        <p class="text-xs leading-relaxed mb-4 flex-1 text-justify" style="font-family:'JetBrains Mono',monospace; color:#8b949e; line-height:1.75;">{{ project.description }}</p>
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1 mt-auto pt-3 border-t text-xs" style="border-color:rgba(255,255,255,0.05); font-family:'JetBrains Mono',monospace; color:#8b949e;">
          <span style="opacity:0.5;">{{ '{' }}</span>
          @for (tag of project.tech; track tag; let last = $last) {
            <span>{{ tag }}</span>
            @if (!last) { <span style="opacity:0.35;">·</span> }
          }
          <span style="opacity:0.5;">{{ '}' }}</span>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    @keyframes ping {
      75%, 100% { transform: scale(2); opacity: 0; }
    }
  `]
})
export class ProjectsComponent {
  private readonly langSvc  = inject(LanguageService);

  protected readonly t      = computed(() => T[this.langSvc.lang()]);

  // ── Carousel ──────────────────────────────────────────
  readonly activeSlide = signal(0);

  private readonly TOTAL    = 3;
  private startX            = 0;
  private startY            = 0;
  private dragging          = false;
  private axis: 'h' | 'v' | null = null;
  private readonly THRESHOLD = 50;

  getCarouselTransform(i: number): string {
    const d = i - this.activeSlide();
    if (d === 0)  return 'translateX(0) scale(1)';
    if (d === -1 || (this.activeSlide() === 0 && i === this.TOTAL - 1))
                  return 'translateX(-108%) scale(0.92)';
    if (d === 1  || (this.activeSlide() === this.TOTAL - 1 && i === 0))
                  return 'translateX(108%) scale(0.92)';
    return 'translateX(0) scale(0.8)';
  }

  getCarouselOpacity(i: number): number {
    return i === this.activeSlide() ? 1 : 0.5;
  }

  getCarouselZIndex(i: number): number {
    return i === this.activeSlide() ? 3 : 1;
  }

  carouselPrev(): void {
    this.activeSlide.set((this.activeSlide() - 1 + this.TOTAL) % this.TOTAL);
  }

  carouselNext(): void {
    this.activeSlide.set((this.activeSlide() + 1) % this.TOTAL);
  }

  onTouchStart(e: TouchEvent): void {
    this.dragging = true;
    this.axis     = null;
    this.startX   = e.touches[0].clientX;
    this.startY   = e.touches[0].clientY;
  }

  onTouchMove(e: TouchEvent): void {
    if (!this.dragging) return;
    const dx = Math.abs(e.touches[0].clientX - this.startX);
    const dy = Math.abs(e.touches[0].clientY - this.startY);
    if (!this.axis) this.axis = dx > dy ? 'h' : 'v';
    if (this.axis === 'h') e.preventDefault();
  }

  onTouchEnd(e: TouchEvent): void {
    if (!this.dragging || this.axis !== 'h') { this.dragging = false; return; }
    this.dragging = false;
    const diff = e.changedTouches[0].clientX - this.startX;
    if (Math.abs(diff) > this.THRESHOLD) {
      diff < 0 ? this.carouselNext() : this.carouselPrev();
    }
  }

  // ── Cards ──────────────────────────────────────────────
  get activeProjects(): Project[] {
    return this.langSvc.lang() === 'en' ? ACTIVE_PROJECTS_EN : ACTIVE_PROJECTS;
  }

  get completedProjects(): Project[] {
    return this.langSvc.lang() === 'en' ? COMPLETED_PROJECTS_EN : COMPLETED_PROJECTS;
  }

  onCardEnter(event: MouseEvent, status: string): void {
    const el = event.currentTarget as HTMLElement;
    el.style.borderColor = status === 'active' ? 'rgba(0,255,65,0.4)' : 'rgba(0,229,255,0.4)';
    el.style.transform   = 'translateY(-4px)';
    el.style.boxShadow   = '0 12px 30px rgba(0,0,0,0.3)';
  }

  onCardLeave(event: MouseEvent, status: string): void {
    const el = event.currentTarget as HTMLElement;
    el.style.borderColor = status === 'active' ? 'rgba(0,255,65,0.15)' : 'rgba(0,229,255,0.15)';
    el.style.transform   = 'translateY(0)';
    el.style.boxShadow   = 'none';
  }
}
