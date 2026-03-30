import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

const T = {
  es: {
    label: '06. // EDUCACIÓN',
    heading: 'Formación Académica',
    education: [
      {
        school: 'Universidad de La Rioja (UNIR), España',
        degree: 'Máster en Desarrollo Full-Stack',
        period: '2024 – 2025 · Completado — Cédula en proceso',
        details: 'Formación especializada en arquitectura de aplicaciones web con el stack MEAN (MongoDB, Express, Angular, Node.js). Desarrollo del proyecto final GeriaCare: plataforma de gestión para centros geriátricos con autenticación JWT, aggregation pipelines en MongoDB y manejo reactivo con RxJS. Prácticas con Docker, Jest, CI/CD y metodologías DevOps.',
        image: '/unir.jpg',
      },
      {
        school: 'Tecnológico Nacional de México — Campus Hermosillo',
        degree: 'Ingeniería en Mecatrónica',
        period: '2017 – 2022 · Cédula: 14864066',
        details: 'Formación multidisciplinaria en electrónica, control, programación y sistemas mecánicos. Especialización en Automatización y Robótica. La base en lógica de sistemas, diagnóstico de fallos y pensamiento estructurado se traduce directamente en mi enfoque actual hacia arquitectura de software y resolución de problemas técnicos complejos.',
        image: '/tecnm.jpg',
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
        school: 'Universidad de La Rioja (UNIR), Spain',
        degree: "Master's in Full-Stack Development",
        period: '2024 – 2025 · Completed — credential in process',
        details: 'Specialized training in web application architecture using the MEAN stack (MongoDB, Express, Angular, Node.js). Final project GeriaCare: a management platform for geriatric care centers featuring JWT authentication, MongoDB aggregation pipelines and reactive handling with RxJS. Hands-on practice with Docker, Jest, CI/CD pipelines and DevOps methodologies.',
        image: '/unir.jpg',
      },
      {
        school: 'Tecnológico Nacional de México — Campus Hermosillo',
        degree: 'B.Eng. Mechatronics Engineering',
        period: '2017 – 2022 · Certificate: 14864066',
        details: 'Multidisciplinary training in electronics, control systems, programming and mechanical systems. Specialization in Automation and Robotics. The foundation in systems logic, fault diagnosis and structured thinking directly translates into my current approach to software architecture and complex technical problem-solving.',
        image: '/tecnm.jpg',
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
    <section id="education" class="py-32 px-6" style="background-color:#0a0a0a; position:relative; z-index:1;">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div appInView [inViewThreshold]="0.1" class="fade-up mb-16">
          <p class="text-sm tracking-widest mb-3" style="font-family:'JetBrains Mono',monospace; color:#00ff41;">
            <span style="color:#00e5ff;">06.</span> {{ t().label.substring(2) }}
          </p>
          <h2 class="text-3xl sm:text-4xl font-bold" style="font-family:'Orbitron',sans-serif; color:#c9d1d9;">{{ t().heading }}</h2>
          <div class="mt-4 h-px w-24" style="background:linear-gradient(90deg,#00ff41,transparent);"></div>
        </div>

        <div class="flex flex-col gap-6">

          <!-- Education cards — full-width rectangles -->
          @for (edu of t().education; track edu.school; let i = $index) {
            <div appInView [inViewThreshold]="0.15" [inViewDelay]="i * 150" class="fade-up">
              <div
                class="rounded-lg border overflow-hidden transition-all duration-300"
                style="background-color:#0d1117; border-color:rgba(0,255,65,0.1);"
                onmouseenter="this.style.borderColor='rgba(0,255,65,0.35)'; this.style.boxShadow='0 0 24px rgba(0,255,65,0.06)'"
                onmouseleave="this.style.borderColor='rgba(0,255,65,0.1)'; this.style.boxShadow='none'"
              >
                <!-- Top: image left 1/3 + info right 2/3 -->
                <div class="flex" style="border-bottom:1px solid rgba(0,255,65,0.08); min-height:200px;">
                  <!-- Left: image -->
                  <div class="flex items-center justify-center shrink-0" style="width:33.333%; background:rgba(255,255,255,0.025); border-right:1px solid rgba(0,255,65,0.08); padding:16px;">
                    <img [src]="edu.image" [alt]="edu.school" class="object-contain" style="width:100%; height:100%; max-height:168px;">
                  </div>
                  <!-- Right: school info centered -->
                  <div class="flex flex-col justify-center items-center text-center flex-1 p-6 gap-2">
                    <h3 class="font-bold leading-snug" style="font-family:'Orbitron',sans-serif; color:#00ff41; font-size:0.85rem;">{{ edu.school }}</h3>
                    <p style="font-family:'JetBrains Mono',monospace; color:#c9d1d9; font-size:0.82rem;">{{ edu.degree }}</p>
                    <p style="font-family:'JetBrains Mono',monospace; color:#00e5ff; font-size:0.72rem;">{{ edu.period }}</p>
                  </div>
                </div>
                <!-- Bottom: description -->
                <div class="p-6">
                  <p class="text-justify" style="font-family:'JetBrains Mono',monospace; color:#8b949e; font-size:0.75rem; line-height:1.6;">{{ edu.details }}</p>
                </div>
              </div>
            </div>
          }

          <!-- Certs + Languages — side by side below -->
          <div appInView [inViewThreshold]="0.15" [inViewDelay]="300" class="fade-up grid md:grid-cols-2 gap-6">

            <!-- Certifications -->
            <div class="p-6 rounded-lg border" style="background-color:#0d1117; border-color:rgba(0,229,255,0.1);">
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
            <div class="p-6 rounded-lg border" style="background-color:#0d1117; border-color:rgba(168,85,247,0.1);">
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
