import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormBuilder,
  ReactiveFormsModule , Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-respond-survey',
  templateUrl: './respond-survey.component.html',
  styleUrls: ['./respond-survey.component.css']
})

export class RespondSurveyComponent implements OnInit {
  surveyForm: any = FormGroup;
   formtemplate = [
    {
      type: 'datepicker',
      question: 'When did you use our product?',
      controlName: 'dtnpicker'
    },
    {
      type: 'textBox',
      question: 'Name of the product',
      controlName: 'productname'
    },
    {
      type: 'dropdown',
      question: 'Would you recommend us for a friend?',
      options: ['Yes', 'No', 'May Be'],
      controlName: 'dtnrecommend'
    },
    {
      type: 'radio-group',
      question: 'Overall how satisfied are you with the product?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'N/A'],
      controlName: 'radiosatisfaction'
    }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    let group: any = {};
    this.formtemplate.forEach(inputtemplate => {
      group[inputtemplate.controlName] = new FormControl('');
    });
    this.surveyForm = new FormGroup(group);
  }
  onSubmit(): void {
    this.formtemplate.forEach(inputtemplate => {
    console.log(this.surveyForm.controls[inputtemplate.controlName].value);
    });
  }
  }

