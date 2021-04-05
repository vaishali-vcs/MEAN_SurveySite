import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AddSurveyComponent } from './pages/survey/add-survey/add-survey.component';
import { EditSurveyComponent } from './pages/survey/edit-survey/edit-survey.component';
import { ListSurveyComponent } from './pages/survey/list-survey/list-survey.component';
import { RespondSurveyComponent } from './pages/survey/respond-survey/respond-survey.component';
import { AuthGuard } from "./pages/auth/auth.guard";
import { SurveyReportsComponent } from './pages/survey/survey-reports/survey-reports.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'survey/list-survey', component: ListSurveyComponent },
{ path: 'survey/add-survey', component: AddSurveyComponent },
{ path: 'survey/edit-survey/:id', component: EditSurveyComponent },
{ path: 'survey/respond-survey/:id', component: RespondSurveyComponent },
{ path: 'survey/surveyreport/:id', component: SurveyReportsComponent },
{ path: 'about', component: AboutComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'user/login', component: LoginComponent },
{ path: 'user/register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
