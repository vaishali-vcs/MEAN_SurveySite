import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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


@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})

export class AddSurveyComponent {
  displayedColumns: string[] = ['question', 'answertype', 'options'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  addElement(): void {
    ELEMENT_DATA.push({question , answertype, options});
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
}
