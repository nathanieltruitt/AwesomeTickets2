import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/shared/models/header.interface';

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
  ];

  constructor() {}

  ngOnInit(): void {}
}
