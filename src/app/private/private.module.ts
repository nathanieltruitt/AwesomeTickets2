import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RoutingComponents } from './private-routing.module';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyTableComponent } from './components/csr/company-table/company-table.component';
import { ContactTableComponent } from './components/csr/contact-table/contact-table.component';

@NgModule({
  declarations: [
    PrivateComponent,
    NavbarComponent,
    RoutingComponents,
    CompanyTableComponent,
    ContactTableComponent,
  ],
  imports: [CommonModule, PrivateRoutingModule, SharedModule, NgbModule],
  exports: [PrivateComponent],
})
export class PrivateModule {}
