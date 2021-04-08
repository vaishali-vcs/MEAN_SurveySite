import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ContactSchema } from '../models/contact.model';
import { environment } from "../../environments/environment";

const url = 'api/admin/survey/';

@Injectable({ providedIn: 'root' })
export class ContactService {
  baseURl = `${environment.backendUrl}${url}`;

  constructor(private http: HttpClient){}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

  addContact(contact: ContactSchema): string{
    this.http.post<{message: string, contact: ContactSchema}>(this.baseURl + 'contact/add', contact, this.httpOptions).subscribe(response => { });
    return 'success';
  }
}
