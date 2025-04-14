import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountryStore } from '../store/country.store';
import { Router } from '@angular/router';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  displayedColumns: string[] = [
    'flag',
    'name',
    'capital',
    'region',
    'population',
    'languages',
    'currencies'
  ];

  store = inject(CountryStore);
  private router = inject(Router);

  ngOnInit() {
    this.store.loadCountries();
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

  onRowClick(country: Country) {
    this.router.navigate(['/country', country.cca3]);
  }
} 