import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/private/services/data-access/company.service';
import { Header } from 'src/app/shared/models/header.interface';
import { Company } from 'src/app/shared/models/company.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
})
export class CompanyTableComponent implements OnInit {
  headers: Header[] = [
    {
      sortable: 'name',
      name: 'Company',
    },
    {
      sortable: 'contact',
      name: 'Contact',
    },
    {
      sortable: 'numOfTickets',
      name: 'Number of Tickets',
    },
    {
      sortable: 'assigned',
      name: 'Assigned',
    },
  ];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  onGetCompanies() {
    return this.companyService.companies.pipe(
      map((companies) => companies.map((company) => this.mapCompany(company)))
    );
  }

  private mapCompany(company: Company): Company {
    return {
      id: company.id,
      companyName: company.companyName,
      primaryContact: company.primaryContact,
      numberOfTickets: company.numberOfTickets,
      assigned: company.assigned,
    };
  }
}
