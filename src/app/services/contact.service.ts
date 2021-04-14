/*
File Name: index.js
Name: Vaishali Siddeshwar
Student ID: 301172372
Date: April-12-2021
This module saves Contact Us Page details by
saving invoking the nodejs service.
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ContactSchema } from '../models/contact.model';
import { environment } from "../../environments/environment";

// nodejs service location
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

  // save the contact details
  addContact(contact: ContactSchema): string{
    this.http.post<{message: string, contact: ContactSchema}>(this.baseURl + 'contact/add', contact, this.httpOptions).subscribe(response => { });
    return 'success';
  }
}
