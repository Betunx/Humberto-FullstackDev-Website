import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="hero"
      class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style="background-color: #0a0a0a;"
    >
      <!-- Tron grid floor -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background-image:
            linear-gradient(rgba(0,255,65,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
        "
      ></div>

      <!-- Radial ambient glow -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(ellipse 80% 50% at 50% 40%, rgba(0,255,65,0.04) 0%, transparent 70%);"
      ></div>

      <!-- Main content -->
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">

        <!-- System init label -->
        <p
          class="mb-4 text-sm tracking-widest"
          style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
        >
          &gt; system.init()
        </p>

        <!-- Heading -->
        <h1
          class="text-5xl sm:text-6xl md:text-7xl font-black tracking-wider mb-6 uppercase leading-tight"
          style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
        >
          HUMBERTO
          <span
            style="
              color: #00ff41;
              text-shadow: 0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.2);
              display: inline-block;
            "
          >LÓPEZ</span>
        </h1>

        <!-- Typewriter row -->
        <div
          class="h-10 flex items-center justify-center mb-8 gap-0"
          aria-live="polite"
        >
          <span
            class="text-xl sm:text-2xl"
            style="font-family: 'JetBrains Mono', monospace; color: #00e5ff;"
          >{{ displayText }}</span>
          <span
            class="inline-block w-0.5 h-6 ml-0.5 align-middle"
            style="background-color: #00e5ff; animation: blink 1s step-end infinite;"
          ></span>
        </div>

        <!-- Description -->
        <p
          class="max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10"
          style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
        >
          Construyendo experiencias digitales de alta performance con tecnologías modernas.
          Apasionado por el código limpio, la arquitectura escalable y el diseño elegante.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            (click)="scrollTo('contact')"
            class="px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style="
              font-family: 'Orbitron', sans-serif;
              background-color: #00ff41;
              color: #0a0a0a;
              border: 2px solid #00ff41;
              box-shadow: 0 0 20px rgba(0,255,65,0.3);
            "
            onmouseenter="this.style.boxShadow='0 0 35px rgba(0,255,65,0.6)'"
            onmouseleave="this.style.boxShadow='0 0 20px rgba(0,255,65,0.3)'"
          >
            CONTACTAR
          </button>
          <button
            (click)="scrollTo('projects')"
            class="px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style="
              font-family: 'Orbitron', sans-serif;
              color: #00ff41;
              border: 2px solid #00ff41;
              background: transparent;
            "
            onmouseenter="this.style.backgroundColor='rgba(0,255,65,0.08)'"
            onmouseleave="this.style.backgroundColor='transparent'"
          >
            PROYECTOS
          </button>
        </div>

        <!-- Social icons -->
        <div class="flex items-center justify-center gap-8">

          <!-- GitHub -->
          <a
            href="https://github.com/Betunx"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-all duration-300 hover:scale-125"
            style="color: #8b949e;"
            onmouseenter="this.style.color='#00ff41'"
            onmouseleave="this.style.color='#8b949e'"
            aria-label="GitHub"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/humbertolpz"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-all duration-300 hover:scale-125"
            style="color: #8b949e;"
            onmouseenter="this.style.color='#00e5ff'"
            onmouseleave="this.style.color='#8b949e'"
            aria-label="LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <!-- Email -->
          <a
            href="mailto:contact@humbertolpz.dev"
            class="transition-all duration-300 hover:scale-125"
            style="color: #8b949e;"
            onmouseenter="this.style.color='#00e5ff'"
            onmouseleave="this.style.color='#8b949e'"
            aria-label="Email"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Scroll chevron -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        (click)="scrollTo('about')"
        style="color: #00ff41; opacity: 0.7; animation: bounce 2s ease-in-out infinite;"
        title="Scroll down"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(8px); }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly roles = [
    'Full Stack Developer',
    'Angular Specialist',
    'React Engineer',
    'Node.js Developer',
    'Cloud Architect',
  ];

  displayText = '';

  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typewriterTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
  }

  private tick(): void {
    const current = this.roles[this.roleIndex];

    if (!this.isDeleting) {
      this.displayText = current.substring(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === current.length) {
        this.isDeleting = true;
        this.typewriterTimeout = setTimeout(() => this.tick(), 1800);
        return;
      }
    } else {
      this.displayText = current.substring(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.typewriterTimeout = setTimeout(() => this.tick(), 400);
        return;
      }
    }

    this.typewriterTimeout = setTimeout(() => this.tick(), this.isDeleting ? 50 : 100);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
