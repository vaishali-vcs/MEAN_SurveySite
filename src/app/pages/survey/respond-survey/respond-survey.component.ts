import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl, FormBuilder,
  ReactiveFormsModule , Validators, FormArray } from '@angular/forms';
import { QuestionAnswerSchema, SurveyResponseSchema } from 'src/app/models/surveyresponse.model';
import { SurveyService } from 'src/app/services/survey.service';

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

  constructor(public surveyService: SurveyService) { }

  ngOnInit(): void {
    let group: any = {};
    this.formtemplate.forEach(inputtemplate => {
      group[inputtemplate.controlName] = new FormControl('');
    });
    this.surveyForm = new FormGroup(group);
  }

  onSubmit(): void {
    if (this.surveyForm.invalid) {
      return;
    }

    const Questions: QuestionAnswerSchema[] = [];

    this.formtemplate.forEach(inputtemplate => {
      console.log(this.surveyForm.controls[inputtemplate.controlName].value);
      Questions.push({question: inputtemplate.question,
      answer: this.surveyForm.controls[inputtemplate.controlName].value });
      });

    const surveyResponseData: SurveyResponseSchema = {
      surveyid: '1',   // hard coded for now
      questions: Questions
    };

    this.surveyService.addSurveyResponse(surveyResponseData);
  }
  }

