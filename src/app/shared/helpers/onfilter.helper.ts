import { SearchResult } from '../models/search.interface';
import { matches } from '../helpers/matches.helper';

export function onFilter(
  entities: object[],
  options: { pageSize: number; page: number; searchTerm: string }
): SearchResult {
  let total;
  if (options.searchTerm !== '') {
    entities = entities.filter((entity) => matches(entity, options.searchTerm));
    total = entities.length;
  } else {
    total = entities.length;
  }

  // 3. paginate
  entities = entities.slice(
    (options.page - 1) * options.pageSize,
    (options.page - 1) * options.pageSize + options.pageSize
  );

  return { entities, total };
}
