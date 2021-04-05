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
  private baseURl = 'http://localhost:3000/api/admin/survey/';
  constructor(private http: HttpClient, private router: Router) { }

  getSurvaeyUpdateListner() {
    return this.surveyListUpdated.asObservable();
  }

  addSurvey(survey: SurveySchema) {
    const surveyData: SurveySchema = {
      id: null!,
      name: survey.name,
      title: survey.title,
      description: survey.description,
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
          description: responseData.survey.description,
          created: responseData.survey.created,
          expires: responseData.survey.expires,
          status: responseData.survey.status,
          questions: responseData.survey.questions
        };
        this.surveyDataList.push(addedSurvey);
        this.surveyListUpdated.next([...this.surveyDataList]);
        this.router.navigate(['/survey/list-survey']);
      });
  }

  fetchSurveys(): Observable<SurveySchema[]>{
    return this.http.get<SurveySchema[]>(
      this.baseURl);
  }

  editSurvey(survey: SurveySchema): string{
    this.http
      .post<{ message: string, survey: SurveySchema }>(
        this.baseURl + 'edit/' + survey.id,
        survey).subscribe(result => {
          this.surveyDataList = this.surveyDataList.filter(item => item.id === survey.id);
          this.surveyDataList.push(survey);
          this.surveyListUpdated.next([...this.surveyDataList]);
          this.router.navigate(['/survey/list-survey']);
        });

    return 'Survey edited successfuly';
  }

  getSurvey(id: string): Observable<SurveySchema>
  {
    return this.http.get<SurveySchema>(this.baseURl + 'read/' + id);
  }

  // getSurvey(id: string):SurveySchema {
  //   return { ...this.surveyDataList.find(p => p.id === id) };
  // }

  addSurveyResponse(response: SurveyResponseSchema): string{
    const surveyResponseData: SurveyResponseSchema = {
      surveyid: response.surveyid,
      questions: response.questions
    };

    this.http
      .post<{ message: string }>(
        this.baseURl + 'response/add',
        surveyResponseData).subscribe(responseData => {
                });
    return 'Successfully added your response';
  }

  deleteSurvey(id: string): string {
    this.http.get(this.baseURl + '/delete/' + id).subscribe(
      result => {
      }
  );
    return 'Survey deleted successfully.';
  }

  getSurveyResponses(id: string): Observable<SurveyResponseSchema[]> {
    return this.http.get<SurveyResponseSchema[]>(this.baseURl + 'response/' + id);
  }
}
