import { SortColumn, SortDirection } from './sorting-types.type';

export interface SearchResult {
  countries: object[];
  total: number;
}

export interface searchState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
