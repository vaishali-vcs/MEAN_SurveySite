import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { SurveySchema, QuestionSchema } from '../../../models/survey.model';
import { SurveyService } from '../../../services/survey.service';

// export interface QuestionElement {
//   question: string;
//   options: string;
//   answertype: string[];
// }

// const answertype: string[] = [
//   'dropdown',
//   'text',
//   'radio buttons',
//   'date picker',
// ];
// const question = '';
// const options = '';

// const ELEMENT_DATA: QuestionElement[] = [
//   { question, answertype, options },
//   { question, answertype, options },
//   { question, answertype, options },
// ];

const Questions: QuestionSchema[] = [
  {
    question: 'Question 1',
    type: 'checkbox',
    options: ['test1', 'test2', 'Test3'],
  },
  {
    question: 'Question 2',
    type: 'checkbox',
    options: ['test1', 'test2', 'Test3'],
  },
  {
    question: 'Question 3',
    type: 'checkbox',
    options: ['test1', 'test2', 'Test3'],
  },
];

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
})
export class AddSurveyComponent {
  data = [];
  answertype: string[] = [
    'Dropdown',
    'Textbox',
    'Radio Button',
    'DatePicker',
  ];
  options: ['test1', 'test2', 'Test3']
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns: string[] = ['question', 'answertype', 'options', 'remove'];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({
    titleCtrl: new FormControl(''),
    discriptionCtrl: new FormControl(''),
    expiretCtrl: new FormControl(''),
    questions: this.rows,
  });

  initOptions() {
    return new FormControl('');
  }

  /** UniversityWebPagesFields */
  surveyQuestionsPlaceholder: string = 'Options';
  surveyQuestionsInputPlaceholder: string =
    'Option 1, Option 2, Option 3, Option 4';

  constructor(public surveyService: SurveyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.data.forEach(() => this.onAddQuestion());
    this.updateView();
  }

  emptyTable() {
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
    this.ngOnInit()
  }

  removeAt(index: number) {
    this.rows.removeAt(index);
    this.ngOnInit()
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  onAddQuestion(): void {
    const question = this.fb.group({
      question: '',
      type: '',
      options: '',
    });
    this.rows.push(question);
    this.updateView();
  }

  onAddSurvey(): void {
    if (this.form.invalid || this.form.controls.questions.value == 0 ) {
      return;
    }
    const surveyData: SurveySchema = {
      id: null,
      name: "Name of User",
      title: this.form.controls.titleCtrl.value,
      created: new Date(2017, 4, 4, 17, 23, 42, 11),
      expires: this.form.controls.expiretCtrl.value,
      status: 'Created',
      questions: this.form.controls.questions.value,
    };
    this.surveyService.addSurvey(surveyData);
  }
}
