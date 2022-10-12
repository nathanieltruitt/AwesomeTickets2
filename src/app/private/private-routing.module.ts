import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTableComponent } from './components/csr/company-table/company-table.component';
import { ContactTableComponent } from './components/csr/contact-table/contact-table.component';
import { CsrModalComponent } from './components/csr/csr-modal/csr-modal.component';
import { CsrComponent } from './components/csr/csr.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'csr',
    component: CsrComponent,
    children: [
      {
        path: '',
        redirectTo: '/csr/companies',
        pathMatch: 'full',
      },
      {
        path: 'companies',
        component: CompanyTableComponent,
        children: [
          {
            path: ':id',
            component: CsrModalComponent,
          },
        ],
      },
      {
        path: 'contacts',
        component: ContactTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
export const RoutingComponents = [CsrComponent, CompanyTableComponent];
