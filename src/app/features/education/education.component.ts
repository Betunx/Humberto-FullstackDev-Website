import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

const T = {
  es: {
    label: '06. // EDUCACIÓN',
    heading: 'Formación Académica',
    education: [
      {
        school: 'Universidad de La Rioja, España',
        degree: 'Máster en Desarrollo Full-Stack',
        period: '2024 – 2025',
        details: 'Docker, Jest, Angular, TypeScript, DevOps, MEAN Stack (Credencial en proceso)',
        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      },
      {
        school: 'Tecnológico Nacional de México',
        degree: 'Ing. Mecatrónica',
        period: '2017 – 2022',
        details: 'Especialización: Automatización & Robótica · Cédula: 14864066',
        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      },
    ],
    certsLabel: 'Certificaciones',
    certs: ['Scrum Agile Framework (SFPC)'],
    langsLabel: 'Idiomas',
    langs: ['Español: Nativo', 'Inglés: C1 (Avanzado)'],
  },
  en: {
    label: '06. // EDUCATION',
    heading: 'Academic Background',
    education: [
      {
        school: 'Universidad de La Rioja, Spain',
        degree: "Master's in Full-Stack Development",
        period: '2024 – 2025',
        details: 'Docker, Jest, Angular, TypeScript, DevOps, MEAN Stack (Credential in process)',
        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      },
      {
        school: 'Tecnológico Nacional de México',
        degree: 'B.Eng. Mechatronics Engineering',
        period: '2017 – 2022',
        details: 'Specialization: Automation & Robotics · Certificate: 14864066',
        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      },
    ],
    certsLabel: 'Certifications',
    certs: ['Scrum Agile Framework (SFPC)'],
    langsLabel: 'Languages',
    langs: ['Spanish: Native', 'English: C1 (Advanced)'],
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-education',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section id="education" class="py-32 px-6" style="background-color: #0a0a0a;">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-16">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">06.</span> {{ t().label.substring(2) }}
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().heading }}</h2>
          <div class="mt-4 h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">

          <!-- Education cards (2/3 width) -->
          <div class="lg:col-span-2 grid md:grid-cols-2 gap-6">
            @for (edu of t().education; track edu.school; let i = $index) {
              <div
                appInView
                [inViewThreshold]="0.15"
                [inViewDelay]="i * 150"
                class="fade-up"
              >
                <div
                  class="p-6 rounded-lg border h-full transition-all duration-300"
                  style="background-color:#0d1117; border-color:rgba(0,255,65,0.1);"
                  onmouseenter="this.style.borderColor='rgba(0,255,65,0.35)'; this.style.boxShadow='0 0 24px rgba(0,255,65,0.06)'"
                  onmouseleave="this.style.borderColor='rgba(0,255,65,0.1)'; this.style.boxShadow='none'"
                >
                  <!-- Graduation icon -->
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style="background:rgba(0,255,65,0.08); border:1px solid rgba(0,255,65,0.2);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                  <h3 class="font-bold mb-1" style="font-family:'Orbitron',sans-serif; color:#00ff41; font-size:0.9rem;">{{ edu.school }}</h3>
                  <p class="mb-1" style="font-family:'JetBrains Mono',monospace; color:#c9d1d9; font-size:0.85rem;">{{ edu.degree }}</p>
                  <p class="mb-3" style="font-family:'JetBrains Mono',monospace; color:#00e5ff; font-size:0.75rem;">{{ edu.period }}</p>
                  <p style="font-family:'JetBrains Mono',monospace; color:#8b949e; font-size:0.75rem; line-height:1.6; font-style:italic;">{{ edu.details }}</p>
                </div>
              </div>
            }
          </div>

          <!-- Certs + Languages (1/3 width) -->
          <div appInView [inViewThreshold]="0.15" [inViewDelay]="300" class="fade-up flex flex-col gap-6">

            <!-- Certifications -->
            <div class="p-6 rounded-lg border flex-1" style="background-color:#0d1117; border-color:rgba(0,229,255,0.1);">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded flex items-center justify-center" style="background:rgba(0,229,255,0.08); border:1px solid rgba(0,229,255,0.2);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <h3 class="font-bold text-sm tracking-widest" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().certsLabel }}</h3>
              </div>
              @for (cert of t().certs; track cert) {
                <div class="flex items-start gap-2 mb-2">
                  <span style="color:#00e5ff; font-size:0.7rem; margin-top:2px;">▸</span>
                  <span style="font-family:'JetBrains Mono',monospace; color:#8b949e; font-size:0.8rem;">{{ cert }}</span>
                </div>
              }
            </div>

            <!-- Languages -->
            <div class="p-6 rounded-lg border flex-1" style="background-color:#0d1117; border-color:rgba(168,85,247,0.1);">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded flex items-center justify-center" style="background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.2);">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                </div>
                <h3 class="font-bold text-sm tracking-widest" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().langsLabel }}</h3>
              </div>
              @for (lang of t().langs; track lang) {
                <div class="flex items-start gap-2 mb-2">
                  <span style="color:#a855f7; font-size:0.7rem; margin-top:2px;">▸</span>
                  <span style="font-family:'JetBrains Mono',monospace; color:#8b949e; font-size:0.8rem;">{{ lang }}</span>
                </div>
              }
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class EducationComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);
}
