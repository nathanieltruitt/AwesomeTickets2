import { Observable } from 'rxjs';
import { Company } from './company.interface';
import { Contact } from './contact.interface';
import { searchState } from './search.interface';

export interface TableData {
  data: Observable<Company[]> | Observable<Contact[]>;
  state: searchState;
}

export interface ResultsData {
  entities: Observable<object[]>;
  total: Observable<number>;
}
