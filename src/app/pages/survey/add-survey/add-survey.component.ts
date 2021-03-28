import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SurveySchema, QuestionSchema  } from '../../../models/survey.model';
import { SurveyService } from '../../../services/survey.service';

export interface QuestionElement {
  question: string;
  options: string;
  answertype: string[];
}

const answertype: string[] = ['dropdown', 'text', 'radio buttons', 'date picker'];
const question = '';
const options = '';

const ELEMENT_DATA: QuestionElement[] = [
  {question, answertype, options},
  {question, answertype, options},
  {question, answertype, options}
];

const Questions: QuestionSchema[] = [
  {question: "Question 1", type:"checkbox", options:["test1", "test2", "Test3"]},
  {question: "Question 2", type:"checkbox", options:["test1", "test2", "Test3"]},
  {question: "Question 3", type:"checkbox", options:["test1", "test2", "Test3"]},
]


@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})

export class AddSurveyComponent {
  form: FormGroup;
  displayedColumns: string[] = ['question', 'answertype', 'options'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public surveyService: SurveyService) {}

  ngOnInit() {
    this.form = new FormGroup({
      surveyNameCtrl: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
    })
  }

  onAddOption(): void {
    ELEMENT_DATA.push({question , answertype, options});
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  onAddSurvey(): void {
    if (this.form.invalid) {
      return;
    }

    //Tried Pushing Dummy Data Below
    const surveyData: SurveySchema = {
      id: null,
      name: "Test data insertion USername",
      title: "Title",
      created: new Date(2017, 4, 4, 17, 23, 42, 11),
      expires: new Date(2017, 4, 4, 17, 23, 42, 11),
      status: "Created",
      questions: Questions
    };
    this.surveyService.addSurvey(surveyData);
  }
}
