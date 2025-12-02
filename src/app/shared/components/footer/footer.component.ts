import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <!-- Wave decoration -->
      <div class="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="var(--accent)" fill-opacity="0.2" d="M0,192L0,96L55.4,96L55.4,224L110.8,224L110.8,288L166.2,288L166.2,32L221.5,32L221.5,128L276.9,128L276.9,32L332.3,32L332.3,64L387.7,64L387.7,256L443.1,256L443.1,32L498.5,32L498.5,256L553.8,256L553.8,320L609.2,320L609.2,192L664.6,192L664.6,320L720,320L720,96L775.4,96L775.4,256L830.8,256L830.8,0L886.2,0L886.2,224L941.5,224L941.5,288L996.9,288L996.9,96L1052.3,96L1052.3,224L1107.7,224L1107.7,96L1163.1,96L1163.1,32L1218.5,32L1218.5,0L1273.8,0L1273.8,192L1329.2,192L1329.2,256L1384.6,256L1384.6,32L1440,32L1440,0L1384.6,0L1384.6,0L1329.2,0L1329.2,0L1273.8,0L1273.8,0L1218.5,0L1218.5,0L1163.1,0L1163.1,0L1107.7,0L1107.7,0L1052.3,0L1052.3,0L996.9,0L996.9,0L941.5,0L941.5,0L886.2,0L886.2,0L830.8,0L830.8,0L775.4,0L775.4,0L720,0L720,0L664.6,0L664.6,0L609.2,0L609.2,0L553.8,0L553.8,0L498.5,0L498.5,0L443.1,0L443.1,0L387.7,0L387.7,0L332.3,0L332.3,0L276.9,0L276.9,0L221.5,0L221.5,0L166.2,0L166.2,0L110.8,0L110.8,0L55.4,0L55.4,0L0,0L0,0Z"></path>
        </svg>
      </div>

      <div class="footer-content">
        <div class="container">
          <div class="footer-grid">
            <!-- About Section -->
            <div class="footer-section">
              <h3 class="footer-title">Humberto López</h3>
              <p class="footer-text">Full Stack Developer especializado en crear soluciones digitales innovadoras con tecnologías modernas.</p>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
              <h4 class="footer-subtitle">Enlaces Rápidos</h4>
              <ul class="footer-links">
                <li><a routerLink="/">Home</a></li>
                <li><a routerLink="/about">About</a></li>
                <li><a routerLink="/projects">Projects</a></li>
                <li><a routerLink="/resume">My Resume</a></li>
                <li><a routerLink="/contact">Contact</a></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div class="footer-section">
              <h4 class="footer-subtitle">Contacto</h4>
              <ul class="footer-contact">
                <li>📧 humbertolpzc.work&#64;gmail.com</li>
                <li>📍 Hermosillo, Sonora, MX</li>
                <li>💼 <a href="https://linkedin.com/in/humberto-lópez-435b77216" target="_blank" rel="noopener">LinkedIn</a></li>
                <li>💻 <a href="https://github.com/Betunx" target="_blank" rel="noopener">GitHub</a></li>
              </ul>
            </div>

            <!-- Tech Stack -->
            <div class="footer-section">
              <h4 class="footer-subtitle">Tech Stack</h4>
              <div class="footer-tech">
                <span class="tech-badge">Angular</span>
                <span class="tech-badge">React</span>
                <span class="tech-badge">Node.js</span>
                <span class="tech-badge">TypeScript</span>
                <span class="tech-badge">MongoDB</span>
                <span class="tech-badge">Docker</span>
              </div>
            </div>
          </div>

          <!-- Copyright -->
          <div class="footer-bottom">
            <p>&copy; {{ currentYear }} Humberto López. Todos los derechos reservados.</p>
            <p class="footer-credits">Desarrollado con Angular & 💚</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative;
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      margin-top: auto;
    }

    .footer-wave {
      position: relative;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }

    .footer-wave svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 100px;
      transform: rotate(180deg);
    }

    @media (min-width: 768px) {
      .footer-wave svg {
        height: 150px;
      }
    }

    .footer-content {
      padding: 3rem 0 1rem;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .footer-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
      }
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .footer-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }

    .footer-subtitle {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .footer-text {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.6;
    }

    .footer-links,
    .footer-contact {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer-links a,
    .footer-contact a {
      color: var(--text-secondary);
      font-size: 0.875rem;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .footer-links a:hover,
    .footer-contact a:hover {
      color: var(--accent);
      transform: translateX(5px);
    }

    .footer-contact li {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .footer-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: var(--bg-tertiary);
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 4px;
      border: 1px solid var(--accent);
      transition: all 0.3s ease;
    }

    .tech-badge:hover {
      background-color: var(--accent);
      color: white;
      transform: translateY(-2px);
    }

    .footer-bottom {
      border-top: 1px solid var(--border);
      padding-top: 1.5rem;
      text-align: center;
    }

    .footer-bottom p {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin: 0.5rem 0;
    }

    .footer-credits {
      font-style: italic;
      opacity: 0.8;
    }

    /* Dark mode enhancements */
    body.dark-mode .tech-badge {
      box-shadow: 0 0 10px var(--glow);
    }

    body.dark-mode .tech-badge:hover {
      box-shadow: 0 0 20px var(--accent-secondary);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
