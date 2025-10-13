import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="contact" class="contact section">
      <div class="container">
        <h2 class="section-title">¿Tienes un proyecto en mente?</h2>
        
        <div class="contact-content">
          <div class="contact-info">
            <h3>Contacto</h3>
            <div class="contact-items">
              <a href="mailto:humberto@ejemplo.com" class="contact-item">
                <span class="icon">📧</span>
                <span>humbertolpzc@gmail.com</span>
              </a>
              
              <a href="https://linkedin.com" target="_blank" class="contact-item">
                <span class="icon">💼</span>
                <span>LinkedIn</span>
              </a>
              
              <a href="https://github.com" target="_blank" class="contact-item">
                <span class="icon">🐙</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
          
          <div class="contact-form-wrapper">
            <form class="contact-form" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  [(ngModel)]="formData.name"
                  required>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  [(ngModel)]="formData.email"
                  required>
              </div>
              
              <div class="form-group">
                <label for="message">Mensaje</label>
                <textarea 
                  id="message" 
                  name="message"
                  [(ngModel)]="formData.message"
                  rows="5"
                  required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      background-color: var(--bg-secondary);
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    @media (min-width: 1024px) {
      .contact-content {
        grid-template-columns: 1fr 2fr;
      }
    }

    .contact-info h3 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .contact-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      color: var(--text-primary);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .contact-item:hover {
      background-color: var(--accent);
      color: white;
      border-color: var(--accent);
      transform: translateX(4px);
    }

    .contact-item .icon {
      font-size: 1.25rem;
    }

    .contact-form-wrapper {
      background-color: var(--bg-primary);
      padding: 2rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .form-group input,
    .form-group textarea {
      padding: 1rem;
      font-size: 1rem;
      color: var(--text-primary);
      background-color: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      transition: border-color 0.15s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--accent);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    button[type="submit"] {
      width: 100%;
    }

    @media (min-width: 768px) {
      button[type="submit"] {
        width: auto;
        align-self: flex-start;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    alert('Mensaje enviado! (Funcionalidad pendiente)');
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }
}
