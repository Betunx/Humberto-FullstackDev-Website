import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InViewDirective } from '@core/directives/in-view.directive';
import { LanguageService } from '@core/services/language.service';

const CT = {
  es: {
    label: '05. // CONTACTO',
    heading: 'Conectemos',
    subtitle: '¿Tienes un proyecto en mente? Me encantaría escucharlo. Envíame un mensaje y te respondo lo antes posible.',
    email: 'EMAIL',
    location: 'UBICACIÓN',
    locationVal: 'Hermosillo, Sonora, MX',
    phone: 'TELÉFONO',
    nameLabel: 'NOMBRE',
    namePlaceholder: 'Tu nombre',
    emailLabel: 'EMAIL',
    emailPlaceholder: 'tu@email.com',
    msgLabel: 'MENSAJE',
    msgPlaceholder: 'Cuéntame sobre tu proyecto...',
    send: 'ENVIAR',
    sending: 'ENVIANDO...',
    sent: 'ENVIADO',
    sentMsg: '> Mensaje enviado correctamente...',
    sentSub: 'Te responderé a la brevedad posible.',
    sendAnother: 'Enviar otro mensaje',
    errorMsg: '> Error al enviar. Intenta de nuevo o escríbeme directo a humbertolpzc.work@gmail.com',
  },
  en: {
    label: '05. // CONTACT',
    heading: "Let's Connect",
    subtitle: 'Have a project in mind? I\'d love to hear about it. Send me a message and I\'ll get back to you as soon as possible.',
    email: 'EMAIL',
    location: 'LOCATION',
    locationVal: 'Hermosillo, Sonora, MX (Open to Remote)',
    phone: 'PHONE',
    nameLabel: 'NAME',
    namePlaceholder: 'Your name',
    emailLabel: 'EMAIL',
    emailPlaceholder: 'you@email.com',
    msgLabel: 'MESSAGE',
    msgPlaceholder: 'Tell me about your project...',
    send: 'SEND',
    sending: 'SENDING...',
    sent: 'SENT',
    sentMsg: '> Message sent successfully...',
    sentSub: "I'll get back to you shortly.",
    sendAnother: 'Send another message',
    errorMsg: '> Failed to send. Try again or reach me directly at humbertolpzc.work@gmail.com',
  },
};

interface FormState {
  name: string;
  email: string;
  message: string;
}

