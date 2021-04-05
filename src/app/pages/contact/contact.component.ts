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
    this.contactService.addContact(contact);
    this.contactForm.reset();
  }

  dismiss(): void{
    this.Response = '';
  }

}
