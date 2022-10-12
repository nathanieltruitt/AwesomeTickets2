import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/shared/models/contact.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // TODO: error handling for contact stream
  private _contacts$!: Observable<Contact[]>;

  constructor(private db: AngularFirestore) {
    this._contacts$ = this.db.collection<Contact>('Contacts').valueChanges();
  }

  public get contacts$(): Observable<Contact[]> {
    return this._contacts$;
  }

  public set Contact(idx: number) {
    this.db.collection<Contact>('Contacts', (ref) =>
      ref.where('id', '==', idx)
    );
  }
}