// Replace YOUR_FORMSPREE_ID with your form ID from https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, InViewDirective],
  template: `
    <section id="contact" class="py-32 px-6" style="background-color:#0a0a0a; position:relative; z-index:1;">
      <div class="max-w-4xl mx-auto">

        <!-- Header (centered) -->
        <div
          appInView
          [inViewThreshold]="0.1"
          class="fade-up text-center mb-16"
        >
          <p
            class="text-sm tracking-widest mb-3"
            style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
          ><span style="color:#00e5ff;">05.</span> {{ t().label.substring(2) }}</p>
          <h2
            class="text-3xl sm:text-4xl font-bold mb-4"
            style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
          >{{ t().heading }}</h2>
          <p
            class="max-w-md mx-auto text-sm leading-relaxed"
            style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
          >{{ t().subtitle }}</p>
          <div class="mt-6 h-px w-24 mx-auto" style="background: linear-gradient(90deg, transparent, #00ff41, transparent);"></div>
        </div>

        <!-- Main grid: info (2) + form (3) -->
        <div class="grid lg:grid-cols-5 gap-10">

          <!-- LEFT: Contact info -->
          <div
            appInView
            [inViewThreshold]="0.1"
            [inViewDelay]="100"
            class="fade-left lg:col-span-2 flex flex-col gap-6"
          >
            <!-- Email -->
            <div class="flex items-start gap-4">
              <div
                class="p-2.5 rounded-lg flex-shrink-0"
                style="background: rgba(0,255,65,0.08); border: 1px solid rgba(0,255,65,0.2);"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p
                  class="text-xs font-bold mb-1 tracking-widest"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >EMAIL</p>
                <a
                  href="mailto:humbertolpzc.work@gmail.com"
                  class="text-sm transition-colors duration-200"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                  onmouseenter="this.style.color='#00ff41'"
                  onmouseleave="this.style.color='#8b949e'"
                >humbertolpzc.work&#64;gmail.com</a>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-start gap-4">
              <div
                class="p-2.5 rounded-lg flex-shrink-0"
                style="background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p
                  class="text-xs font-bold mb-1 tracking-widest"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >{{ t().location }}</p>
                <p
                  class="text-sm"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >{{ t().locationVal }}</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start gap-4">
              <div
                class="p-2.5 rounded-lg flex-shrink-0"
                style="background: rgba(168,85,247,0.08); border: 1px solid rgba(168,85,247,0.2);"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.14a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <p
                  class="text-xs font-bold mb-1 tracking-widest"
                  style="font-family: 'Orbitron', sans-serif; color: #c9d1d9;"
                >{{ t().phone }}</p>
                <p
                  class="text-sm"
                  style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                >+52 662 360 6250</p>
              </div>
            </div>

            <!-- Social buttons -->
            <div class="flex gap-3 pt-2">
              <a
                href="https://github.com/Betunx"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-wider transition-all duration-200"
                style="
                  font-family: 'JetBrains Mono', monospace;
                  border: 1px solid rgba(0,255,65,0.25);
                  color: #00ff41;
                  background: rgba(0,255,65,0.05);
                "
                onmouseenter="this.style.background='rgba(0,255,65,0.12)'; this.style.borderColor='rgba(0,255,65,0.5)'"
                onmouseleave="this.style.background='rgba(0,255,65,0.05)'; this.style.borderColor='rgba(0,255,65,0.25)'"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/humberto-lopez-fs-dev"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-wider transition-all duration-200"
                style="
                  font-family: 'JetBrains Mono', monospace;
                  border: 1px solid rgba(0,229,255,0.25);
                  color: #00e5ff;
                  background: rgba(0,229,255,0.05);
                "
                onmouseenter="this.style.background='rgba(0,229,255,0.12)'; this.style.borderColor='rgba(0,229,255,0.5)'"
                onmouseleave="this.style.background='rgba(0,229,255,0.05)'; this.style.borderColor='rgba(0,229,255,0.25)'"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <!-- RIGHT: Form -->
          <div
            appInView
            [inViewThreshold]="0.1"
            [inViewDelay]="200"
            class="fade-right lg:col-span-3"
          >
            <div
              class="p-8 rounded-lg border"
              style="background-color: #0d1117; border-color: rgba(0,255,65,0.12);"
            >
              @if (!sent) {
                <form (ngSubmit)="handleSubmit()" #contactForm="ngForm">
                  <!-- Name & Email row -->
                  <div class="grid sm:grid-cols-2 gap-4 mb-4">
                    <!-- Name -->
                    <div>
                      <label
                        for="name"
                        class="block text-xs font-bold mb-2 tracking-widest"
                        style="font-family: 'Orbitron', sans-serif; color: #8b949e;"
                      >{{ t().nameLabel }}</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        [(ngModel)]="formState.name"
                        required
                        [placeholder]="t().namePlaceholder"
                        class="w-full px-4 py-3 rounded text-sm outline-none transition-all duration-200"
                        style="
                          font-family: 'JetBrains Mono', monospace;
                          background-color: #0a0a0a;
                          color: #c9d1d9;
                          border: 1px solid rgba(0,255,65,0.15);
                        "
                        onfocus="this.style.borderColor='rgba(0,255,65,0.5)'; this.style.boxShadow='0 0 12px rgba(0,255,65,0.08)'"
                        onblur="this.style.borderColor='rgba(0,255,65,0.15)'; this.style.boxShadow='none'"
                      />
                    </div>

                    <!-- Email -->
                    <div>
                      <label
                        for="email"
                        class="block text-xs font-bold mb-2 tracking-widest"
                        style="font-family: 'Orbitron', sans-serif; color: #8b949e;"
                      >EMAIL</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        [(ngModel)]="formState.email"
                        required
                        placeholder="tu@email.com"
                        class="w-full px-4 py-3 rounded text-sm outline-none transition-all duration-200"
                        style="
                          font-family: 'JetBrains Mono', monospace;
                          background-color: #0a0a0a;
                          color: #c9d1d9;
                          border: 1px solid rgba(0,255,65,0.15);
                        "
                        onfocus="this.style.borderColor='rgba(0,255,65,0.5)'; this.style.boxShadow='0 0 12px rgba(0,255,65,0.08)'"
                        onblur="this.style.borderColor='rgba(0,255,65,0.15)'; this.style.boxShadow='none'"
                      />
                    </div>
                  </div>

                  <!-- Message -->
                  <div class="mb-6">
                    <label
                      for="message"
                      class="block text-xs font-bold mb-2 tracking-widest"
                      style="font-family: 'Orbitron', sans-serif; color: #8b949e;"
                    >{{ t().msgLabel }}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      [(ngModel)]="formState.message"
                      required
                      [placeholder]="t().msgPlaceholder"
                      class="w-full px-4 py-3 rounded text-sm outline-none resize-none transition-all duration-200"
                      style="
                        font-family: 'JetBrains Mono', monospace;
                        background-color: #0a0a0a;
                        color: #c9d1d9;
                        border: 1px solid rgba(0,255,65,0.15);
                      "
                      onfocus="this.style.borderColor='rgba(0,255,65,0.5)'; this.style.boxShadow='0 0 12px rgba(0,255,65,0.08)'"
                      onblur="this.style.borderColor='rgba(0,255,65,0.15)'; this.style.boxShadow='none'"
                    ></textarea>
                  </div>

                  <!-- Submit -->
                  @if (error) {
                    <p class="mb-4 text-xs" style="font-family:'JetBrains Mono',monospace; color:#ff5f57;">
                      {{ t().errorMsg }}
                    </p>
                  }
                  <button
                    type="submit"
                    [disabled]="contactForm.invalid || sending"
                    class="flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style="
                      font-family: 'Orbitron', sans-serif;
                      background-color: #00ff41;
                      color: #0a0a0a;
                      border: 2px solid #00ff41;
                      box-shadow: 0 0 20px rgba(0,255,65,0.3);
                    "
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {{ sending ? t().sending : t().send }}
                  </button>
                </form>
              }

              @if (sent) {
                <!-- Success message -->
                <div class="py-8 text-center">
                  <div
                    class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style="background: rgba(0,255,65,0.1); border: 1px solid rgba(0,255,65,0.4);"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff41" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p
                    class="text-sm"
                    style="font-family: 'JetBrains Mono', monospace; color: #00ff41;"
                  >{{ t().sentMsg }}</p>
                  <p
                    class="text-xs mt-2"
                    style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                  >{{ t().sentSub }}</p>
                  <button
                    (click)="resetForm()"
                    class="mt-6 text-xs underline transition-colors duration-200"
                    style="font-family: 'JetBrains Mono', monospace; color: #8b949e;"
                    onmouseenter="this.style.color='#00ff41'"
                    onmouseleave="this.style.color='#8b949e'"
                  >{{ t().sendAnother }}</button>
                </div>
              }
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: []
})

export class ContactComponent {
  private readonly langSvc = inject(LanguageService);
  protected readonly t = computed(() => CT[this.langSvc.lang()]);

  formState: FormState = { name: '', email: '', message: '' };
  sent = false;
  sending = false;
  error = false;

  handleSubmit(): void {
    if (!this.formState.name || !this.formState.email || !this.formState.message) return;
    this.sending = true;
    this.error = false;

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.formState.name,
        email: this.formState.email,
        message: this.formState.message,
      }),
    })
      .then(res => {
        this.sending = false;
        if (res.ok) {
          this.sent = true;
        } else {
          this.error = true;
        }
      })
      .catch(() => {
        this.sending = false;
        this.error = true;
      });
  }

  resetForm(): void {
    this.formState = { name: '', email: '', message: '' };
    this.sent = false;
    this.error = false;
  }
}
