import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
  signal,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService, Difficulty, GameStatus, Cell } from '@services/game-state.service';
import { ThemeService } from '@core/services/theme.service';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private particles: Particle[] = [];
  private cellSize = 32;
  private padding = 2;

  readonly gameService = inject(GameStateService);
  readonly themeService = inject(ThemeService);

  // UI state
  showParticles = signal(false);
  canvasWidth = signal(0);
  canvasHeight = signal(0);

  // Theme colors
  private colors = {
    light: {
      cellHidden: '#e8ecf1',
      cellRevealed: '#f5f7fa',
      cellHover: '#d1d5db',
      border: '#cbd5e1',
      mine: '#ef4444',
      flag: '#f59e0b',
      text: ['#3b82f6', '#22c55e', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#000000', '#6b7280'],
      accent: '#00a896'
    },
    dark: {
      cellHidden: '#1e2735',
      cellRevealed: '#151b28',
      cellHover: '#2d3748',
      border: '#374151',
      mine: '#dc2626',
      flag: '#fbbf24',
      text: ['#60a5fa', '#4ade80', '#f87171', '#a78bfa', '#f472b6', '#22d3ee', '#e5e7eb', '#9ca3af'],
      accent: '#00d4aa'
    }
  };

  constructor() {
    // React to board changes
    effect(() => {
      const board = this.gameService.board();
      if (board.length > 0) {
        this.updateCanvasSize();
        this.render();
      }
    });

    // React to game status for particles
    effect(() => {
      const status = this.gameService.gameStatus();
      if (status === 'won') {
        this.triggerWinParticles();
      } else if (status === 'lost') {
        this.triggerLoseParticles();
      }
    });

    // React to theme changes
    effect(() => {
      this.themeService.isDarkMode;
      this.render();
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.updateCanvasSize();
    this.startGameLoop();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private updateCanvasSize(): void {
    const config = this.gameService.config();
    const width = config.cols * this.cellSize;
    const height = config.rows * this.cellSize;
    this.canvasWidth.set(width);
    this.canvasHeight.set(height);

    const canvas = this.canvasRef.nativeElement;
    canvas.width = width;
    canvas.height = height;
  }

  private getColors() {
    return this.themeService.isDarkMode ? this.colors.dark : this.colors.light;
  }

  private startGameLoop(): void {
    const loop = () => {
      if (this.particles.length > 0) {
        this.updateParticles();
        this.render();
      }
      this.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  private render(): void {
    if (!this.ctx) return;

    const board = this.gameService.board();
    const colors = this.getColors();
    const canvas = this.canvasRef.nativeElement;

    // Clear canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cells
    for (const row of board) {
      for (const cell of row) {
        this.drawCell(cell, colors);
      }
    }

    // Draw particles
    this.drawParticles();
  }

  private drawCell(cell: Cell, colors: typeof this.colors.light): void {
    const x = cell.col * this.cellSize;
    const y = cell.row * this.cellSize;
    const size = this.cellSize - this.padding;

    // Cell background
    this.ctx.fillStyle = cell.isRevealed ? colors.cellRevealed : colors.cellHidden;
    this.ctx.fillRect(x + this.padding / 2, y + this.padding / 2, size, size);

    // Cell border
    this.ctx.strokeStyle = colors.border;
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x + this.padding / 2, y + this.padding / 2, size, size);

    // Cell content
    if (cell.isRevealed) {
      if (cell.isMine) {
        this.drawMine(x, y, colors);
      } else if (cell.neighborMines > 0) {
        this.drawNumber(x, y, cell.neighborMines, colors);
      }
    } else if (cell.isFlagged) {
      this.drawFlag(x, y, colors);
    } else {
      // 3D effect for hidden cells
      this.draw3DEffect(x, y, size);
    }
  }

  private draw3DEffect(x: number, y: number, size: number): void {
    const colors = this.getColors();
    const offset = this.padding / 2;

    // Highlight (top-left)
    this.ctx.strokeStyle = this.themeService.isDarkMode ? '#374151' : '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x + offset, y + offset + size);
    this.ctx.lineTo(x + offset, y + offset);
    this.ctx.lineTo(x + offset + size, y + offset);
    this.ctx.stroke();

    // Shadow (bottom-right)
    this.ctx.strokeStyle = this.themeService.isDarkMode ? '#0a0f1a' : '#9ca3af';
    this.ctx.beginPath();
    this.ctx.moveTo(x + offset, y + offset + size);
    this.ctx.lineTo(x + offset + size, y + offset + size);
    this.ctx.lineTo(x + offset + size, y + offset);
    this.ctx.stroke();
  }

  private drawMine(x: number, y: number, colors: typeof this.colors.light): void {
    const centerX = x + this.cellSize / 2;
    const centerY = y + this.cellSize / 2;
    const radius = this.cellSize / 4;

    // Mine body
    this.ctx.fillStyle = colors.mine;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Spikes
    this.ctx.strokeStyle = colors.mine;
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
      this.ctx.lineTo(centerX + Math.cos(angle) * (radius + 4), centerY + Math.sin(angle) * (radius + 4));
      this.ctx.stroke();
    }

    // Shine
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(centerX - 2, centerY - 2, 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawFlag(x: number, y: number, colors: typeof this.colors.light): void {
    const centerX = x + this.cellSize / 2;
    const baseY = y + this.cellSize - 8;

    // Pole
    this.ctx.strokeStyle = this.themeService.isDarkMode ? '#9ca3af' : '#374151';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, y + 6);
    this.ctx.lineTo(centerX, baseY);
    this.ctx.stroke();

    // Flag
    this.ctx.fillStyle = colors.flag;
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, y + 6);
    this.ctx.lineTo(centerX + 10, y + 12);
    this.ctx.lineTo(centerX, y + 18);
    this.ctx.closePath();
    this.ctx.fill();

    // Base
    this.ctx.fillStyle = this.themeService.isDarkMode ? '#6b7280' : '#374151';
    this.ctx.fillRect(centerX - 5, baseY, 10, 3);
  }

  private drawNumber(x: number, y: number, num: number, colors: typeof this.colors.light): void {
    this.ctx.font = 'bold 18px "JetBrains Mono", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = colors.text[num - 1];
    this.ctx.fillText(num.toString(), x + this.cellSize / 2, y + this.cellSize / 2 + 1);
  }

  // Particle effects
  private triggerWinParticles(): void {
    this.showParticles.set(true);
    const canvas = this.canvasRef.nativeElement;
    const colors = ['#00d4aa', '#00f5c4', '#22d3ee', '#fbbf24', '#a78bfa'];

    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 15 - 5,
        life: 1,
        maxLife: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 2
      });
    }
  }

  private triggerLoseParticles(): void {
    this.showParticles.set(true);
    const board = this.gameService.board();

    // Explosion from each mine
    for (const row of board) {
      for (const cell of row) {
        if (cell.isMine) {
          const x = cell.col * this.cellSize + this.cellSize / 2;
          const y = cell.row * this.cellSize + this.cellSize / 2;

          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            this.particles.push({
              x,
              y,
              vx: Math.cos(angle) * (Math.random() * 4 + 2),
              vy: Math.sin(angle) * (Math.random() * 4 + 2),
              life: 1,
              maxLife: 1,
              color: Math.random() > 0.5 ? '#ef4444' : '#fbbf24',
              size: Math.random() * 4 + 2
            });
          }
        }
      }
    }
  }

  private updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.life -= 0.02;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length === 0) {
      this.showParticles.set(false);
    }
  }

  private drawParticles(): void {
    for (const p of this.particles) {
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }

  // Event handlers
  onCanvasClick(event: MouseEvent): void {
    const { row, col } = this.getClickedCell(event);
    this.gameService.revealCell(row, col);
  }

  onCanvasRightClick(event: MouseEvent): void {
    event.preventDefault();
    const { row, col } = this.getClickedCell(event);
    this.gameService.toggleFlag(row, col);
  }

  onCanvasDoubleClick(event: MouseEvent): void {
    const { row, col } = this.getClickedCell(event);
    this.gameService.chordClick(row, col);
  }

  private getClickedCell(event: MouseEvent): { row: number; col: number } {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    return {
      col: Math.floor(x / this.cellSize),
      row: Math.floor(y / this.cellSize)
    };
  }

  // Touch support for mobile
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    // Handled by click event conversion
  }

  private longPressTimeout: ReturnType<typeof setTimeout> | null = null;
  private touchStartPos = { x: 0, y: 0 };

  onTouchStartCanvas(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    this.touchStartPos = { x: touch.clientX, y: touch.clientY };

    // Long press for flag
    this.longPressTimeout = setTimeout(() => {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;

      const col = Math.floor(x / this.cellSize);
      const row = Math.floor(y / this.cellSize);

      this.gameService.toggleFlag(row, col);
      this.longPressTimeout = null;
    }, 500);
  }

  onTouchEndCanvas(event: TouchEvent): void {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);

      // It was a tap, reveal cell
      const touch = event.changedTouches[0];
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;

      const col = Math.floor(x / this.cellSize);
      const row = Math.floor(y / this.cellSize);

      this.gameService.revealCell(row, col);
      this.longPressTimeout = null;
    }
  }

  onTouchMoveCanvas(event: TouchEvent): void {
    // Cancel long press if finger moves
    if (this.longPressTimeout) {
      const touch = event.touches[0];
      const dx = touch.clientX - this.touchStartPos.x;
      const dy = touch.clientY - this.touchStartPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > 10) {
        clearTimeout(this.longPressTimeout);
        this.longPressTimeout = null;
      }
    }
  }

  // UI methods
  selectDifficulty(difficulty: Difficulty): void {
    this.gameService.setDifficulty(difficulty);
    this.particles = [];
  }

  restartGame(): void {
    this.gameService.initializeGame();
    this.particles = [];
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getStatusEmoji(): string {
    const status = this.gameService.gameStatus();
    switch (status) {
      case 'won': return '😎';
      case 'lost': return '💀';
      case 'playing': return '🙂';
      default: return '😴';
    }
  }

  getDifficultyKeys(): Difficulty[] {
    return ['easy', 'medium', 'hard'];
  }
}
