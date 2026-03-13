import {
  ChangeDetectionStrategy, Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { InViewDirective } from '@core/directives/in-view.directive';

interface Skill {
  name: string;
  level: number;
}

interface Category {
  id: string;
  label: string;
  color: string;
  skills: Skill[];
  animated: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skills',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section
      id="skills"
      #skillsSection
      class="py-32 px-6"
      style="background-color: #0a0a0a;"
    >
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div
          appInView
          [inViewThreshold]="0.1"
          class="fade-up mb-16"
        >
          <p
            class="text-sm tracking-widest mb-3"
            style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
          >02. // TECH_STACK</p>
          <h2
            class="text-3xl sm:text-4xl font-bold"
            style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
          >Habilidades &amp; Tecnologías</h2>
          <div class="mt-4 h-px w-24" style="background: linear-gradient(90deg, #00ff41, transparent);"></div>
        </div>

        <!-- Category cards grid -->
        <div class="grid md:grid-cols-2 gap-8">
          @for (cat of categories; track cat.id; let i = $index) {
            <div
              appInView
              [inViewThreshold]="0.15"
              [inViewDelay]="i * 100"
              class="fade-up"
            >
              <div
                class="p-6 rounded-lg border h-full"
                style="background-color: #0d1117; border-color: rgba(255,255,255,0.06);"
              >
                <!-- Card header -->
                <div class="flex items-center gap-3 mb-6">
                  <span
                    class="w-3 h-3 rounded-full flex-shrink-0"
                    [style.backgroundColor]="cat.color"
                    [style.boxShadow]="'0 0 8px ' + cat.color"
                  ></span>
                  <h3
                    class="font-bold text-sm tracking-widest uppercase"
                    style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                  >{{ cat.label }}</h3>
                </div>

                <!-- Skill bars -->
                <div class="space-y-4">
                  @for (skill of cat.skills; track skill.name) {
                    <div>
                      <div class="flex justify-between items-center mb-1.5">
                        <span
                          class="text-xs"
                          style="font-family: 'JetBrains Mono', monospace; color: #c9d1d9;"
                        >{{ skill.name }}</span>
                        <span
                          class="text-xs font-bold"
                          [style.color]="cat.color"
                          style="font-family: 'JetBrains Mono', monospace;"
                        >{{ skill.level }}%</span>
                      </div>
                      <!-- Track -->
                      <div
                        class="h-1.5 rounded-full w-full overflow-hidden"
                        style="background-color: rgba(255,255,255,0.06);"
                      >
                        <!-- Fill -->
                        <div
                          class="h-full rounded-full skill-bar-fill"
                          [style.width]="cat.animated ? skill.level + '%' : '0%'"
                          [style.backgroundColor]="cat.color"
                          [style.boxShadow]="cat.animated ? '0 0 8px ' + cat.color : 'none'"
                          [style.transition]="'width 1.2s ease-out'"
                        ></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: []
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('skillsSection') skillsSectionRef!: ElementRef<HTMLElement>;

  categories: Category[] = [
    {
      id: 'frontend',
      label: 'Frontend',
      color: '#00ff41',
      animated: false,
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'React', level: 80 },
        { name: 'Vue.js / Next.js', level: 70 },
        { name: 'TypeScript / ES6+', level: 92 },
        { name: 'HTML5 / CSS3 / SCSS', level: 95 },
        { name: 'Tailwind CSS / Bootstrap', level: 90 },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      color: '#00e5ff',
      animated: false,
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 85 },
        { name: 'RESTful APIs / JWT', level: 88 },
      ],
    },
    {
      id: 'data',
      label: 'Data & Tools',
      color: '#a855f7',
      animated: false,
      skills: [
        { name: 'MongoDB', level: 78 },
        { name: 'MySQL', level: 75 },
        { name: 'Webpack / Vite / Babel', level: 82 },
      ],
    },
    {
      id: 'devops',
      label: 'DevOps & QA',
      color: '#f59e0b',
      animated: false,
      skills: [
        { name: 'Docker', level: 78 },
        { name: 'AWS / Vercel', level: 75 },
        { name: 'Git / GitHub', level: 92 },
        { name: 'Jest / Jasmine / Postman', level: 76 },
      ],
    },
  ];

  private sectionObserver!: IntersectionObserver;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger each category's animation
            this.categories.forEach((cat, idx) => {
              setTimeout(() => {
                cat.animated = true;
              }, idx * 150);
            });
            this.sectionObserver.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.skillsSectionRef?.nativeElement) {
      this.sectionObserver.observe(this.skillsSectionRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }
}
