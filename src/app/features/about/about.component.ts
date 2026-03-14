import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

const T = {
  es: {
    label: '01. // SOBRE_MÍ',
    heading: '¿Quién soy?',
    p1: 'Full Stack Developer con +5 años de experiencia especializado en Angular, TypeScript, Node.js y NestJS. Experto en diseñar dashboards interactivos, interfaces intuitivas y APIs RESTful con autenticación JWT.',
    p2: 'Habilidad para traducir diseños UI/UX de Figma a layouts responsivos y semánticos. Dominio de scaffolding de proyectos, configuración de build tools (Webpack, Vite, Babel) y optimización para producción.',
    p3: 'Actualmente desarrollando integraciones de IA conversacional con HubSpot y Claude AI. Background en proyectos de gobierno, salud, HR-tech y música.',
    cards: [
      { title: 'Frontend', desc: 'Angular, React, Vue.js, Next.js, TypeScript' },
      { title: 'Backend', desc: 'Node.js, NestJS, Express, RESTful APIs, JWT' },
      { title: 'Bases de Datos', desc: 'PostgreSQL, MongoDB, MySQL, Redis' },
      { title: 'Cloud & DevOps', desc: 'AWS, Cloudflare, Docker, Vercel, GitHub Actions' },
      { title: 'Testing & QA', desc: 'Jest, Jasmine, Postman' },
      { title: 'AI & Herramientas', desc: 'HubSpot, Claude AI, Jira, Figma' },
    ],
  },
  en: {
    label: '01. // ABOUT_ME',
    heading: 'Who Am I?',
    p1: 'Full Stack Developer with 5+ years of experience specializing in Angular, TypeScript, Node.js & NestJS. Expert at designing interactive dashboards, intuitive UIs and RESTful APIs with JWT authentication.',
    p2: 'Skilled at translating Figma UI/UX designs into responsive, semantic layouts. Proficient with project scaffolding, build tools (Webpack, Vite, Babel) and production optimization.',
    p3: 'Currently building conversational AI integrations with HubSpot and Claude AI. Background across government, healthcare, HR-tech and music-tech projects.',
    cards: [
      { title: 'Frontend', desc: 'Angular, React, Vue.js, Next.js, TypeScript' },
      { title: 'Backend', desc: 'Node.js, NestJS, Express, RESTful APIs, JWT' },
      { title: 'Databases', desc: 'PostgreSQL, MongoDB, MySQL, Redis' },
      { title: 'Cloud & DevOps', desc: 'AWS, Cloudflare, Docker, Vercel, GitHub Actions' },
      { title: 'Testing & QA', desc: 'Jest, Jasmine, Postman' },
      { title: 'AI & Tools', desc: 'HubSpot, Claude AI, Jira, Figma' },
    ],
  },
};

