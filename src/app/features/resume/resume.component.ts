import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '@core/services/language.service';

const T = {
  es: {
    title1: 'DESARROLLADOR FULL STACK',
    title2: 'ESPECIALISTA ANGULAR',
    location: 'Hermosillo, Sonora, México',
    remote: 'Remoto',

    summaryLabel: 'RESUMEN PROFESIONAL',
    summary: 'Desarrollador Full Stack con más de 5 años de experiencia construyendo aplicaciones web de alto rendimiento. Especialista en entorno Angular (17/18), TypeScript y Node.js. Enfoque actual en seguridad, arquitectura escalable y optimización de Core Web Vitals. Ingeniero Mecatrónico con Máster en Desarrollo Full-Stack, capaz de liderar proyectos desde la concepción del MVP hasta el despliegue en entornos cloud modernos (Vercel/Cloudflare).',

    eduLabel: 'EDUCACIÓN',
    education: [
      {
        degree: 'MÁSTER EN DESARROLLO FULL-STACK (2025)',
        school: 'UNIR, Universidad de La Rioja, España.',
        detail: 'Especialidad: Docker, Jest, Angular, DevOps, MEAN Stack',
      },
      {
        degree: 'INGENIERÍA EN MECATRÓNICA (2022)',
        school: 'Tecnológico Nacional de México. Campus Hermosillo',
        detail: 'Especialidad: Automatización y Robótica.',
      },
    ],

    skillsLabel: 'HABILIDADES',
    skills: [
      { label: 'Core', value: 'Angular, TypeScript, Node.js, NestJS.' },
      { label: 'Front', value: 'RxJS, NgRx, React, Next.js, Tailwind, SCSS, PWA, HTML5/CSS3.' },
      { label: 'Back', value: 'Express, RESTful APIs, PostgreSQL, MongoDB, TypeORM, Redis, Elasticsearch' },
      { label: 'Cloud & Ops', value: 'Vercel, Cloudflare (Workers/Pages), AWS, Docker, GitHub Actions' },
      { label: 'Tools & Test', value: 'Jest, Jasmine, Playwright, Postman, Figma, Git, Claude AI, Copilot' },
    ],

    langsLabel: 'IDIOMAS',
    langs: 'Español (Nativo) | Inglés (C1 Advanced).',

    certsLabel: 'CERTIFICACIONES',
    certs: 'Scrum Agile Framework (SFPC).',

    expLabel: 'EXPERIENCIA PROFESIONAL',
    experience: [
      {
        company: 'HIRABLY',
        role: 'Full Stack Developer',
        period: 'Sep 2025 – Presente',
        bullets: [
          'Angular 17 & Performance: Lideré la arquitectura con Angular 17, implementando Control Flow y OnPush para maximizar la velocidad de renderizado.',
          'Custom Booking & Serverless: Desarrollé un motor de reservas con la API de Cal.com y Vercel Serverless, eliminando el uso de iframes.',
          'Seguridad & IA: Configuré Hardening de seguridad (CSP, HSTS) e integré un chatbot con Claude AI para automatizar el screening de candidatos.',
          'Growth: Optimicé SEO dinámico y analítica avanzada con GA4/GTM para el seguimiento de conversiones.',
        ],
      },
      {
        company: 'ICATSON (Gobierno de Sonora)',
        role: 'Web Developer',
        period: '2023 – 2024',
        bullets: [
          'Liderazgo técnico en el mantenimiento, mejora y optimización del sitio oficial del gobierno (icatson.sonora.gob.mx) y herramientas internas de la institución.',
          'Desarrollo Full Stack de nuevos módulos web y actualización de contenidos mediante Joomla!, gestionando tanto frontend como backend del CMS.',
          'Optimización del rendimiento frontend, resolviendo problemas críticos de gestión de memoria en módulos JavaScript y mejorando tiempos de carga.',
          'Coordinación con equipos internos usando Jira y GitHub para el control de versiones, seguimiento de tareas y despliegue de actualizaciones.',
        ],
      },
      {
        company: 'MARTINREA AUTOMOTIVE',
        role: 'CNC Engineer',
        period: '2021 – 2022',
        bullets: [
          'Operación y optimización de maquinaria CNC en líneas de producción automatizadas para la industria automotriz, aplicando principios de ingeniería mecatrónica en diagnóstico de fallos, mantenimiento preventivo y mejora continua de procesos de manufactura.',
        ],
      },
    ],

    portfolioLabel: 'PORTAFOLIOS',
    printBtn: 'Imprimir',
    downloadBtn: 'Descargar CV',
    cvFile: '/cv-humberto-lopez-es.pdf',
    cvFileName: 'CV_Humberto_Lopez_ES.pdf',
  },

  en: {
    title1: 'FULL STACK DEVELOPER',
    title2: 'ANGULAR SPECIALIST',
    location: 'Hermosillo, Sonora, México',
    remote: 'Remote',

    summaryLabel: 'PROFESSIONAL SUMMARY',
    summary: 'Full Stack Developer with 5+ years of experience building high-performance web applications. Specialized in Angular (17/18), TypeScript, and Node.js, with a current focus on security, scalable architecture, and Core Web Vitals optimization. Mechatronics Engineer with a Master\'s in Full-Stack Development, capable of leading projects from MVP conception through deployment on modern cloud environments (Vercel/Cloudflare).',

    eduLabel: 'EDUCATION',
    education: [
      {
        degree: 'Master\'s in Full-Stack Development (2025)',
        school: 'UNIR, Universidad de La Rioja, Spain',
        detail: 'Specialization: Docker, Jest, Angular, DevOps, MEAN Stack',
      },
      {
        degree: 'Mechatronics Engineering (2022)',
        school: 'Tecnológico Nacional de México. Campus Hermosillo',
        detail: 'Specialization: Automation and Robotics.',
      },
    ],

    skillsLabel: 'SKILLS',
    skills: [
      { label: 'Core', value: 'Angular, TypeScript, Node.js, NestJS.' },
      { label: 'Front', value: 'RxJS, NgRx, React, Next.js, Tailwind, SCSS, PWA, HTML5/CSS3.' },
      { label: 'Back', value: 'Express, RESTful APIs, PostgreSQL, MongoDB, TypeORM, Redis, Elasticsearch' },
      { label: 'Cloud & Ops', value: 'Vercel, Cloudflare (Workers/Pages), AWS, Docker, GitHub Actions' },
      { label: 'Tools & Test', value: 'Jest, Jasmine, Playwright, Postman, Figma, Git, Claude AI, Copilot' },
    ],

    langsLabel: 'LANGUAGES',
    langs: 'Spanish (Native) | English (C1 Advanced).',

    certsLabel: 'CERTIFICATIONS',
    certs: 'Scrum Agile Framework (SFPC).',

    expLabel: 'PROFESSIONAL EXPERIENCE',
    experience: [
      {
        company: 'HIRABLY',
        role: 'Full Stack Developer',
        period: 'Sep 2025 – Present',
        bullets: [
          'Angular 17 & Performance: Led the architecture with Angular 17, implementing Control Flow and OnPush to maximize rendering speed.',
          'Custom Booking & Serverless: Developed a booking engine using the Cal.com API and Vercel Serverless, eliminating the use of iframes.',
          'Security & AI: Configured security hardening (CSP, HSTS) and integrated a chatbot with Claude AI to automate candidate screening.',
          'Growth: Optimized dynamic SEO and advanced analytics with GA4/GTM for conversion tracking.',
        ],
      },
      {
        company: 'ICATSON (Government of Sonora)',
        role: 'Web Developer',
        period: '2023 – 2024',
        bullets: [
          'Technical leadership in the maintenance, improvement, and optimization of the official government website (icatson.sonora.gob.mx) and internal institutional tools.',
          'Full Stack development of new web modules and content updates through Joomla!, managing both frontend and backend of the CMS.',
          'Frontend performance optimization, resolving critical memory management issues in JavaScript modules and improving load times.',
          'Coordination with internal teams using Jira and GitHub for version control, task tracking, and deployment of updates.',
        ],
      },
      {
        company: 'MARTINREA AUTOMOTIVE',
        role: 'CNC Engineer',
        period: '2021 – 2022',
        bullets: [
          'Operation and optimization of CNC machinery on automated production lines for the automotive industry, applying mechatronics engineering principles in fault diagnosis, preventive maintenance, and continuous improvement of manufacturing processes.',
        ],
      },
    ],

    portfolioLabel: 'PORTFOLIO',
    printBtn: 'Print',
    downloadBtn: 'Download CV',
    cvFile: '/cv-humberto-lopez-en.pdf',
    cvFileName: 'CV_Humberto_Lopez_EN.pdf',
  },
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => T[this.langSvc.lang()]);
}
