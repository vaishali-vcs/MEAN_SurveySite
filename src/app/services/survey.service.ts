import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { SurveySchema } from '../models/survey.model';
import { Router } from '@angular/router';
import { SurveyResponseSchema } from '../models/surveyresponse.model';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private surveyListUpdated = new Subject<SurveySchema[]>();
  private surveyDataList: SurveySchema[] = [];
  private survey: SurveySchema;
  private baseURl = 'http://localhost:3000/api/admin/survey/';

  constructor(private http: HttpClient, private router: Router) { }

  getSurvaeyUpdateListner() {
    return this.surveyListUpdated.asObservable();
  }

  addSurvey(survey: SurveySchema) {
    const surveyData: SurveySchema = {
      id: null,
      name: survey.name,
      title: survey.title,
      created: survey.created,
      expires: survey.expires,
      status: survey.status,
      questions: survey.questions
    };
    this.http
      .post<{ message: string, survey: SurveySchema }>(
        this.baseURl + 'add',
        surveyData
      )
      .subscribe(responseData => {
        console.log(responseData);
        const addedSurvey: SurveySchema = {
          id: responseData.survey.id,
          name: responseData.survey.name,
          title: responseData.survey.title,
          created: responseData.survey.created,
          expires: responseData.survey.expires,
          status: responseData.survey.status,
          questions: responseData.survey.questions
        };
        this.surveyDataList.push(addedSurvey);
        this.surveyListUpdated.next([...this.surveyDataList]);
        this.router.navigate(['/']);
      });
  }

  getSurvey(id: string): Observable<SurveySchema>
  {
    return this.http.get<SurveySchema>(this.baseURl + 'read/' + id);
  }

  addSurveyResponse(response: SurveyResponseSchema): string{
    const surveyResponseData: SurveyResponseSchema = {
      surveyid: response.surveyid,
      questions: response.questions
    };

    this.http
      .post<{ message: string }>(
        this.baseURl + 'response/add',
        surveyResponseData).subscribe(responseData => {
        console.log(responseData);
                });
    return 'Successfully added your response';
  }
}
