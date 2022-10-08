import { Header } from '../models/header.interface';
import { SortColumn } from '../models/sorting-types.type';
import { map, Observable } from 'rxjs';

function sortData<T>(entities: T[], column: any, direction: string) {
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

export function sort<T>(
  entities: Observable<T[]>,
  column: any,
  direction: string
): Observable<T[]> {
  return entities.pipe(
    map((entityList) => sortData(entityList, column, direction))
  );
}
