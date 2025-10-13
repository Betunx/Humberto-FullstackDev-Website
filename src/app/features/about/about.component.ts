import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about section">
      <div class="container">
        <div class="about-content">
          <h2 class="section-title">Desarrollador. Músico. Solucionador de problemas.</h2>
          
          <div class="about-text">
            <p>
              Siempre he sido alguien que busca patrones: ya sea en una melodía, 
              en una estrategia deportiva o en miles de líneas de código. Esta 
              habilidad me permite encontrar soluciones creativas donde otros ven 
              solo complejidad.
            </p>
            
            <p>
              Como desarrollador Full Stack, combino pensamiento analítico con 
              creatividad práctica. Disfruto tanto los desafíos individuales como 
              la colaboración en equipo, siempre manteniendo la calma y la comunicación 
              clara incluso bajo presión.
            </p>
            
            <p>
              Mi filosofía es simple: código limpio, soluciones elegantes y equilibrio 
              entre mente y cuerpo. Los mejores resultados vienen de estar en tu mejor 
              versión, dentro y fuera de la pantalla.
            </p>
          </div>
          
          <div class="tech-stack">
            <h3>Stack Tecnológico</h3>
            <div class="tech-grid">
              <span class="tech-item">Angular</span>
              <span class="tech-item">React</span>
              <span class="tech-item">Node.js</span>
              <span class="tech-item">TypeScript</span>
              <span class="tech-item">MongoDB</span>
              <span class="tech-item">PostgreSQL</span>
              <span class="tech-item">AWS</span>
              <span class="tech-item">Docker</span>
            </div>
          </div>
          
          <div class="about-actions">
            <button class="btn btn-primary">Descargar CV (ES)</button>
            <button class="btn btn-outline">Descargar CV (EN)</button>
          </div>
          
          <p class="about-cta">¿Listo para trabajar juntos?</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background-color: var(--bg-secondary);
      padding: 3rem 0;
    }

    @media (min-width: 768px) {
      .about { padding: 4rem 0; }
    }

    @media (min-width: 1024px) {
      .about { padding: 6rem 0; }
    }

    .container {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    @media (min-width: 768px) {
      .container { padding: 0 2rem; }
    }

    @media (min-width: 1024px) {
      .container { padding: 0 3rem; }
    }

    .about-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      margin-bottom: 3rem;
      color: var(--text-primary);
    }

    @media (min-width: 768px) {
      .section-title { margin-bottom: 4rem; }
    }

    .about-text {
      margin-bottom: 3rem;
    }

    .about-text p {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) {
      .about-text p {
        font-size: 1.125rem;
        line-height: 1.8;
      }
    }

    .about-text p:last-child {
      margin-bottom: 0;
    }

    .tech-stack {
      margin-bottom: 3rem;
    }

    .tech-stack h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
      text-align: center;
    }

    @media (min-width: 768px) {
      .tech-stack h3 { font-size: 1.5rem; }
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .tech-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }
    }

    .tech-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 1.5rem;
      background-color: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      font-family: 'Georgia', serif;
      font-size: 0.875rem;
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    .tech-item:hover {
      background-color: var(--accent);
      color: white;
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    @media (min-width: 768px) {
      .tech-item { font-size: 1rem; }
    }

    .about-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 768px) {
      .about-actions {
        flex-direction: row;
        justify-content: center;
        gap: 1.5rem;
      }
    }

    .about-cta {
      text-align: center;
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 0;
    }

    @media (min-width: 768px) {
      .about-cta { font-size: 1.5rem; }
    }
  `]
})
export class AboutComponent {}
