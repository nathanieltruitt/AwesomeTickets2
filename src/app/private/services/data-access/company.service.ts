import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Company } from '../../../shared/models/company.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  // TODO: error handling for company stream
  private companies$!: Observable<Company[]>;

  constructor(private db: AngularFirestore) {
    this.companies$ = this.db.collection<Company>('Companies').valueChanges();
  }

  public get companies() {
    return this.companies$;
  }

  updateCompany(idx: number, data: Company, isNew: boolean) {
    if (isNew) {
      this.db.collection('Companies').add({
        id: data.id,
        companyName: data.companyName,
        primaryContact: data.primaryContact,
        assigned: data.assigned,
        address: data.address,
      });
      return;
    }
    let documentId: string;
    this.db
      .collection<Company>('Companies', (ref) => ref.where('id', '==', idx))
      .get()
      .subscribe((doc) => {
        documentId = doc.docs[0].id;
        this.db.collection<Company>('Companies').doc(documentId).update({
          id: data.id,
          companyName: data.companyName,
          primaryContact: data.primaryContact,
          assigned: data.assigned,
          address: data.address,
        });
      });
  }
}
