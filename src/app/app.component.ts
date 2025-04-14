import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './country-list/country-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CountryListComponent],
  template: `
    <div class="app-container">
      <h1>Countries Dashboard</h1>
      <app-country-list></app-country-list>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
  title = 'country-dashboard';
} 