import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsrComponent } from './components/csr/csr.component';

const routes: Routes = [
  {
    path: 'csr',
    component: CsrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
export const RoutingComponents = [CsrComponent];
