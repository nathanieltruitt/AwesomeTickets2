import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { CompanyService } from '../data-access/company.service';
import { ContactService } from '../data-access/contact.service';

@Injectable({
  providedIn: 'root',
})
export class CsrModalService {
  private _sub!: Subscription;
  private companyForm = this.formBuilder.group({
    id: [''],
    companyName: [''],
    primaryContact: [''],
    assigned: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      zipCode: [''],
    }),
  });
  private contactForm = this.formBuilder.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    company: [''],
    title: [''],
    cellNumber: [''],
    officeNumber: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private contactService: ContactService
  ) {}

  getCompanyForm(): FormGroup {
    return this.companyForm;
  }

  getContactForm(): FormGroup {
    return this.contactForm;
  }

  fetch(form: FormGroup, isCompany: boolean): FormGroup {
    // TODO: correctly fetch data from backend
    if (isCompany) {
      this._sub = this.companyService.companies
        .pipe(
          map((companies) =>
            companies.filter((company) => company.id === form.get('id')?.value)
          )
        )
        .subscribe((companies) => {
          const company = companies[0];
          form.setValue({
            id: [company.id],
            companyName: [company.companyName],
            primaryContact: [company.primaryContact],
            assigned: [company.assigned],
            address: {
              street: [company.address?.street],
              city: [company.address?.city],
              zipCode: [company.address?.zipCode],
            },
          });
        });
    } else {
      this._sub = this.contactService.contacts$
        .pipe(
          map(
            (contacts) =>
              contacts.filter(
                (company) => company.id === form.get('id')?.value
              )[0]
          )
        )
        .subscribe((contact) => {
          form.setValue({
            id: [contact.id],
            firstName: [contact.firstName],
            lastName: [contact.lastName],
            company: [contact.company],
            title: [contact.title],
            cellNumber: [contact.cellNumber],
            officeNumber: [contact.officeNumber],
          });
        });
    }
    return form;
  }

  saveData(idx: number | string, data: any) {
    let isNew = false;
    if (data.firstName !== undefined) {
      if (idx === 'new') {
        this.contactService.contacts$
          .pipe(map((contacts) => contacts.slice()[contacts.length - 1]))
          .subscribe((contact) => {
            idx = contact.id + 1;
            isNew = true;
          });
      }
      this.contactService.updateContact(<number>idx, data, isNew);
    } else {
      if (idx === 'new') {
        this.companyService.companies
          .pipe(map((contacts) => contacts.slice()[contacts.length - 1]))
          .subscribe((contact) => {
            idx = contact.id + 1;
            isNew = true;
          });
      }
      this.companyService.updateCompany(<number>idx, data, isNew);
    }
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
