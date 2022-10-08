import { PipeTransform } from '@angular/core';

export function matches(entity: any, term: string) {
  for (let cell of Object.values(entity)) {
    // const checkString = String(cell);
    if (String(cell).toLowerCase().includes(term.toLowerCase())) return true;
  }
  return false;
}

// if (
//   term
//     .toLowerCase()
//     .startsWith(checkString.toLowerCase().substring(0, 2)) ||
//   term
//     .toLowerCase()
//     .endsWith(
//       checkString
//         .toLowerCase()
//         .substring(checkString.length - 4, checkString.length - 1)
//     )
// ) {
//   return true;
// }
// }
// return false;
