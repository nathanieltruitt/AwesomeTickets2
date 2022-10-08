import { Header } from './header.interface';

export type SortColumn = keyof Header | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: any;
  direction: SortDirection;
}
