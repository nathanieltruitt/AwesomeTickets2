import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsrModalService {
  openedCount = 0;

  constructor() {}
}
