import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { TableComponent } from './components/table/table.component';
import { SortTableDirective } from './directives/sort-table.directive';

@NgModule({
  declarations: [TableComponent, SortTableDirective],
  imports: [CommonModule, NgbModule, FormsModule],
})
export class SharedModule {}
