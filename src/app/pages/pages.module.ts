import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SurveyModule } from './survey/survey.module';
import { PartialsModule } from '../partials/partials.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  imports: [SurveyModule, BrowserModule, FormsModule, RouterModule, PartialsModule,
    MatGridListModule, MatButtonModule, AuthModule, ReactiveFormsModule, MatInputModule  ],
  declarations: [AboutComponent, HomeComponent, ContactComponent],
  exports: [SurveyModule, PartialsModule, AuthModule, AboutComponent]
})

export class PagesModule {}
