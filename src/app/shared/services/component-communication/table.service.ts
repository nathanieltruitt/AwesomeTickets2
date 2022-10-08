import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '../../models/sorting-types.type';
import { SearchResult, searchState } from '../../models/search.interface';
import { matches } from '../../helpers/matches.helper';
import { sort } from '../../helpers/sort.helper';
import { COUNTRIES } from './test';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  // TODO: fix up types
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _entities$ = new BehaviorSubject<object[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: searchState = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._entities$.next(result.entities);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get entities$() {
    return this._entities$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: any) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<searchState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let entities = sort(COUNTRIES, sortColumn, sortDirection);

    // 2. filter
    let total;
    if (searchTerm !== '') {
      entities = entities.filter((country) => matches(country, searchTerm));
      total = entities.length;
    } else {
      total = entities.length;
    }

    // 3. paginate
    entities = entities.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ entities, total });
  }
}
