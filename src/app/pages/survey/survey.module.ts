import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListSurveyComponent } from '../survey/list-survey/list-survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule],
  declarations: [ListSurveyComponent, AddSurveyComponent, EditSurveyComponent],
  exports: [ListSurveyComponent, AddSurveyComponent, EditSurveyComponent]
})

export class SurveyModule {}
