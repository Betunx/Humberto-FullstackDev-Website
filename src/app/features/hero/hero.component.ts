import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="hero">
      <div class="container">
        <div class="hero-content fade-in">
          <h1 class="hero-title">Humberto López</h1>
          <h2 class="hero-subtitle">Desarrollador Full Stack</h2>
          <p class="hero-tagline">"Transformando ideas en soluciones digitales"</p>
          
          <div class="hero-actions">
            <a href="#projects" class="btn btn-primary">Ver Proyectos</a>
            <a href="#contact" class="btn btn-outline">Contactar</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 60px;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    }
    
    @media (min-width: 768px) {
      .hero { padding-top: 80px; }
    }

    .hero-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .hero-title {
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--accent);
      margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) {
      .hero-subtitle { font-size: 1.5rem; }
    }

    @media (min-width: 1024px) {
      .hero-subtitle { font-size: 2rem; }
    }

    .hero-tagline {
      font-size: 1.125rem;
      font-style: italic;
      color: var(--text-secondary);
      margin-bottom: 3rem;
    }

    @media (min-width: 768px) {
      .hero-tagline { font-size: 1.25rem; }
    }

    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .hero-actions {
        flex-direction: row;
        justify-content: center;
        gap: 1.5rem;
      }
    }
  `]
})
export class HeroComponent {}
