import { SurveySchema, QuestionSchema } from './../../../models/survey.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';



@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})

export class EditSurveyComponent {

  serviceResponse = '';
  surveyID = '6067190687a14d3094bcd241';
  surveyTitle = 'Edit Form1';

  constructor(public surveyService: SurveyService) { }

  editSurvey(): void{
    const Questions: QuestionSchema[] = [];

    Questions.push({question: 'What product did you use?',
    type: 'textbox', options: []});

    const surveyData: SurveySchema = {
      id: this.surveyID,
      name: 'Edit Form1',
      title: 'Edit Form1',
      created: new Date(),
      expires: new Date(),
      status: 'created',
      questions: Questions
    };
    console.log(surveyData);
    this.serviceResponse = this.surveyService.editSurvey(surveyData);

  }

  dismiss(): void{
    this.serviceResponse = '';
  }

}

