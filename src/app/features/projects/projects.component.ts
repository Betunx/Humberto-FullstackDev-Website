import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';

interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  reverse: boolean;
}

interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="projects" class="py-32 px-6" style="background-color: #0a0a0a;">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div
          appInView
          [inViewThreshold]="0.1"
          class="fade-up mb-16"
        >
          <p
            class="text-sm tracking-widest mb-3"
            style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
          >04. // PROYECTOS</p>
          <h2
            class="text-3xl sm:text-4xl font-bold"
            style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
          >Lo que he construido</h2>
          <div class="mt-4 h-px w-24" style="background: linear-gradient(90deg, #00ff41, transparent);"></div>
        </div>

        <!-- Featured projects -->
        <div class="space-y-20 mb-24">
          @for (project of featuredProjects; track project.title; let i = $index) {
            <div
              appInView
              [inViewThreshold]="0.1"
              [inViewDelay]="100"
              [class]="project.reverse ? 'fade-right' : 'fade-left'"
            >
              <div
                class="grid lg:grid-cols-2 gap-0 rounded-lg overflow-hidden border"
                [class.lg:flex-row-reverse]="project.reverse"
                style="background-color: #0d1117; border-color: rgba(0,255,65,0.12);"
              >
                <!-- Image side -->
                <div
                  [class]="project.reverse ? 'lg:order-2' : 'lg:order-1'"
                  class="relative aspect-video lg:aspect-auto"
                  style="background-color: #0d1117; min-height: 220px;"
                >
                  <!-- Grid pattern placeholder -->
                  <div
                    class="absolute inset-0"
                    style="
                      background-image:
                        linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px);
                      background-size: 30px 30px;
                    "
                  ></div>
                  <!-- Green gradient overlay -->
                  <div
                    class="absolute inset-0"
                    style="background: linear-gradient(135deg, rgba(0,255,65,0.08) 0%, rgba(0,229,255,0.05) 100%);"
                  ></div>
                  <!-- Center icon -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(0,255,65,0.3)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                </div>

                <!-- Description side -->
                <div
                  [class]="project.reverse ? 'lg:order-1' : 'lg:order-2'"
                  class="p-8 flex flex-col justify-center"
                >
                  <p
                    class="text-xs tracking-widest mb-2"
                    style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
                  >Proyecto Destacado</p>
                  <h3
                    class="text-xl font-bold mb-4"
                    style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                  >{{ project.title }}</h3>
                  <p
                    class="text-sm leading-relaxed mb-6"
                    style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                  >{{ project.description }}</p>

                  <!-- Tech list -->
                  <div class="flex flex-wrap gap-2 mb-6">
                    @for (tag of project.tech; track tag) {
                      <span
                        class="text-xs px-2 py-1"
                        style="
                          font-family: 'JetBrains Mono', monospace;
                          color: #00e5ff;
                          background: rgba(0,229,255,0.07);
                          border: 1px solid rgba(0,229,255,0.18);
                          border-radius: 3px;
                        "
                      >{{ tag }}</span>
                    }
                  </div>

                  <!-- Icon links -->
                  <div class="flex items-center gap-4">
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="transition-all duration-200 hover:scale-110"
                      style="color: #8b949e;"
                      onmouseenter="this.style.color='#00ff41'"
                      onmouseleave="this.style.color='#8b949e'"
                      aria-label="GitHub"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="transition-all duration-200 hover:scale-110"
                      style="color: #8b949e;"
                      onmouseenter="this.style.color='#00e5ff'"
                      onmouseleave="this.style.color='#8b949e'"
                      aria-label="Live demo"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Other projects -->
        <div
          appInView
          [inViewThreshold]="0.1"
          class="fade-up mb-8"
        >
          <h3
            class="text-xl font-bold"
            style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
          >Otros Proyectos</h3>
          <div class="mt-2 h-px w-16" style="background: linear-gradient(90deg, #00ff41, transparent);"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (project of otherProjects; track project.title; let i = $index) {
            <div
              appInView
              [inViewThreshold]="0.1"
              [inViewDelay]="i * 80"
              class="fade-up"
            >
              <div
                class="p-6 rounded-lg border h-full flex flex-col transition-all duration-300"
                style="background-color: #0d1117; border-color: rgba(0,255,65,0.1);"
                onmouseenter="this.style.borderColor='rgba(0,255,65,0.35)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(0,0,0,0.3)'"
                onmouseleave="this.style.borderColor='rgba(0,255,65,0.1)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'"
              >
                <!-- Top row: folder + links -->
                <div class="flex items-center justify-between mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                  </svg>
                  <div class="flex items-center gap-3">
                    <a
                      [href]="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="transition-colors duration-200"
                      style="color: #8b949e;"
                      onmouseenter="this.style.color='#00ff41'"
                      onmouseleave="this.style.color='#8b949e'"
                      aria-label="GitHub"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      [href]="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="transition-colors duration-200"
                      style="color: #8b949e;"
                      onmouseenter="this.style.color='#00e5ff'"
                      onmouseleave="this.style.color='#8b949e'"
                      aria-label="Live demo"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Title & description -->
                <h4
                  class="font-bold mb-2"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9; font-size: 0.95rem;"
                >{{ project.title }}</h4>
                <p
                  class="text-xs leading-relaxed mb-5 flex-1"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >{{ project.description }}</p>

                <!-- Tech tags -->
                <div class="flex flex-wrap gap-2 mt-auto">
                  @for (tag of project.tech; track tag) {
                    <span
                      class="text-xs"
                      style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                    >{{ tag }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class ProjectsComponent {
  readonly featuredProjects: FeaturedProject[] = [
    {
      title: 'E-Commerce Platform',
      description:
        'Plataforma de comercio electrónico completa con carrito de compras, procesamiento de pagos, panel de administración y gestión de inventario. Arquitectura escalable desplegada en AWS con CI/CD automatizado.',
      tech: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
      githubUrl: 'https://github.com/Betunx',
      liveUrl: '#',
      reverse: false,
    },
    {
      title: 'Task Management App',
      description:
        'Aplicación de gestión de tareas en tiempo real con drag & drop, notificaciones push y colaboración en equipo. WebSockets para sincronización instantánea entre usuarios.',
      tech: ['React', 'NestJS', 'MongoDB', 'Socket.io', 'Redis'],
      githubUrl: 'https://github.com/Betunx',
      liveUrl: '#',
      reverse: true,
    },
  ];

  readonly otherProjects: OtherProject[] = [
    {
      title: 'API Gateway Service',
      description:
        'Servicio centralizado de gestión de APIs con rate limiting, autenticación JWT y monitoreo de métricas en tiempo real.',
      tech: ['Node.js', 'Express', 'Redis', 'Docker', 'AWS'],
      githubUrl: 'https://github.com/Betunx',
      liveUrl: '#',
    },
    {
      title: 'Portfolio Website',
      description:
        'Este mismo sitio. Diseño futurista Matrix/Tron con Angular 20, animaciones CSS y componentes standalone.',
      tech: ['Angular', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      githubUrl: 'https://github.com/Betunx',
      liveUrl: '#',
    },
    {
      title: 'Weather Dashboard',
      description:
        'Dashboard meteorológico con gráficas interactivas, pronóstico extendido y geolocalización automática.',
      tech: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
      githubUrl: 'https://github.com/Betunx',
      liveUrl: '#',
    },
    {
      title: 'Chat Application',
      description:
        'Aplicación de mensajería en tiempo real con salas, mensajes privados e historial persistente en base de datos.',
      tech: ['Angular', 'Node.js', 'Socket.io', 'MongoDB'],
      githubUrl: 'https://github.com/Betunx',
      liveUrl: '#',
    },
  ];
}
