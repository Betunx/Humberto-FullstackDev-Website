import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

interface JsonLine { indent: number; key?: string; value?: string; color?: string; punctuation?: string; }

const T = {
  es: {
    label: '01. // SOBRE_MÍ',
    heading: 'Sobre mí',
    fileLeft: 'profile.txt',
    fileRight: 'config.json',
    lines: [
      'Full Stack Developer con +5 años construyendo',
      'aplicaciones web de alto rendimiento.',
      '',
      'Especializado en Angular (17/18), TypeScript',
      'y Node.js, con enfoque en seguridad (CSP, HSTS),',
      'arquitectura escalable y Core Web Vitals.',
      '',
      'Habilidad para traducir diseños de Figma a',
      'layouts responsivos. Dominio de build tools',
      '(Webpack, Vite) y despliegue en cloud.',
      '',
      'Ing. Mecatrónico · Máster en Full-Stack Dev.',
      'Background en gobierno, salud, HR-tech y música.',
      'Actualmente liderando integraciones de IA',
      'con Claude AI y arquitecturas serverless.',
    ],
    json: [
      { indent: 0, punctuation: '{' },
      { indent: 1, key: '"ubicacion"',     value: '"Hermosillo, Sonora, MX"',   color: '#a5d6ff' },
      { indent: 1, key: '"remoto"',        value: 'true',                        color: '#79c0ff' },
      { indent: 1, key: '"disponible"',    value: '"Abierto a oportunidades"',   color: '#a5d6ff' },
      { indent: 1, key: '"idiomas"',       value: '["Español (Nativo)", "English (C1)"]', color: '#a5d6ff' },
      { indent: 1, key: '"enfoque"',       value: '["Angular", "Seguridad", "IA", "Serverless"]', color: '#a5d6ff' },
      { indent: 1, key: '"industrias"',    value: '["HR-tech", "Gobierno", "Música", "Salud"]', color: '#a5d6ff' },
      { indent: 1, key: '"formacion"',     value: '["Ing. Mecatrónico", "Máster Full-Stack"]', color: '#a5d6ff' },
      { indent: 1, key: '"certificacion"', value: '"Scrum Agile Framework (SFPC)"', color: '#a5d6ff' },
      { indent: 0, punctuation: '}' },
    ],
  },
  en: {
    label: '01. // ABOUT_ME',
    heading: 'About me',
    fileLeft: 'profile.txt',
    fileRight: 'config.json',
    lines: [
      'Full Stack Developer with 5+ years building',
      'high-performance web applications.',
      '',
      'Specialized in Angular (17/18), TypeScript',
      'and Node.js, focused on security (CSP, HSTS),',
      'scalable architecture and Core Web Vitals.',
      '',
      'Skilled at translating Figma designs into',
      'responsive layouts. Proficient with build tools',
      '(Webpack, Vite) and cloud deployment.',
      '',
      'Mechatronics Engineer · Master\'s in Full-Stack Dev.',
      'Background in gov, healthcare, HR-tech & music.',
      'Currently leading AI integrations with Claude AI',
      'and serverless architectures.',
    ],
    json: [
      { indent: 0, punctuation: '{' },
      { indent: 1, key: '"location"',      value: '"Hermosillo, Sonora, MX"',     color: '#a5d6ff' },
      { indent: 1, key: '"remote"',        value: 'true',                          color: '#79c0ff' },
      { indent: 1, key: '"available"',     value: '"Open to opportunities"',       color: '#a5d6ff' },
      { indent: 1, key: '"languages"',     value: '["Spanish (Native)", "English (C1)"]', color: '#a5d6ff' },
      { indent: 1, key: '"focus"',         value: '["Angular", "Security", "AI", "Serverless"]', color: '#a5d6ff' },
      { indent: 1, key: '"industries"',    value: '["HR-tech", "Government", "Music", "Healthcare"]', color: '#a5d6ff' },
      { indent: 1, key: '"education"',     value: '["Mechatronics Eng.", "Master\'s Full-Stack"]', color: '#a5d6ff' },
      { indent: 1, key: '"certification"', value: '"Scrum Agile Framework (SFPC)"', color: '#a5d6ff' },
      { indent: 0, punctuation: '}' },
    ],
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="about" class="py-32 px-6" style="background-color:#0a0a0a; position:relative; z-index:1;">
      <div class="max-w-6xl mx-auto">

        <!-- Section header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-12">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">01.</span> // ABOUT_ME
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().heading }}</h2>
          <div class="mt-4 h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <!-- Editor window -->
        <div
          appInView [inViewThreshold]="0.1" [inViewDelay]="100"
          class="fade-up rounded-lg overflow-hidden"
          style="border:1px solid rgba(255,255,255,0.08); box-shadow:0 8px 40px rgba(0,0,0,0.5);"
        >

          <!-- Title bar -->
          <div class="flex items-center gap-2 px-4 py-2.5" style="background-color:#1a1a2e; border-bottom:1px solid rgba(255,255,255,0.06);">
            <span class="w-3 h-3 rounded-full" style="background:#ff5f57;"></span>
            <span class="w-3 h-3 rounded-full" style="background:#febc2e;"></span>
            <span class="w-3 h-3 rounded-full" style="background:#28c840;"></span>
            <!-- Tabs — clickable on mobile, decorative on desktop -->
            <div class="flex ml-4 gap-1">
              <button
                (click)="activeTab.set('left')"
                class="px-4 py-1 text-xs rounded-t transition-all duration-200"
                [style]="activeTab() === 'left'
                  ? 'font-family:JetBrains Mono,monospace; background:#0d1117; border:1px solid rgba(0,255,65,0.4); border-bottom:2px solid #00ff41; color:#00ff41; text-shadow:0 0 8px rgba(0,255,65,0.6);'
                  : 'font-family:JetBrains Mono,monospace; background:#161b22; border:1px solid rgba(255,255,255,0.05); border-bottom:none; color:#8b949e;'"
              >{{ t().fileLeft }}</button>
              <button
                (click)="activeTab.set('right')"
                class="px-4 py-1 text-xs rounded-t transition-all duration-200"
                [style]="activeTab() === 'right'
                  ? 'font-family:JetBrains Mono,monospace; background:#161b22; border:1px solid rgba(0,255,65,0.4); border-bottom:2px solid #00ff41; color:#00ff41; text-shadow:0 0 8px rgba(0,255,65,0.6);'
                  : 'font-family:JetBrains Mono,monospace; background:#0d1117; border:1px solid rgba(255,255,255,0.05); border-bottom:none; color:#8b949e;'"
              >{{ t().fileRight }}</button>
            </div>
          </div>

          <!-- Split panels -->
          <div class="grid lg:grid-cols-2 lg:min-h-[340px]">

            <!-- LEFT: profile.txt — always visible on lg, toggled on mobile -->
            <div
              [class]="activeTab() === 'left' ? 'block' : 'hidden lg:block'"
              [style]="activeTab() === 'left'
                ? 'background:#0d1117; border-right:1px solid rgba(255,255,255,0.06); border-top:2px solid #00ff41; transition:opacity 0.2s;'
                : 'background:#0d1117; border-right:1px solid rgba(255,255,255,0.06); border-top:2px solid transparent; opacity:0.45; transition:opacity 0.2s;'"
            >
              <div class="px-4 py-2 flex items-center gap-2" style="background:#0d1117; border-bottom:1px solid rgba(255,255,255,0.04);">
                <span style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#8b949e;">// plain text</span>
              </div>
              <div class="py-4">
                @for (line of t().lines; track $index; let n = $index) {
                  <div class="flex gap-4 px-4 py-0.5 hover-line" style="transition:background 0.1s;">
                    <span class="select-none flex-shrink-0 text-right" style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#3c4454; width:1.6rem;">{{ n + 1 }}</span>
                    <span style="font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#c9d1d9; line-height:1.7; white-space:pre-wrap;">{{ line }}</span>
                  </div>
                }
                <div class="flex gap-4 px-4 py-0.5">
                  <span class="select-none flex-shrink-0 text-right" style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#3c4454; width:1.6rem;">{{ t().lines.length + 1 }}</span>
                  <span class="cursor-blink" style="display:inline-block; width:8px; height:1rem; background:#00ff41;"></span>
                </div>
              </div>
            </div>

            <!-- RIGHT: config.json — always visible on lg, toggled on mobile -->
            <div
              [class]="activeTab() === 'right' ? 'block' : 'hidden lg:block'"
              [style]="activeTab() === 'right'
                ? 'background:#161b22; border-top:2px solid #00ff41; transition:opacity 0.2s;'
                : 'background:#161b22; border-top:2px solid transparent; opacity:0.45; transition:opacity 0.2s;'"
            >
              <div class="px-4 py-2 flex items-center gap-2" style="border-bottom:1px solid rgba(255,255,255,0.04);">
                <span style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#8b949e;">// json</span>
              </div>
              <div class="py-4">
                @for (row of t().json; track $index; let n = $index) {
                  <div class="flex gap-4 px-4 py-0.5 hover-line" style="transition:background 0.1s;">
                    <span class="select-none flex-shrink-0 text-right" style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#3c4454; width:1.6rem;">{{ n + 1 }}</span>
                    <span style="font-family:'JetBrains Mono',monospace; font-size:0.78rem; line-height:1.75;">
                      @if (row.punctuation) {
                        <span style="color:#c9d1d9;">{{ row.punctuation }}</span>
                      }
                      @if (row.key) {
                        <span style="padding-left:1rem;">
                          <span style="color:#7ee787;">{{ row.key }}</span>
                          <span style="color:#c9d1d9;">: </span>
                          <span [style.color]="row.color">{{ row.value }}</span><span style="color:#c9d1d9;">,</span>
                        </span>
                      }
                    </span>
                  </div>
                }
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hover-line:hover { background-color: rgba(255,255,255,0.03); }
    .cursor-blink { animation: blink 1s step-end infinite; }
    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
  `]
})
export class AboutComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);
  protected readonly activeTab = signal<'left' | 'right'>('left');
}
