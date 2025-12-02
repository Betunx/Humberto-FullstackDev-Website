import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section id="hero" class="hero">
      <!-- Top Wave -->
      <div class="wave wave-top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="var(--accent)" fill-opacity="0.15" d="M0,192L0,96L55.4,96L55.4,224L110.8,224L110.8,288L166.2,288L166.2,32L221.5,32L221.5,128L276.9,128L276.9,32L332.3,32L332.3,64L387.7,64L387.7,256L443.1,256L443.1,32L498.5,32L498.5,256L553.8,256L553.8,320L609.2,320L609.2,192L664.6,192L664.6,320L720,320L720,96L775.4,96L775.4,256L830.8,256L830.8,0L886.2,0L886.2,224L941.5,224L941.5,288L996.9,288L996.9,96L1052.3,96L1052.3,224L1107.7,224L1107.7,96L1163.1,96L1163.1,32L1218.5,32L1218.5,0L1273.8,0L1273.8,192L1329.2,192L1329.2,256L1384.6,256L1384.6,32L1440,32L1440,0L1384.6,0L1384.6,0L1329.2,0L1329.2,0L1273.8,0L1273.8,0L1218.5,0L1218.5,0L1163.1,0L1163.1,0L1107.7,0L1107.7,0L1052.3,0L1052.3,0L996.9,0L996.9,0L941.5,0L941.5,0L886.2,0L886.2,0L830.8,0L830.8,0L775.4,0L775.4,0L720,0L720,0L664.6,0L664.6,0L609.2,0L609.2,0L553.8,0L553.8,0L498.5,0L498.5,0L443.1,0L443.1,0L387.7,0L387.7,0L332.3,0L332.3,0L276.9,0L276.9,0L221.5,0L221.5,0L166.2,0L166.2,0L110.8,0L110.8,0L55.4,0L55.4,0L0,0L0,0Z"></path>
        </svg>
      </div>

      <div class="container">
        <div class="hero-content fade-in">
          <h1 class="hero-title">Humberto López</h1>
          <h2 class="hero-subtitle">Full Stack Developer</h2>
          <p class="hero-tagline">"Transformando ideas en soluciones digitales"</p>

          <div class="hero-actions">
            <a routerLink="/projects" class="btn btn-primary">Ver Proyectos</a>
            <a routerLink="/contact" class="btn btn-outline">Contactar</a>
          </div>
        </div>
      </div>

      <!-- Bottom Wave -->
      <div class="wave wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="var(--accent)" fill-opacity="0.15" d="M0,192L0,96L55.4,96L55.4,224L110.8,224L110.8,288L166.2,288L166.2,32L221.5,32L221.5,128L276.9,128L276.9,32L332.3,32L332.3,64L387.7,64L387.7,256L443.1,256L443.1,32L498.5,32L498.5,256L553.8,256L553.8,320L609.2,320L609.2,192L664.6,192L664.6,320L720,320L720,96L775.4,96L775.4,256L830.8,256L830.8,0L886.2,0L886.2,224L941.5,224L941.5,288L996.9,288L996.9,96L1052.3,96L1052.3,224L1107.7,224L1107.7,96L1163.1,96L1163.1,32L1218.5,32L1218.5,0L1273.8,0L1273.8,192L1329.2,192L1329.2,256L1384.6,256L1384.6,32L1440,32L1440,320L1384.6,320L1384.6,320L1329.2,320L1329.2,320L1273.8,320L1273.8,320L1218.5,320L1218.5,320L1163.1,320L1163.1,320L1107.7,320L1107.7,320L1052.3,320L1052.3,320L996.9,320L996.9,320L941.5,320L941.5,320L886.2,320L886.2,320L830.8,320L830.8,320L775.4,320L775.4,320L720,320L720,320L664.6,320L664.6,320L609.2,320L609.2,320L553.8,320L553.8,320L498.5,320L498.5,320L443.1,320L443.1,320L387.7,320L387.7,320L332.3,320L332.3,320L276.9,320L276.9,320L221.5,320L221.5,320L166.2,320L166.2,320L110.8,320L110.8,320L55.4,320L55.4,320L0,320L0,320Z"></path>
        </svg>
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
      background: linear-gradient(135deg, #00a896 0%, #008c7a 100%);
      position: relative;
      overflow: hidden;
    }

    .wave {
      position: absolute;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      z-index: 0;
    }

    .wave svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 150px;
    }

    .wave-top {
      top: 0;
      transform: rotate(180deg);
    }

    .wave-bottom {
      bottom: 0;
    }

    .container {
      position: relative;
      z-index: 1;
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
      color: #ffffff;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 1.5rem;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 3rem;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
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

    /* Custom button styles for Hero */
    .hero .btn-primary {
      background-color: #ffffff;
      color: #00a896;
      border-color: #ffffff;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .hero .btn-primary:hover {
      background-color: #f0f0f0;
      border-color: #f0f0f0;
      color: #008c7a;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    .hero .btn-outline {
      background-color: #000000;
      color: #ffffff;
      border-color: #000000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .hero .btn-outline:hover {
      background-color: #1a1a1a;
      border-color: #1a1a1a;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
  `]
})
export class HeroComponent {}
