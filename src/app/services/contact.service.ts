import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactSchema } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  baseURl = 'http://localhost:3000/api/admin/survey/';

  constructor(private http: HttpClient){}

  addContact(contact: ContactSchema): string{
    this.http.post<{message: string, contact: ContactSchema}>(this.baseURl + 'contact/add', contact).subscribe(response => { });
    return 'success';
  }
}
