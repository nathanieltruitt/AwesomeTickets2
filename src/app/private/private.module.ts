import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CsrComponent } from './components/csr/csr.component';

@NgModule({
  declarations: [PrivateComponent, NavbarComponent, CsrComponent],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
  exports: [PrivateComponent],
})
export class PrivateModule {}
