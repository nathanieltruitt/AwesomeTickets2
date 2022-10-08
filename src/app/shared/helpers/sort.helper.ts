import { Header } from '../models/header.interface';
import { SortColumn } from '../models/sorting-types.type';

export function sort(entities: any[], column: any, direction: string): any[] {
  const compare = (v1: string | number, v2: string | number) =>
    v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  if (direction === '' || column === '') {
    return entities;
  } else {
    return [...entities].sort((a: any, b: any) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
