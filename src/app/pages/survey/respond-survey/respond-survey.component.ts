import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionAnswerSchema, SurveyResponseSchema } from 'src/app/models/surveyresponse.model';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveySchema, QuestionSchema } from '../../../models/survey.model';

interface InputControlSchema {
  type: string;
  question: string;
  controlName: string;
  options: string[];
}

@Component({
  selector: 'app-respond-survey',
  templateUrl: './respond-survey.component.html',
  styleUrls: ['./respond-survey.component.css']
})

export class RespondSurveyComponent implements OnInit {
  surveyForm: any = FormGroup;
  surveyID: string;
  //'606213a753057f179c916394', '605f8844da934f29b8c0367c','605f879e05d46420189f978a','605f87341d8c2e03e0ab12c7';
  surveyTitle = '';
  surveydata: QuestionSchema[];
  group: any = {};
  formtemplate: InputControlSchema[] = [];
  serviceResponse: string = '';
  survey: SurveySchema;

  constructor(public surveyService: SurveyService, private route: ActivatedRoute) {
    this.surveyID = this.route.snapshot.paramMap.get('id') as string;
  }

  getdata(): void {

    if (this.surveyID.length > 0) {
    this.surveyService.getSurvey(this.surveyID)
            .subscribe(
                data => {
                  this.surveyTitle = data.name;
                  data.questions.forEach(qstn => {
                    const id = Math.floor((Math.random() * 10) + 1).toString();
                    this.formtemplate.push({question: qstn.question, type: qstn.type,
                    options: qstn.options, controlName: id  });

                    this.group[id] = new FormControl('', { validators: [Validators.required]});
                  });
                });
        }
  }

  ngOnInit(): void {
    this.getdata();

    this.surveyForm = new FormGroup(this.group);
  }

  onSubmit(): void {
    if (!this.surveyForm.invalid) {

    const Questions: QuestionAnswerSchema[] = [];

    this.formtemplate.forEach(inputtemplate => {
      Questions.push({question: inputtemplate.question,
      answer: this.surveyForm.controls[inputtemplate.controlName].value });
      });

    const surveyResponseData: SurveyResponseSchema = {
      surveyid: this.surveyID,   // hard coded for now
      questions: Questions
    };
    this.serviceResponse = this.surveyService.addSurveyResponse(surveyResponseData);
    }
  }

  dismiss(): void{
    this.serviceResponse = '';
  }
}
