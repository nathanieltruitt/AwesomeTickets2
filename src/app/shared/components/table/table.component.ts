import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  headers$!: Observable<string[]>;
  rows$!: Observable<object[]>;

  constructor() {}

  ngOnInit(): void {}

  onGetValues(row: object) {
    return Object.values(row);
  }
}
