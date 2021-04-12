/*
File Name: index.js
Name: Vaishali Siddeshwar
Student ID: 301172372
Date: April-12-2021
This module displays all Survey Report- bar chart of responses for a Survey.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyResponseSchema } from '../../../models/surveyresponse.model';

@Component({
  selector: 'app-survey-reports',
  templateUrl: './survey-reports.component.html',
  styleUrls: ['./survey-reports.component.css']
})
export class SurveyReportsComponent implements OnInit {

  surveyID = '';
  serviceResponse = '';
  surveyTitle = 'Survey Report';
  surveyResponses: SurveyResponseSchema[] = [];
  public chartType: string = 'bar';

  title = 'Angular Charts';

  // set chart size
  view: [number, number] = [300, 300];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Sales';
  timeline = true;

  // set colors for charts
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };


 questions_lst: string[] = [];
responses: any = [];
responseschart: any = [];

  constructor(public surveyService: SurveyService, private route: ActivatedRoute) {
    this.surveyID = this.route.snapshot.paramMap.get('id') as string;
    this.getdata();
  }

  // get all survey reponses for a survey
  getdata(): void {
    if (this.surveyID.length > 0) {
     this.surveyService.getSurveyResponses(this.surveyID).subscribe(
       data => {
        data.forEach(element => {
          element.questions.forEach(question => {
           if (this.questions_lst.indexOf(question.question) < 0) {
              const q = question.question;
              this.questions_lst.push(q);
            }
          });
        });

        // process the survey responses into counts for display
        // by looping through options for a question and counting their answers in all reponses
        this.questions_lst.forEach(title => {
            data.forEach(element => {
            element.questions.forEach(qt => {
              if (title === qt.question) {
                console.log(title);
                const itemname = qt.answer;
                const itemvalue = 1;

                const obj  = this.responseschart.find((x: any) => x.titlename === title);

                if (obj === undefined){
                this.responseschart.push({titlename: title, options: [{name: itemname, value: itemvalue}]});
                }
                else{
                  const option = obj.options.find(((f: any) => f.name === itemname));
                  if (option === undefined){
                    obj.options.push({name: itemname, value: itemvalue});
                  }
                  else{
                    option.value += 1;
                  }
                }
              }
              });
            });

          });

        });
       }
  }


  ngOnInit(): void {
    console.log(this.responseschart);

  }

  dismiss(): void {

  }

}
