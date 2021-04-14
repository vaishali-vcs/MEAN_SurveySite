/*
File Name: index.js
Name: Vaishali Siddeshwar
Student ID: 301172372
Date: April-12-2021
This module displays initializes and saves Contact Us Page.
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ContactSchema } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  Response = '';
  contactForm = this.formBuilder.group({
    inputname: '',
    inputemail: '',
    inputsubject: '',
    inputmessage: ''
  },{ validators: [Validators.required]});

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
  }

  // save text entered into DB on button click.
  onSubmit(): void{

    if (this.contactForm.invalid){
      return;
    }
    this.Response = 'Thank you for reaching out. We will contact you in 2 business days.';
    const contact: ContactSchema = {
      name: this.contactForm.controls.inputname.value,
      email: this.contactForm.controls.inputemail.value,
      subject: this.contactForm.controls.inputsubject.value,
      message: this.contactForm.controls.inputmessage.value,
      createdon: new Date()
    };

    // invoking the service to save
    this.contactService.addContact(contact);
    this.contactForm.reset();
  }

  // dismiss the message shown to user.
  dismiss(): void{
    this.Response = '';
  }

}
