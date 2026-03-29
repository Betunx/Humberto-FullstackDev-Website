import { Component, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MatrixRainComponent } from './components/matrix-rain/matrix-rain.component';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MatrixRainComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly langSvc = inject(LanguageService);

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.langSvc.lang();
    });
  }
}
