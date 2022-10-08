import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortEvent } from '../../models/sorting-types.type';
import { SortTableDirective } from '../../directives/sort-table.directive';
import { TableService } from '../../services/component-communication/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  headerEntries = [
    { sortable: 'name', name: 'Country' },
    { sortable: 'area', name: 'Area' },
    { sortable: 'population', name: 'Population' },
  ];
  entries$!: Observable<object[]>;
  total$!: Observable<number>;

  @ViewChildren(SortTableDirective) headers!: QueryList<SortTableDirective>;

  constructor(public tableService: TableService) {}

  ngOnInit(): void {
    this.entries$ = this.tableService.entities$;
    this.total$ = this.tableService.total$;
  }

  onGetValues(row: object) {
    return Object.values(row);
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.tableService.sortColumn = column;
    this.tableService.sortDirection = direction;
  }
}
