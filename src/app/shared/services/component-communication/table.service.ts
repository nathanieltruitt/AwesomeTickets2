table - complete.ts;
sortable.directive.ts;

/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';

interface SearchResult {
  countries: Country[];
  total: number;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  countries: Country[],
  column: SortColumn,
  direction: string
): Country[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Country, term: string, pipe: PipeTransform) {
  return (
    country.name.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(country.area).includes(term) ||
    pipe.transform(country.population).includes(term)
  );
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}
}
