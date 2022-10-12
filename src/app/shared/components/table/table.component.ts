import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  Subject,
  tap,
  debounceTime,
  switchMap,
  delay,
} from 'rxjs';
import { SortEvent } from '../../models/sorting-types.type';
import { SortTableDirective } from '../../directives/sort-table.directive';
import { TableService } from '../../services/component-communication/table.service';
import { Header } from '../../models/header.interface';
import { Company } from 'src/app/shared/models/company.interface';
import { Contact } from 'src/app/shared/models/contact.interface';
import { searchState } from '../../models/search.interface';
import { SortDirection } from '../../models/sorting-types.type';
import { TableData } from '../../models/table-data.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  // * Example of header entries
  // headerEntries = [
  //   { sortable: 'name', name: 'Country' },
  //   { sortable: 'area', name: 'Area' },
  //   { sortable: 'population', name: 'Population' },
  // ];
  @Input() headerEntries!: Header[];
  @Input() tableId!: string;
  @Input() data$!: Observable<Company[]> | Observable<Contact[]>;
  @Output() rowClickEvent = new EventEmitter<number>();
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<TableData>();
  private _entries$!: Observable<any[]>;
  private _total$!: Observable<number>;
  private _state: searchState = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  @ViewChildren(SortTableDirective) headers!: QueryList<SortTableDirective>;

  constructor(public tableService: TableService) {}

  ngOnInit(): void {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap((entities) => this.tableService.search(entities)),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((results) => {
        this._entries$ = results.entities;
        this._total$ = results.total;
      });

    this._search$.next({
      data: this.data$,
      state: this._state,
    });
  }

  onGetValues(row: object) {
    return Object.values(row);
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this._state.sortColumn = column;
    this._state.sortDirection = direction;
  }

  // getters
  get entries$() {
    return this._entries$;
  }
  get total$() {
    return this._total$;
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

  // setters
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
    // when state is changed we push an event to the service.
    Object.assign(this._state, patch);
    this._search$.next({
      data: this.data$,
      state: this._state,
    });
  }

  rowClick(id: number) {
    this.rowClickEvent.emit(id);
  }
}
