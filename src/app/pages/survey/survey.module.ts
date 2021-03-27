import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListSurveyComponent } from '../survey/list-survey/list-survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';

import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RespondSurveyComponent } from './respond-survey/respond-survey.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatTableModule, MatPaginatorModule,
     MatCardModule, ReactiveFormsModule],
  declarations: [ListSurveyComponent, AddSurveyComponent, EditSurveyComponent, RespondSurveyComponent],
  exports: [ListSurveyComponent, AddSurveyComponent, EditSurveyComponent]
})

export class SurveyModule {}
