import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@features/hero/hero.component';
import { AboutComponent } from '@features/about/about.component';
import { SkillsComponent } from '@features/skills/skills.component';
import { ExperienceComponent } from '@features/experience/experience.component';
import { ProjectsComponent } from '@features/projects/projects.component';
import { EducationComponent } from '@features/education/education.component';
import { ContactComponent } from '@features/contact/contact.component';

const DIVIDER = `
  <div class="max-w-6xl mx-auto px-6">
    <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
  </div>
`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />

    <div class="max-w-6xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
    </div>

    <app-about />

    <div class="max-w-6xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
    </div>

    <app-skills />

    <div class="max-w-6xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
    </div>

    <app-experience />

    <div class="max-w-6xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
    </div>

    <app-projects />

    <div class="max-w-6xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
    </div>

    <app-education />

    <div class="max-w-6xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-[#00ff41]/30 to-transparent"></div>
    </div>

    <app-contact />
  `,
})
export class HomePage {}
