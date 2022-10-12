import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CsrModalService {
  private companyForm = this.formBuilder.group({
    id: [''],
    name: [''],
    contact: [''],
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

  constructor(private formBuilder: FormBuilder) {}

  getCompanyForm() {
    return this.companyForm;
  }

  getContactForm() {
    return this.contactForm;
  }
}
