import { PipeTransform } from '@angular/core';

export function matches(entity: any, term: string) {
  for (let cell of Object.values(entity)) {
    if (String(cell).toLowerCase().includes(term.toLowerCase())) return true;
  }
  return false;
}
