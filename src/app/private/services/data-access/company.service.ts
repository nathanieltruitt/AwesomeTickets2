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

  public set company(idx: number) {
    this.db.collection<Company>('Companies', (ref) =>
      ref.where('id', '==', idx)
    );
  }
}
