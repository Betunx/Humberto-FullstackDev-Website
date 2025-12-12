import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinesweeperComponent } from '@components/minesweeper/minesweeper.component';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MinesweeperComponent],
  template: `
    <section id="projects" class="projects section">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">Mis Proyectos</h1>
          <p class="page-description">
            Una colección de proyectos que demuestran mi pasión por crear
            experiencias digitales únicas. Desde aplicaciones web interactivas
            hasta juegos retro, cada proyecto representa un desafío resuelto
            con código limpio y creatividad.
          </p>
        </div>

        <!-- Game & Watch Style Console - Widescreen -->
        <div class="game-showcase">
          <div class="console">
            <!-- Console Top -->
            <div class="console-top">
              <div class="console-screws">
                <span class="screw"></span>
                <span class="screw"></span>
              </div>
              <div class="console-brand">
                <span class="brand-text">GAME & CODE</span>
                <span class="brand-model">MS-2024</span>
              </div>
              <div class="console-screws">
                <span class="screw"></span>
                <span class="screw"></span>
              </div>
            </div>

            <!-- Main Body - Horizontal Layout -->
            <div class="console-body">
              <!-- Left Side - D-Pad -->
              <div class="console-left">
                <div class="dpad-area">
                  <div class="dpad">
                    <span class="dpad-up"></span>
                    <span class="dpad-right"></span>
                    <span class="dpad-down"></span>
                    <span class="dpad-left"></span>
                    <span class="dpad-center"></span>
                  </div>
                  <span class="control-label">+CONTROL PAD</span>
                </div>
                <div class="console-info">
                  <div class="tech-badge-console">Canvas API</div>
                  <div class="tech-badge-console">Angular Signals</div>
                </div>
              </div>

              <!-- Center - Screen -->
              <div class="console-screen-wrapper">
                <div class="screen-bezel">
                  <div class="screen-inner">
                    <app-minesweeper></app-minesweeper>
                  </div>
                </div>
                <div class="screen-label">MINESWEEPER</div>
              </div>

              <!-- Right Side - Action Buttons -->
              <div class="console-right">
                <div class="action-buttons">
                  <div class="action-btn-group">
                    <span class="action-btn btn-b"></span>
                    <span class="action-btn btn-a"></span>
                  </div>
                  <div class="btn-labels">
                    <span>B</span>
                    <span>A</span>
                  </div>
                </div>
                <div class="console-info">
                  <div class="tech-badge-console">TypeScript</div>
                  <div class="tech-badge-console">SCSS</div>
                </div>
              </div>
            </div>

            <!-- Mobile Controls (visible only on mobile) -->
            <div class="mobile-controls">
              <div class="dpad-area">
                <div class="dpad">
                  <span class="dpad-up"></span>
                  <span class="dpad-right"></span>
                  <span class="dpad-down"></span>
                  <span class="dpad-left"></span>
                  <span class="dpad-center"></span>
                </div>
                <span class="control-label">+CONTROL PAD</span>
              </div>

              <div class="console-info">
                <div class="tech-badge-console">Canvas</div>
                <div class="tech-badge-console">Signals</div>
              </div>

              <div class="action-buttons">
                <div class="action-btn-group">
                  <span class="action-btn btn-b"></span>
                  <span class="action-btn btn-a"></span>
                </div>
                <div class="btn-labels">
                  <span>B</span>
                  <span>A</span>
                </div>
              </div>
            </div>

            <!-- Console Footer -->
            <div class="console-footer">
              <div class="speaker-grille">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <span class="footer-text">© Humberto López</span>
              <div class="speaker-grille">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Section -->
        <h2 class="section-title">Proyectos Destacados</h2>

        <div class="projects-grid">
          <div *ngFor="let project of projects" class="project-card">
            <div class="project-image">
              <div class="placeholder-image">{{ project.title.charAt(0) }}</div>
            </div>

            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <div class="project-technologies">
                <span *ngFor="let tech of project.technologies" class="tech-badge">
                  {{ tech }}
                </span>
              </div>

              <div class="project-links">
                <a *ngIf="project.demoUrl" [href]="project.demoUrl" class="project-link" target="_blank">
                  Demo
                </a>
                <a *ngIf="project.githubUrl" [href]="project.githubUrl" class="project-link" target="_blank">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      background-color: var(--bg-primary);
      padding-top: 100px; /* Space for fixed navbar */
    }

    /* Page Header */
    .page-header {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 4rem;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
      position: relative;
    }

    .page-title::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
      margin: 1rem auto 0;
      border-radius: 2px;
    }

    .page-description {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .projects {
        padding-top: 80px;
      }

      .page-header {
        margin-bottom: 3rem;
      }

      .page-title {
        font-size: 2rem;
      }

      .page-description {
        font-size: 1rem;
        padding: 0 1rem;
      }
    }

    /* Game & Watch Console - Widescreen Cinematic */
    .game-showcase {
      display: flex;
      justify-content: center;
      margin-bottom: 4rem;
      padding: 0 1rem;
    }

    .console {
      width: 100%;
      max-width: 1100px;
      background: linear-gradient(145deg, #c9a227 0%, #b8860b 50%, #8b6914 100%);
      border-radius: 20px;
      padding: 16px 24px;
      box-shadow:
        0 15px 50px rgba(0, 0, 0, 0.4),
        inset 0 2px 4px rgba(255, 255, 255, 0.3),
        inset 0 -2px 4px rgba(0, 0, 0, 0.3);
      position: relative;
      border: 3px solid #705a10;
    }

    /* Console Top - Horizontal Layout */
    .console-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding: 0 8px;
    }

    .console-screws {
      display: flex;
      gap: 6px;
    }

    .screw {
      width: 10px;
      height: 10px;
      background: linear-gradient(145deg, #888 0%, #555 100%);
      border-radius: 50%;
      box-shadow:
        inset 0 1px 2px rgba(255,255,255,0.5),
        0 1px 2px rgba(0,0,0,0.5);
      position: relative;
    }

    .screw::after {
      content: '+';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 8px;
      color: #333;
      font-weight: bold;
    }

    .console-brand {
      text-align: center;
    }

    .brand-text {
      display: block;
      font-size: 1rem;
      font-weight: 800;
      color: #4a3c0f;
      text-shadow: 0 1px 0 rgba(255,255,255,0.3);
      letter-spacing: 4px;
      font-family: 'Arial Black', sans-serif;
    }

    .brand-model {
      font-size: 0.6rem;
      color: #5a4a1a;
      letter-spacing: 2px;
    }

    /* Main Console Body - Horizontal */
    .console-body {
      display: flex;
      align-items: stretch;
      gap: 16px;
    }

    /* Left Controls */
    .console-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 10px;
    }

    /* Screen Area - Wide */
    .console-screen-wrapper {
      flex: 1;
      background: #2a2a2a;
      border-radius: 10px;
      padding: 10px;
      box-shadow:
        inset 0 4px 8px rgba(0,0,0,0.5),
        0 2px 4px rgba(255,255,255,0.1);
    }

    .screen-bezel {
      background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
      border-radius: 6px;
      padding: 8px;
      border: 2px solid #333;
      height: 100%;
    }

    .screen-inner {
      background: #9bbc0f;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
    }

    .screen-label {
      text-align: center;
      margin-top: 8px;
      font-size: 0.65rem;
      font-weight: 700;
      color: #888;
      letter-spacing: 3px;
    }

    /* Right Controls */
    .console-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 10px;
    }

    /* Override minesweeper in console */
    .screen-inner ::ng-deep .minesweeper-section {
      background: transparent;
      padding: 0.75rem;
      margin: 0;
      border-radius: 0;
    }

    .screen-inner ::ng-deep .section-header {
      display: none;
    }

    .screen-inner ::ng-deep .game-container {
      padding: 0;
      gap: 0.75rem;
    }

    .screen-inner ::ng-deep .difficulty-selector {
      background: rgba(0,0,0,0.2);
      border-color: rgba(0,0,0,0.3);
    }

    .screen-inner ::ng-deep .difficulty-btn {
      color: #306230;
      font-weight: 600;
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }

    .screen-inner ::ng-deep .difficulty-btn:hover {
      background: rgba(0,0,0,0.1);
    }

    .screen-inner ::ng-deep .difficulty-btn.active {
      background: #306230;
      color: #9bbc0f;
    }

    .screen-inner ::ng-deep .game-stats {
      background: rgba(0,0,0,0.2);
      border-color: rgba(0,0,0,0.3);
      padding: 0.5rem 1rem;
    }

    .screen-inner ::ng-deep .stat-value {
      color: #306230;
    }

    .screen-inner ::ng-deep .restart-btn {
      background: rgba(0,0,0,0.1);
      border-color: rgba(0,0,0,0.3);
      width: 40px;
      height: 40px;
    }

    .screen-inner ::ng-deep .canvas-wrapper {
      background: rgba(0,0,0,0.1);
      border-color: rgba(0,0,0,0.2);
      box-shadow: none;
      padding: 8px;
    }

    .screen-inner ::ng-deep .canvas-wrapper:hover {
      border-color: #306230;
      box-shadow: 0 0 10px rgba(48, 98, 48, 0.3);
    }

    .screen-inner ::ng-deep .game-instructions {
      display: none;
    }

    /* D-Pad */
    .dpad-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .dpad {
      width: 60px;
      height: 60px;
      position: relative;
    }

    .dpad span {
      position: absolute;
      background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
      border-radius: 3px;
      box-shadow:
        inset 0 1px 2px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.5);
    }

    .dpad-up, .dpad-down {
      width: 18px;
      height: 22px;
      left: 50%;
      transform: translateX(-50%);
    }

    .dpad-up { top: 0; border-radius: 4px 4px 0 0; }
    .dpad-down { bottom: 0; border-radius: 0 0 4px 4px; }

    .dpad-left, .dpad-right {
      width: 22px;
      height: 18px;
      top: 50%;
      transform: translateY(-50%);
    }

    .dpad-left { left: 0; border-radius: 4px 0 0 4px; }
    .dpad-right { right: 0; border-radius: 0 4px 4px 0; }

    .dpad-center {
      width: 18px;
      height: 18px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 2px;
    }

    .control-label {
      font-size: 0.5rem;
      color: #4a3c0f;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    /* Tech Badges in Console */
    .console-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      align-items: center;
    }

    .tech-badge-console {
      font-size: 0.55rem;
      padding: 2px 6px;
      background: rgba(0,0,0,0.2);
      color: #4a3c0f;
      border-radius: 3px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    /* Action Buttons */
    .action-buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .action-btn-group {
      display: flex;
      gap: 10px;
    }

    .action-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(145deg, #cc3333 0%, #991111 100%);
      box-shadow:
        inset 0 2px 4px rgba(255,255,255,0.3),
        0 3px 6px rgba(0,0,0,0.4);
    }

    .btn-labels {
      display: flex;
      gap: 22px;
      font-size: 0.55rem;
      font-weight: 800;
      color: #4a3c0f;
    }

    /* Console Footer */
    .console-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding: 0 8px;
    }

    .speaker-grille {
      display: flex;
      gap: 2px;
    }

    .speaker-grille span {
      width: 2px;
      height: 14px;
      background: #4a3c0f;
      border-radius: 2px;
    }

    .footer-text {
      font-size: 0.55rem;
      color: #4a3c0f;
      font-weight: 600;
    }

    /* Responsive Console - Vertical Portrait Mode for Mobile */
    @media (max-width: 768px) {
      .console {
        max-width: 400px;
        padding: 20px;
        border-radius: 24px;
      }

      /* Hide side controls, show bottom controls */
      .console-body {
        flex-direction: column;
        gap: 0;
      }

      .console-left,
      .console-right {
        display: none;
      }

      .console-screen-wrapper {
        margin: 0;
      }

      /* Show vertical controls section */
      .console-footer {
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
        padding: 0;
      }

      .speaker-grille {
        display: none;
      }

      /* Add mobile controls after footer */
      .console::after {
        content: '';
        display: block;
      }
    }

    /* Mobile Portrait - Full Game & Watch vertical style */
    @media (max-width: 600px) {
      .game-showcase {
        padding: 0 0.5rem;
      }

      .console {
        max-width: 100%;
        padding: 16px;
        border-radius: 20px;
      }

      .console-top {
        margin-bottom: 10px;
      }

      .brand-text {
        font-size: 0.9rem;
        letter-spacing: 2px;
      }

      .brand-model {
        font-size: 0.55rem;
      }

      .console-screen-wrapper {
        padding: 10px;
        border-radius: 8px;
      }

      .screen-bezel {
        padding: 8px;
      }

      .screen-label {
        margin-top: 6px;
        font-size: 0.6rem;
      }

      .console-footer {
        flex-direction: row;
        justify-content: space-between;
        margin-top: 15px;
      }

      .speaker-grille {
        display: flex;
      }

      .footer-text {
        font-size: 0.5rem;
      }
    }

    /* Show mobile controls for touch */
    .mobile-controls {
      display: none;
    }

    @media (max-width: 768px) {
      .mobile-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        margin-top: 10px;
      }

      .mobile-controls .dpad-area {
        transform: scale(0.9);
      }

      .mobile-controls .action-buttons {
        transform: scale(0.9);
      }

      .mobile-controls .console-info {
        flex-direction: row;
        gap: 6px;
      }
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @media (min-width: 768px) {
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 1024px) {
      .projects-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .project-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .project-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--accent) 0%, var(--text-primary) 100%);
      color: white;
      font-size: 3rem;
      font-weight: 700;
    }

    .project-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .project-title {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .project-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      flex: 1;
    }

    @media (min-width: 768px) {
      .project-description { font-size: 1rem; }
    }

    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-badge {
      padding: 4px 8px;
      background-color: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 0.25rem;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .project-link {
      padding: 0.5rem 1rem;
      background-color: var(--accent);
      color: white;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      transition: background-color 0.15s ease;
      text-decoration: none;
    }

    .project-link:hover {
      background-color: var(--text-primary);
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'Plataforma completa de comercio electrónico con gestión de inventario, carrito de compras y pasarela de pagos.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Manager App',
      description: 'Aplicación de gestión de tareas con funcionalidades de colaboración en equipo y notificaciones en tiempo real.',
      technologies: ['React', 'Firebase', 'TypeScript'],
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'Dashboard meteorológico con visualización de datos en tiempo real y predicciones extendidas.',
      technologies: ['Angular', 'APIs REST', 'Chart.js'],
      demoUrl: '#',
      githubUrl: '#'
    }
  ];
}
