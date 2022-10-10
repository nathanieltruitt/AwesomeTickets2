import { SortColumn, SortDirection } from './sorting-types.type';
import { Observable } from 'rxjs';

export interface SearchResult {
  entities: Observable<object[]>;
  total: Observable<number>;
}

export interface searchState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
