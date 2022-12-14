import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { RoutingComponents } from './private-routing.module';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyTableComponent } from './components/csr/company-table/company-table.component';
import { ContactTableComponent } from './components/csr/contact-table/contact-table.component';
import { CsrModalComponent } from './components/csr/csr-modal/csr-modal.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    PrivateComponent,
    NavbarComponent,
    RoutingComponents,
    CompanyTableComponent,
    ContactTableComponent,
    CsrModalComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [PrivateComponent],
})
export class PrivateModule {}
