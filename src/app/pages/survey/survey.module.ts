import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ListSurveyComponent } from '../survey/list-survey/list-survey.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { CoreComponentModule } from '../../core-component/core-component.module';

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
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SurveyReportsComponent } from './survey-reports/survey-reports.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatTableModule, MatPaginatorModule,
     MatCardModule, ReactiveFormsModule, MatIconModule,MatChipsModule, CoreComponentModule, FlexLayoutModule,
     NgxChartsModule],
  declarations: [ListSurveyComponent, AddSurveyComponent, EditSurveyComponent, RespondSurveyComponent, SurveyReportsComponent],
  exports: [ListSurveyComponent, AddSurveyComponent, EditSurveyComponent, CoreComponentModule]
})

export class SurveyModule {}
