import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ContactService } from 'src/app/private/services/data-access/contact.service';
import { Contact } from 'src/app/shared/models/contact.interface';
import { Header } from 'src/app/shared/models/header.interface';
@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss'],
})
export class ContactTableComponent implements OnInit {
  headers: Header[] = [
    { sortable: 'firstName', name: 'First Name' },
    { sortable: 'lastName', name: 'Last Name' },
    { sortable: 'company', name: 'Company' },
    { sortable: 'title', name: 'Title' },
    { sortable: 'cellNumber', name: 'Cell Number' },
    { sortable: 'officeNumber', name: 'Office Number' },
  ];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onGetContacts() {
    return this.contactService.contacts$.pipe(
      map((contacts) => contacts.map((contact) => this.mapContact(contact)))
    );
  }

  private mapContact(contact: Contact): Contact {
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      title: contact.title,
      cellNumber: contact.cellNumber,
      officeNumber: contact.officeNumber,
    };
  }

  onRowClick(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
