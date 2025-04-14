import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Country } from '../models/country.model';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="details-container">
      <mat-card *ngIf="country">
        <mat-card-header>
          <mat-card-title>{{ country.name.common }}</mat-card-title>
          <mat-card-subtitle>{{ country.name.official }}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image [src]="country.flags.png" [alt]="country.name.common + ' flag'">
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>location_city</mat-icon>
              <div matListItemTitle>Capital</div>
              <div matListItemLine>{{ country.capital?.join(', ') || 'N/A' }}</div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>public</mat-icon>
              <div matListItemTitle>Region</div>
              <div matListItemLine>{{ country.region }}</div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>people</mat-icon>
              <div matListItemTitle>Population</div>
              <div matListItemLine>{{ country.population | number }}</div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>language</mat-icon>
              <div matListItemTitle>Languages</div>
              <div matListItemLine>{{ getLanguages(country.languages) }}</div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>payments</mat-icon>
              <div matListItemTitle>Currencies</div>
              <div matListItemLine>{{ getCurrencies(country.currencies) }}</div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
      <mat-spinner *ngIf="loading" diameter="50" class="spinner"></mat-spinner>
    </div>
  `,
  styles: [`
    .details-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    mat-card {
      margin-top: 20px;
    }
    mat-card-header {
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    mat-list-item {
      height: auto !important;
      margin: 10px 0;
    }
    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class CountryDetailsComponent implements OnInit {
  country: Country | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.route.params.subscribe(params => {
      const cca3 = params['country'];
      if (cca3) {
        this.loadCountry(cca3);
      }
    });
  }

  loadCountry(cca3: string) {
    this.loading = true;
    this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha/${cca3}`)
      .subscribe({
        next: (countries) => {
          this.country = countries[0];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading country:', error);
          this.loading = false;
        }
      });
  }

  getLanguages(languages: { [key: string]: string }): string {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  }

  getCurrencies(currencies: { [key: string]: { name: string; symbol: string } }): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  }
} 