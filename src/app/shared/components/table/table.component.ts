import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SortEvent } from '../../models/sorting-types.type';
import { SortTableDirective } from '../../directives/sort-table.directive';
import { TableService } from '../../services/component-communication/table.service';
import { Header } from '../../models/header.interface';
import { Company } from 'src/app/shared/models/company.interface';
import { Contact } from 'src/app/shared/models/contact.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  // * Example of header entries
  // headerEntries = [
  //   { sortable: 'name', name: 'Country' },
  //   { sortable: 'area', name: 'Area' },
  //   { sortable: 'population', name: 'Population' },
  // ];
  @Input() headerEntries!: Header[];
  @Input() data$!: Observable<Company[]> | Observable<Contact[]>;
  entries$!: Observable<any[]>;
  total$!: Observable<number>;

  @ViewChildren(SortTableDirective) headers!: QueryList<SortTableDirective>;

  constructor(public tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.data = this.data$;
  }

  onGetEntities() {
    return this.tableService.entities$;
  }

  onGetTotal() {
    return this.tableService.total$;
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

  logIndex(idx: number) {
    console.log(idx);
  }
}
