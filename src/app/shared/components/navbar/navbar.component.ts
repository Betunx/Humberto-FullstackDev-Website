import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-content">
          <a href="#hero" class="navbar-logo">HL</a>
          
          <div class="navbar-menu" [class.active]="menuOpen">
            <a href="#hero" (click)="closeMenu()">Inicio</a>
            <a href="#about" (click)="closeMenu()">Sobre Mí</a>
            <a href="#projects" (click)="closeMenu()">Proyectos</a>
            <a href="#contact" (click)="closeMenu()">Contacto</a>
          </div>
          
          <div class="navbar-actions">
            <button 
              class="theme-toggle" 
              (click)="toggleTheme()"
              [attr.aria-label]="(themeService.darkMode$ | async) ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
              <span class="theme-icon">{{ (themeService.darkMode$ | async) ? '☀️' : '🌙' }}</span>
            </button>
            
            <button 
              class="hamburger" 
              (click)="toggleMenu()"
              [class.active]="menuOpen"
              aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: var(--bg-primary);
      border-bottom: 1px solid var(--border);
      z-index: 1000;
      transition: background-color 0.3s ease;
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

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    @media (min-width: 768px) {
      .navbar-content { padding: 1.5rem 0; }
    }

    .navbar-logo {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .navbar-logo:hover {
      color: var(--accent);
    }

    @media (min-width: 768px) {
      .navbar-logo { font-size: 2rem; }
    }

    .navbar-menu {
      display: none;
    }

    @media (min-width: 1024px) {
      .navbar-menu {
        display: flex;
        gap: 2rem;
        align-items: center;
      }
    }

    .navbar-menu a {
      font-family: 'Georgia', serif;
      font-size: 1rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.15s ease;
      position: relative;
    }

    .navbar-menu a:hover {
      color: var(--accent);
    }

    .navbar-menu a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--accent);
      transition: width 0.3s ease;
    }

    .navbar-menu a:hover::after {
      width: 100%;
    }

    @media (max-width: 1023px) {
      .navbar-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background-color: var(--bg-primary);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid var(--border);
        transform: translateY(-100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }

      .navbar-menu.active {
        display: flex;
        transform: translateY(0);
        opacity: 1;
      }
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .theme-toggle {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s ease;
    }

    .theme-toggle:hover {
      transform: scale(1.1);
    }

    .theme-icon {
      font-size: 1.25rem;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }

    @media (min-width: 1024px) {
      .hamburger { display: none; }
    }

    .hamburger span {
      width: 24px;
      height: 2px;
      background-color: var(--text-primary);
      transition: all 0.3s ease;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `]
})
export class NavbarComponent {
  menuOpen = false;

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
