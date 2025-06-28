import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent], 
  template: `
    <app-navbar></app-navbar> <!-- This should now work -->
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}