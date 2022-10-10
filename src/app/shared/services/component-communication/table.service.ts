import { Injectable } from '@angular/core';
import { SearchResult } from '../../models/search.interface';
import { Company } from 'src/app/shared/models/company.interface';
import { Contact } from 'src/app/shared/models/contact.interface';
import { TableData } from '../../models/table-data.interface';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  // TODO: fix up types

  constructor() {}

  search(data: TableData): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      data.state;

    // 1. sort
    let entities = this.sort<Company | Contact>(
      data.data,
      sortColumn,
      sortDirection
    );

    // 2. filter and paginate

    // use the onFilter function to filter the list
    const searchResult = entities.pipe(
      map((entityList) =>
        this.onFilter(entityList, { pageSize, page, searchTerm })
      )
    );
    return searchResult;
  }

  matches(entity: any, term: string) {
    for (let cell of Object.values(entity)) {
      if (String(cell).toLowerCase().includes(term.toLowerCase())) return true;
    }
    return false;
  }

  onFilter(
    entities: object[],
    options: { pageSize: number; page: number; searchTerm: string }
  ): SearchResult {
    let total;
    if (options.searchTerm !== '') {
      entities = entities.filter((entity) =>
        this.matches(entity, options.searchTerm)
      );
      total = entities.length;
    } else {
      total = entities.length;
    }

    // 3. paginate
    entities = entities.slice(
      (options.page - 1) * options.pageSize,
      (options.page - 1) * options.pageSize + options.pageSize
    );

    return { entities: of(entities), total: of(total) };
  }

  sortData<T>(entities: T[], column: any, direction: string) {
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

  sort<T>(
    entities: Observable<T[]>,
    column: any,
    direction: string
  ): Observable<T[]> {
    return entities.pipe(
      map((entityList) => this.sortData(entityList, column, direction))
    );
  }
}
