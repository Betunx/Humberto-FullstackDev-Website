import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

const T = {
  es: { label: '02. // TECH_STACK', heading: 'Habilidades & Tecnologías' },
  en: { label: '02. // TECH_STACK', heading: 'Skills & Technologies' },
};

interface Category { id: string; label: string; cmd: string; color: string; glow: string; skills: string[]; }

const CATEGORIES: Category[] = [
  {
    id: 'frontend', label: 'Frontend', cmd: 'frontend.stack', color: '#00ff41', glow: 'rgba(0,255,65,0.15)',
    skills: ['Angular 17/18', 'TypeScript / ES6+', 'React / Next.js', 'Vue.js', 'RxJS / NgRx', 'HTML5 / CSS3 / SCSS', 'Tailwind CSS / Bootstrap'],
  },
  {
    id: 'backend', label: 'Backend', cmd: 'backend.stack', color: '#00e5ff', glow: 'rgba(0,229,255,0.15)',
    skills: ['Node.js', 'NestJS', 'Express.js', 'RESTful APIs / JWT', 'Cloudflare Workers'],
  },
  {
    id: 'data', label: 'Data & Tools', cmd: 'data.stack', color: '#a855f7', glow: 'rgba(168,85,247,0.15)',
    skills: ['PostgreSQL / TypeORM', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Webpack / Vite / Babel'],
  },
  {
    id: 'devops', label: 'DevOps & QA', cmd: 'devops.stack', color: '#f59e0b', glow: 'rgba(245,158,11,0.15)',
    skills: ['Docker', 'GitHub Actions / CI-CD', 'AWS / Vercel / Cloudflare', 'Git / GitHub', 'Jest / Jasmine / Playwright', 'Postman / Figma'],
  },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skills',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="skills" class="py-32 px-6" style="background-color:#0a0a0a; position:relative; z-index:1;">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-16">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">02.</span> // TECH_STACK
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">
            {{ t().heading }}
          </h2>
          <div class="mt-4 h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <!-- Category cards grid -->
        <div class="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          @for (cat of categories; track cat.id; let i = $index) {
            <div appInView [inViewThreshold]="0.15" [inViewDelay]="i * 100" class="fade-up">
              <div class="rounded-lg overflow-hidden h-full" style="background-color:#0d1117; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 8px 32px rgba(0,0,0,0.4);">

                <!-- Editor title bar -->
                <div class="flex items-center gap-2 px-4 py-2.5" style="background-color:#1a1a2e; border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <span class="w-3 h-3 rounded-full" style="background:#ff5f57;"></span>
                  <span class="w-3 h-3 rounded-full" style="background:#febc2e;"></span>
                  <span class="w-3 h-3 rounded-full" style="background:#28c840;"></span>
                  <span
                    class="ml-3 text-xs px-3 py-0.5 rounded-t"
                    style="font-family:'JetBrains Mono',monospace; background-color:#0d1117; border: 1px solid rgba(255,255,255,0.08); border-bottom:none;"
                    [style.color]="cat.color"
                  >{{ cat.cmd }}.ts</span>
                </div>

                <!-- Editor body -->
                <div class="p-4" style="background-color:#0d1117;">
                  <!-- Comment header -->
                  <div class="mb-3" style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#8b949e;">
                    <span>// </span><span [style.color]="cat.color">{{ cat.label }}</span><span> stack</span>
                  </div>

                  <!-- Code lines -->
                  @for (skill of cat.skills; track skill; let n = $index) {
                    <div class="flex items-baseline gap-2 py-0.5 rounded px-1 hover-line" style="transition: background 0.15s;">
                      <span
                        class="text-xs select-none w-4 text-right flex-shrink-0"
                        style="font-family:'JetBrains Mono',monospace; color:#3c4454;"
                      >{{ n + 1 }}</span>
                      <span style="font-family:'JetBrains Mono',monospace; font-size:0.78rem; color:#c9d1d9;">
                        &nbsp;&nbsp;<span [style.color]="cat.color">'</span>{{ skill }}<span [style.color]="cat.color">'</span>
                      </span>
                    </div>
                  }

                  <!-- Closing line -->
                  <div class="mt-1 flex items-baseline gap-3 px-1">
                    <span class="text-xs select-none w-4 text-right" style="font-family:'JetBrains Mono',monospace; color:#3c4454;">{{ cat.skills.length + 1 }}</span>
                  </div>
                </div>

              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hover-line:hover {
      background-color: rgba(255,255,255,0.03);
    }
  `]
})
export class SkillsComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);
  protected readonly categories = CATEGORIES;
}