const CARD_COLORS = ['#00ff41', '#00e5ff', '#a855f7', '#f59e0b', '#00e5ff', '#a855f7'];
const CARD_BORDER_COLORS = [
  'rgba(0,255,65,0.1)', 'rgba(0,229,255,0.1)', 'rgba(168,85,247,0.1)',
  'rgba(245,158,11,0.1)', 'rgba(0,229,255,0.1)', 'rgba(168,85,247,0.1)',
];
const CARD_HOVER_COLORS = [
  'rgba(0,255,65,0.4)', 'rgba(0,229,255,0.4)', 'rgba(168,85,247,0.4)',
  'rgba(245,158,11,0.4)', 'rgba(0,229,255,0.4)', 'rgba(168,85,247,0.4)',
];
const CARD_ICONS = [
  `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  `<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  `<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>`,
  `<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>`,
  `<path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-1.07-3.43A3 3 0 016 12a2.5 2.5 0 01-.5-4.96V7a2.5 2.5 0 013-2.5z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 001.07-3.43A3 3 0 0118 12a2.5 2.5 0 00.5-4.96V7a2.5 2.5 0 00-3-2.5z"/>`,
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="about" class="py-32 px-6" style="background-color: #0a0a0a;">
      <div class="max-w-6xl mx-auto">

        <!-- Section header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-16">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">{{ t().label.split('.')[0] }}.</span>{{ t().label.substring(t().label.indexOf('.') + 1) }}
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().heading }}</h2>
          <div class="mt-4 h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <!-- Two-column grid -->
        <div class="grid lg:grid-cols-2 gap-12 items-start">

          <!-- LEFT: Terminal card -->
          <div appInView [inViewThreshold]="0.15" [inViewDelay]="100" class="fade-left">
            <div class="rounded-lg overflow-hidden border" style="background-color:#0d1117; border-color:rgba(0,255,65,0.15);">
              <!-- Terminal header bar -->
              <div class="flex items-center gap-2 px-4 py-3 border-b" style="background-color:#161b22; border-color:rgba(0,255,65,0.1);">
                <span class="w-3 h-3 rounded-full" style="background-color:#ff5f57;"></span>
                <span class="w-3 h-3 rounded-full" style="background-color:#ffbd2e;"></span>
                <span class="w-3 h-3 rounded-full" style="background-color:#28c840;"></span>
                <span class="ml-3 text-xs" style="font-family:'JetBrains Mono',monospace; color:#8b949e;">~/about/humberto.md</span>
              </div>
              <!-- Terminal body -->
              <div class="p-6 space-y-5">
                <p style="font-family:'JetBrains Mono',monospace; color:#c9d1d9; line-height:1.8; font-size:0.875rem;">
                  <span style="color:#00ff41;">&gt; </span>{{ t().p1 }}
                </p>
                <p style="font-family:'JetBrains Mono',monospace; color:#8b949e; line-height:1.8; font-size:0.875rem;">
                  <span style="color:#00e5ff;">&gt; </span>{{ t().p2 }}
                </p>
                <p style="font-family:'JetBrains Mono',monospace; color:#8b949e; line-height:1.8; font-size:0.875rem;">
                  <span style="color:#00e5ff;">&gt; </span>{{ t().p3 }}
                </p>
                <span class="inline-block w-2 h-4 align-middle" style="background-color:#00ff41; animation:blink-cursor 1s step-end infinite;"></span>
              </div>
            </div>
          </div>

          <!-- RIGHT: 2x3 highlight cards -->
          <div appInView [inViewThreshold]="0.15" [inViewDelay]="200" class="fade-right">
            <div class="grid grid-cols-2 gap-4">
              @for (card of t().cards; track card.title; let i = $index) {
                <div
                  class="p-5 rounded-lg border transition-all duration-300"
                  [style.backgroundColor]="'#0d1117'"
                  [style.borderColor]="cardBorderColors[i]"
                  (mouseenter)="onCardEnter($event, i)"
                  (mouseleave)="onCardLeave($event, i)"
                >
                  <div class="mb-3">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      [attr.stroke]="cardColors[i]"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      [innerHTML]="cardIcons[i]">
                    </svg>
                  </div>
                  <h3 class="font-bold mb-1 text-sm" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ card.title }}</h3>
                  <p class="text-xs leading-relaxed" style="font-family:'JetBrains Mono',monospace; color:#8b949e;">{{ card.desc }}</p>
                </div>
              }
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
export class AboutComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);

  readonly cardColors = CARD_COLORS;
  readonly cardBorderColors = CARD_BORDER_COLORS;
  readonly cardIcons = CARD_ICONS;

  onCardEnter(event: MouseEvent, i: number): void {
    const el = event.currentTarget as HTMLElement;
    el.style.borderColor = CARD_HOVER_COLORS[i];
    el.style.boxShadow = `0 0 20px ${CARD_COLORS[i]}14`;
  }

  onCardLeave(event: MouseEvent, i: number): void {
    const el = event.currentTarget as HTMLElement;
    el.style.borderColor = CARD_BORDER_COLORS[i];
    el.style.boxShadow = 'none';
  }
}
