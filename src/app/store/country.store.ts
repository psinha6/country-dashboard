import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const CountryStore = signalStore(
  { providedIn: 'root' },
  withState<CountryState>(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCountries: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() => http.get<Country[]>('https://restcountries.com/v3.1/all')),
        tap({
          next: (countries) => patchState(store, { countries, loading: false }),
          error: (error) => patchState(store, { error: error.message, loading: false }),
        })
      )
    ),
  }))
); 