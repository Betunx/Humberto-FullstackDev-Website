import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-matrix-rain',
  standalone: true,
  template: `<canvas #canvas class="fixed inset-0 pointer-events-none z-0" style="opacity: 0.4; transition: opacity 0.8s ease;"></canvas>`,
})
export class MatrixRainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private interval: ReturnType<typeof setInterval> | null = null;
  private resizeListener!: () => void;
  private scrollListener!: () => void;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    this.resizeListener = resize;
    window.addEventListener('resize', this.resizeListener);

    // Fade matrix rain to subtle after hero section
    this.scrollListener = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const fadeStart = heroHeight * 0.5;
      const fadeEnd = heroHeight * 1.1;
      if (scrollY <= fadeStart) {
        canvas.style.opacity = '0.4';
      } else if (scrollY >= fadeEnd) {
        canvas.style.opacity = '0.06';
      } else {
        const t = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        canvas.style.opacity = String(0.4 - t * 0.34);
      }
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });

    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[];=+-*&^%$#@!';
    const charArr = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns)
      .fill(1)
      .map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else if (Math.random() > 0.9) {
          ctx.fillStyle = '#00ff41';
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${0.1 + Math.random() * 0.3})`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    this.interval = setInterval(draw, 45);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('scroll', this.scrollListener);
  }
}