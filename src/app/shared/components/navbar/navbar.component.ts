import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class]="scrolled
        ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#00ff41]/20 shadow-[0_0_20px_rgba(0,255,65,0.1)]'
        : 'bg-transparent'"
      style="animation: slideDown 0.6s ease-out both;"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <!-- Logo -->
        <button (click)="scrollTo('#hero')" class="flex items-center gap-2 group cursor-pointer border-none bg-transparent">
          <svg class="w-6 h-6 text-[#00ff41] group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all"
               fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span class="text-[#00ff41] tracking-wider font-bold" style="font-family:'Orbitron',sans-serif; font-size:1.1rem;">
            HL<span class="text-[#00e5ff]">_</span>DEV
          </span>
        </button>

        <!-- Desktop links -->
        <div class="hidden md:flex items-center gap-8">
          @for (link of navLinks; track link.href) {
            <button
              (click)="scrollTo(link.href)"
              class="text-[#8b949e] hover:text-[#00ff41] transition-colors cursor-pointer relative group border-none bg-transparent"
              style="font-family:'JetBrains Mono',monospace; font-size:0.85rem; font-weight:500; letter-spacing:0.05em;"
            >
              {{ link.label }}
              <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00ff41] group-hover:w-full transition-all duration-300 shadow-[0_0_4px_#00ff41]"></span>
            </button>
          }
          <button
            (click)="goToCV()"
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer border-none"
            style="font-family:'Orbitron',sans-serif; background-color:#00ff41; color:#0a0a0a; box-shadow:0 0 12px rgba(0,255,65,0.3);"
            onmouseenter="this.style.boxShadow='0 0 24px rgba(0,255,65,0.6)'"
            onmouseleave="this.style.boxShadow='0 0 12px rgba(0,255,65,0.3)'"
          >CV</button>
        </div>

        <!-- Mobile toggle -->
        <button (click)="toggleMenu()" class="md:hidden text-[#00ff41] cursor-pointer border-none bg-transparent">
          @if (mobileOpen) {
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          } @else {
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          }
        </button>
      </div>

      <!-- Mobile menu -->
      @if (mobileOpen) {
        <div class="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#00ff41]/20">
          <div class="flex flex-col px-6 py-4 gap-4">
            @for (link of navLinks; track link.href) {
              <button
                (click)="scrollTo(link.href)"
                class="text-[#8b949e] hover:text-[#00ff41] text-left cursor-pointer border-none bg-transparent"
                style="font-family:'JetBrains Mono',monospace; font-size:0.9rem;"
              >
                <span class="text-[#00ff41] mr-2">&gt;</span>{{ link.label }}
              </button>
            }
            <button
              (click)="goToCV()"
              class="text-left cursor-pointer border-none bg-transparent font-bold"
              style="font-family:'Orbitron',sans-serif; font-size:0.85rem; color:#00ff41;"
            >
              <span style="color:#00e5ff;" class="mr-2">&gt;</span>CV
            </button>
          </div>
        </div>
      }
    </nav>
  `,
  styles: [`
    @keyframes slideDown {
      from { transform: translateY(-80px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class NavbarComponent {
  private readonly router = inject(Router);

  scrolled = false;
  mobileOpen = false;
  navLinks = NAV_LINKS;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  goToCV(): void {
    this.mobileOpen = false;
    this.router.navigate(['/cv']);
  }

  scrollTo(href: string): void {
    this.mobileOpen = false;
    // If on CV page, navigate home first then scroll
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100);
      });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.mobileOpen = !this.mobileOpen;
  }
}
