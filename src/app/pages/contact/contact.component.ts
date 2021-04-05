import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void{

    if (this.contactForm.invalid){
      return;
    }
    this.Response = 'Thank you for reaching out. We will contact you in 2 business days.';
    console.log(this.contactForm.controls.inputname.value);
    console.log(this.contactForm.controls.inputemail.value);
    console.log(this.contactForm.controls.inputsubject.value);
    console.log(this.contactForm.controls.inputmessage.value);
  }

  dismiss(): void{
    this.Response = '';
  }

}
