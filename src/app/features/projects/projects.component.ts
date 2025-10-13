import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects section">
      <div class="container">
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
      padding: 3rem 0;
    }

    @media (min-width: 768px) {
      .projects { padding: 4rem 0; }
    }

    @media (min-width: 1024px) {
      .projects { padding: 6rem 0; }
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

    .section-title {
      text-align: center;
      margin-bottom: 4rem;
      color: var(--text-primary);
    }

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
      font-family: 'Playfair Display', serif;
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
